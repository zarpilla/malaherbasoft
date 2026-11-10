// node --test api/servidor.test.mjs   (Node 22.13 o més nou)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { creaServidor, obreBase, valida } from './servidor.mjs';

test('valida només esdeveniments coneguts', () => {
  assert.deepEqual(valida({ joc: 'ferro-9', ev: 'nova' }), ['', 1]);
  assert.deepEqual(valida({ joc: 'suma-zero', ev: 'acte', v: '3' }), ['3', 1]);
  assert.deepEqual(valida({ joc: 'suma-zero', ev: 'final', v: 'fugida' }), ['fugida', 1]);
  assert.deepEqual(valida({ joc: 'ferro-9', ev: 'temps', v: '600' }), ['', 600]);
  assert.deepEqual(valida({ joc: 'ferro-9', ev: 'temps', v: '999999' }), ['', 4 * 3600]);
  assert.equal(valida({ joc: 'ferro-9:prova', ev: 'nova' }), null);
  assert.equal(valida({ joc: 'un-altre', ev: 'nova' }), null);
  assert.equal(valida({ joc: 'un-altre:prova', ev: 'nova' }), null);
  assert.equal(valida({ joc: 'ferro-9:altre', ev: 'nova' }), null);
  assert.equal(valida({ joc: 'ferro-9', ev: 'clic' }), null);
  assert.equal(valida({ joc: 'ferro-9', ev: 'acte', v: '1' }), null);
  assert.equal(valida({ joc: 'ferro-9', ev: 'final', v: '<script>' }), null);
  assert.equal(valida({ joc: 'ferro-9', ev: 'temps', v: '-5' }), null);
  assert.equal(valida({ joc: 'ferro-9', ev: 'nova', v: 'x' }), null);
});

test('suma comptadors i en fa el resum', () => {
  const base = obreBase(':memory:');
  base.registra('ferro-9', 'nova', '', 1);
  base.registra('ferro-9', 'nova', '', 1);
  base.registra('ferro-9', 'continua', '', 1);
  base.registra('ferro-9', 'acte', '2', 1);
  base.registra('ferro-9', 'final', 'fugida', 1);
  base.registra('ferro-9', 'temps', '', 1800);
  base.registra('ferro-9', 'temps', '', 900);
  base.registra('ferro-9', 'nova', '', 1, '2000-01-01'); // massa antic per al resum
  const { jocs } = base.resum(30);
  assert.deepEqual(jocs['ferro-9'], {
    noves: 2, continuades: 1, actes: { 2: 1 }, finals: { fugida: 1 }, minuts: 45, minutsPerSessio: 15,
  });
  assert.equal(base.db.prepare('SELECT COUNT(*) AS c FROM comptadors').get().c, 6);
});

test('endpoint HTTP', async () => {
  const base = obreBase(':memory:');
  const servidor = creaServidor(base).listen(0);
  await new Promise((r) => servidor.once('listening', r));
  const url = `http://127.0.0.1:${servidor.address().port}`;
  try {
    // Com sendBeacon: text/plain.
    let r = await fetch(`${url}/api/e`, { method: 'POST', body: '{"joc":"suma-zero","ev":"acte","v":"3"}', headers: { 'content-type': 'text/plain' } });
    assert.equal(r.status, 204);
    r = await fetch(`${url}/api/e`, { method: 'POST', body: 'no és json' });
    assert.equal(r.status, 400);
    r = await fetch(`${url}/api/e`, { method: 'POST', body: '{"joc":"suma-zero","ev":"res"}' });
    assert.equal(r.status, 400);
    // Sense RESUM_TOKEN, el resum no existeix.
    r = await fetch(`${url}/api/resum`);
    assert.equal(r.status, 404);
    assert.deepEqual(base.resum(1).jocs['suma-zero'].actes, { 3: 1 });
  } finally {
    servidor.close();
  }
});
