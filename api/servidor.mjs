// Estadístiques anònimes dels jocs: només comptadors per dia, joc i esdeveniment.
// No es guarda cap IP, identificador ni hora exacta. Sense dependències: Node 22.13 o més nou.
//
//   POST /api/e     {"joc":"ferro-9","ev":"acte","v":"2"}   → 204
//   GET  /api/resum?dies=30   (amb la capçalera "Authorization: Bearer $RESUM_TOKEN")
//
// Variables d'entorn: PORT (8787), HOST (127.0.0.1; 0.0.0.0 dins de Docker), DB (./estadistiques.sqlite), JOCS (ferro-9,suma-zero),
// RESUM_TOKEN (sense, /api/resum queda desactivat).
import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';

const JOCS = new Set((process.env.JOCS ?? 'ferro-9,suma-zero').split(',').map((s) => s.trim()).filter(Boolean));
const RESUM_TOKEN = process.env.RESUM_TOKEN ?? '';
/** Una sessió no pot sumar més de 4 hores de cop (pestanyes oblidades, rellotges estranys). */
const MAX_SEGONS = 4 * 3600;
/** Crides per minut i adreça. Les adreces només es tenen en memòria, un minut, per a aquest límit. */
const LIMIT_MINUT = 60;

/** Valida un esdeveniment. Retorna [v, quant suma] o null. */
export function valida(cos) {
  if (!cos || typeof cos !== 'object') return null;
  const { joc, ev } = cos;
  const v = cos.v == null ? '' : String(cos.v);
  if (typeof joc !== 'string' || !JOCS.has(joc)) return null;
  switch (ev) {
    case 'nova':
    case 'continua':
      return v === '' ? ['', 1] : null;
    case 'acte':
      return /^[2-9]$/.test(v) ? [v, 1] : null;
    case 'final':
      return /^[a-z0-9_-]{1,40}$/.test(v) ? [v, 1] : null;
    case 'temps': {
      const segons = Number(v);
      return Number.isInteger(segons) && segons > 0 ? ['', Math.min(segons, MAX_SEGONS)] : null;
    }
    default:
      return null;
  }
}

export function obreBase(cami) {
  const db = new DatabaseSync(cami);
  db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS comptadors (
      dia TEXT NOT NULL,   -- AAAA-MM-DD (UTC)
      joc TEXT NOT NULL,
      ev  TEXT NOT NULL,   -- nova | continua | acte | final | temps
      v   TEXT NOT NULL,   -- l'acte, el final o ''
      n   INTEGER NOT NULL, -- vegades; per a 'temps', segons
      PRIMARY KEY (dia, joc, ev, v)
    ) WITHOUT ROWID;
  `);
  const suma = db.prepare(
    `INSERT INTO comptadors (dia, joc, ev, v, n) VALUES (?, ?, ?, ?, ?)
     ON CONFLICT (dia, joc, ev, v) DO UPDATE SET n = n + excluded.n`,
  );
  const totals = db.prepare(
    `SELECT joc, ev, v, SUM(n) AS n FROM comptadors WHERE dia >= ? GROUP BY joc, ev, v ORDER BY joc, ev, v`,
  );
  return {
    db,
    registra(joc, ev, v, n, dia = new Date().toISOString().slice(0, 10)) {
      suma.run(dia, joc, ev, v, n);
    },
    /** Totals des de fa `dies` dies, agrupats per joc. */
    resum(dies) {
      const des = new Date(Date.now() - dies * 86_400_000).toISOString().slice(0, 10);
      const jocs = {};
      for (const { joc, ev, v, n } of totals.all(des)) {
        const j = (jocs[joc] ??= { noves: 0, continuades: 0, actes: {}, finals: {}, minuts: 0 });
        if (ev === 'nova') j.noves = n;
        else if (ev === 'continua') j.continuades = n;
        else if (ev === 'acte') j.actes[v] = n;
        else if (ev === 'final') j.finals[v] = n;
        else if (ev === 'temps') j.minuts = Math.round(n / 60);
      }
      for (const j of Object.values(jocs)) {
        const sessions = j.noves + j.continuades;
        j.minutsPerSessio = sessions ? Math.round((j.minuts / sessions) * 10) / 10 : null;
      }
      return { des, jocs };
    },
  };
}

export function creaServidor(base) {
  let crides = new Map();
  const neteja = setInterval(() => (crides = new Map()), 60_000);
  neteja.unref();

  const respon = (res, codi, cos) => {
    res.writeHead(codi, cos ? { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } : {});
    res.end(cos ? JSON.stringify(cos) : undefined);
  };

  const servidor = createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost');

    if (req.method === 'POST' && url.pathname === '/api/e') {
      const ip = String(req.headers['x-real-ip'] ?? req.socket.remoteAddress ?? '');
      const vegades = (crides.get(ip) ?? 0) + 1;
      crides.set(ip, vegades);
      if (vegades > LIMIT_MINUT) return respon(res, 429);

      let cos = '';
      req.setEncoding('utf8');
      req.on('data', (tros) => {
        cos += tros;
        if (cos.length > 512) req.destroy();
      });
      req.on('end', () => {
        let dades;
        try {
          dades = JSON.parse(cos);
        } catch {
          return respon(res, 400);
        }
        const ok = valida(dades);
        if (!ok) return respon(res, 400);
        base.registra(dades.joc, dades.ev, ok[0], ok[1]);
        respon(res, 204);
      });
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/resum') {
      if (!RESUM_TOKEN || req.headers.authorization !== `Bearer ${RESUM_TOKEN}`) return respon(res, 404);
      const dies = Math.min(Math.max(Number(url.searchParams.get('dies')) || 30, 1), 3650);
      return respon(res, 200, base.resum(dies));
    }

    respon(res, 404);
  });
  return servidor;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? 8787);
  const base = obreBase(process.env.DB ?? 'estadistiques.sqlite');
  const host = process.env.HOST ?? '127.0.0.1';
  creaServidor(base).listen(port, host, () => console.log(`Estadístiques a http://${host}:${port}`));
}
