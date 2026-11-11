// Grava una estona de joc per a les animacions de la web.
//
// Obre el joc (amb `npm run dev`, que és on hi ha `window.__aventura.provar`) a Chrome headless, va a la
// sala de l'escena i hi reprodueix uns passos de ratolí mentre en desa els fotogrames amb el temps de cada un.
// Després, `gif.py` en fa el GIF.
//
// Ús: node eines/grava.mjs <url del joc> <escena.json> <carpeta de sortida>   (Node 22 o més nou)
//
// L'escena (vegeu eines/escenes/):
//   situacio  on és cada protagonista i qui juga ({ rooms, items, active }, com a provar())
//   abans     passos per treure el diàleg d'entrada de la sala, sense gravar
//   passos    el que es grava. Coordenades en píxels del joc (480×270):
//             ["move", x, y, ms] · ["click", x, y] (hi va i clica) · ["tap", x, y] (clica on és) · ["wait", ms]
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const [url, escenaFile, outDir] = process.argv.slice(2);
if (!outDir) { console.error('Ús: node eines/grava.mjs <url> <escena.json> <carpeta>'); process.exit(1); }
const escena = JSON.parse(fs.readFileSync(escenaFile, 'utf8'));
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

// A escala 1, el text de la línia d'acció («Mira…») surt retallat: es grava a 2 i gif.py ho torna a 480×270.
const ESCALA = 2;
const port = 9333 + Math.floor(Math.random() * 500);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'grava-'));
const chrome = spawn(process.env.CHROME ?? 'google-chrome', [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--use-angle=gl', '--mute-audio', '--autoplay-policy=no-user-gesture-required',
  `--window-size=${480 * ESCALA},${270 * ESCALA}`, 'about:blank',
], { stdio: 'ignore' });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
function surt(codi, ...missatge) {
  if (missatge.length) console.error(...missatge);
  chrome.kill();
  // Chrome encara hi pot estar escrivint mentre es tanca.
  setTimeout(() => {
    try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5 }); } catch { /* és a /tmp */ }
    process.exit(codi);
  }, 500);
  return new Promise(() => {});
}

let targets;
for (let i = 0; i < 50 && !targets; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch { await wait(200); }
}
if (!targets) await surt(1, "No s'ha pogut obrir Chrome");
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0;
const pending = new Map();
const frames = [];
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  if (m.method === 'Page.screencastFrame') {
    frames.push({ t: m.params.metadata.timestamp, data: m.params.data });
    ws.send(JSON.stringify({ id: ++id, method: 'Page.screencastFrameAck', params: { sessionId: m.params.sessionId } }));
  }
});
const send = (method, params = {}) => new Promise((r) => {
  const i = ++id;
  pending.set(i, r);
  ws.send(JSON.stringify({ id: i, method, params }));
});
const ev = async (expr) => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result?.result?.value;

let mx = 470, my = 10;
const mouse = (type, x, y) => send('Input.dispatchMouseEvent', {
  type, x: x * ESCALA + ESCALA / 2, y: y * ESCALA + ESCALA / 2,
  button: type === 'mouseMoved' ? 'none' : 'left', clickCount: type === 'mouseMoved' ? 0 : 1,
});
async function moveTo(x, y, ms = 450) {
  const n = Math.max(1, Math.round(ms / 30));
  const [x0, y0] = [mx, my];
  for (let i = 1; i <= n; i++) {
    const k = i / n;
    const e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
    await mouse('mouseMoved', Math.round(x0 + (x - x0) * e), Math.round(y0 + (y - y0) * e));
    await wait(ms / n);
  }
  mx = x; my = y;
}
async function tap(x, y) { await mouse('mousePressed', x, y); await wait(60); await mouse('mouseReleased', x, y); }
async function run(steps) {
  for (const s of steps) {
    if (s[0] === 'move') await moveTo(s[1], s[2], s[3]);
    else if (s[0] === 'click') { await moveTo(s[1], s[2]); await tap(s[1], s[2]); }
    else if (s[0] === 'tap') await tap(s[1], s[2]);
    else if (s[0] === 'wait') await wait(s[1]);
  }
}

await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 480 * ESCALA, height: 270 * ESCALA, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url });
for (let i = 0; i < 100 && !(await ev('!!window.__aventura')); i++) await wait(200);
if (!(await ev('!!window.__aventura'))) await surt(1, 'No hi ha window.__aventura: és el joc amb `npm run dev`?');
await wait(800);
await mouse('mouseMoved', mx, my);

// provar() de vegades arriba abans que el joc estigui a punt: es torna a provar fins que som a la sala.
const s = escena.situacio;
const sala = s.rooms[s.active];
const provar = `(() => { const a = window.__aventura; a.provar({ state: a.narrative.snapshot(), rooms: ${JSON.stringify(s.rooms)}, items: ${JSON.stringify(s.items ?? {})}, active: ${JSON.stringify(s.active)} }) })()`;
let ara;
for (let i = 0; i < 5 && ara !== sala; i++) {
  await ev(provar);
  await wait(escena.esperaEntrada ?? 5000);
  ara = await ev('window.__aventura.narrative.world.currentRoom()');
}
if (ara !== sala) await surt(1, `No s'ha pogut anar a ${sala} (és a ${ara})`);
await run(escena.abans ?? []);

await ev('window.__grava = true');
await send('Page.startScreencast', { format: 'png', everyNthFrame: 1, maxWidth: 480 * ESCALA, maxHeight: 270 * ESCALA });
await run(escena.passos);
await send('Page.stopScreencast');
await wait(200);

// No serveix si la pàgina s'ha recarregat (algú ha tocat el joc mentre es gravava).
if (!(await ev('window.__grava === true'))) await surt(2, "Gravació dolenta: la pàgina s'ha recarregat");

const t0 = frames[0]?.t ?? 0;
const index = frames.map((f, i) => {
  const name = `f${String(i).padStart(4, '0')}.png`;
  fs.writeFileSync(path.join(outDir, name), Buffer.from(f.data, 'base64'));
  return { name, t: Math.round((f.t - t0) * 1000) };
});
fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(index));
console.log(`${sala}: ${frames.length} fotogrames, ${index.at(-1)?.t} ms`);
ws.close();
await surt(0);
