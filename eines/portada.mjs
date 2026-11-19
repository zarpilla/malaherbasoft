// Captura la portada d'un joc sense els botons (la GUI «portada»), per a la web.
//
// Obre el joc (amb `npm run dev`: cal que Vite serveixi `/src/...`) a Chrome headless, espera que carregui, amaga la
// GUI dels botons i desa la pantalla a 1280×720. Després es redueix a 640×360 amb `Image.NEAREST`.
//
// Ús: node eines/portada.mjs <url del joc> <sortida.png>   (Node 22 o més nou)
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const [url, out] = process.argv.slice(2);
if (!out) { console.error('Ús: node eines/portada.mjs <url> <sortida.png>'); process.exit(1); }
const port = 9333 + Math.floor(Math.random() * 500);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'portada-'));
const chrome = spawn(process.env.CHROME ?? 'google-chrome', [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--use-angle=gl', '--mute-audio', '--window-size=1280,720', 'about:blank',
], { stdio: 'ignore' });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

let targets;
for (let i = 0; i < 50 && !targets; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch { await wait(200); }
}
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0;
const pending = new Map();
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
const send = (method, params = {}) => new Promise((r) => {
  const i = ++id;
  pending.set(i, r);
  ws.send(JSON.stringify({ id: i, method, params }));
});

await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 720, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url });
await wait(20000); // la pantalla de càrrega i l'entrada de la portada
const r = await send('Runtime.evaluate', {
  expression: "import('/src/game/guis/portada/portada.ids.ts').then((m) => { m.gui.hide(); return m.gui.visible })",
  awaitPromise: true, returnByValue: true,
});
if (r.result?.result?.value !== false) console.error('No s\'han pogut amagar els botons:', JSON.stringify(r.result));
await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 1279, y: 0 }); // el cursor, fora de la imatge
await wait(1500);
const shot = await send('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
console.log(out);
chrome.kill();
setTimeout(() => { try { fs.rmSync(profile, { recursive: true, force: true }); } catch { /* és a /tmp */ } process.exit(0); }, 500);
