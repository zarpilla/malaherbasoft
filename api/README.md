# Estadístiques dels jocs

Un servei petit que compta, de forma anònima, quantes partides es comencen, fins a quin acte arriben,
a quin final i quanta estona es juga. Els jocs hi envien els esdeveniments des de
`jocs/adapters/benne/runtime/estadistiques.ts`, que és comú a tots els jocs.

**Què es guarda:** una fila per dia, joc i esdeveniment amb un comptador (`comptadors` a SQLite).
No es guarda cap IP, identificador, galeta ni hora exacta. Les adreces només es tenen un minut en
memòria, per limitar a 60 crides per minut cadascuna.

| Esdeveniment | `v` | Quan |
|---|---|---|
| `nova` | | botó «Comença» |
| `continua` | | es carrega una partida desada (un cop per pàgina) |
| `acte` | `2`, `3`… | comença la missió `acteN` |
| `final` | id del final | comença l'escena d'un final |
| `temps` | segons | en amagar o tancar la pestanya: temps visible i amb alguna acció en els darrers 2 minuts |

El joc no envia res si el navegador té Global Privacy Control o Do Not Track, ni des de localhost
(`npm run dev` o un build provat en local).

## Requisits

Node 22.13 o més nou (fa servir `node:sqlite`, integrat). Cap dependència. Al servidor, la imatge
oficial `node:24-alpine`.

```bash
node --test api/servidor.test.mjs
PORT=8787 DB=/tmp/prova.sqlite node api/servidor.mjs
```

## Instal·lació al servidor

Els jocs criden sempre `https://malaherbasoft.cat/api/e`, siguin on siguin (la web, itch.io, escriptori).

Corre amb Docker, com els altres serveis del servidor, a `~/malaherbasoft-api/` de `webcoop`:
`compose.yaml`, `servidor.mjs`, `.env` (amb `RESUM_TOKEN`, permisos 600) i `dades/` (la base SQLite).
El contenidor només escolta a `127.0.0.1:8787`.

```bash
# Actualitzar el servei després de canviar servidor.mjs:
scp api/servidor.mjs api/compose.yaml webcoop@malaherbasoft.cat:malaherbasoft-api/
ssh webcoop@malaherbasoft.cat 'cd ~/malaherbasoft-api && docker compose up -d --force-recreate'
```

nginx hi arriba amb aquest bloc a `/etc/nginx/sites-available/malaherbasoft.cat`, sense log d'accés
perquè no quedin IPs enlloc. La còpia de la configuració és a `~/nginx-malaherbasoft/`; `sudo ./api.sh`
l'aplica (i torna enrere si `nginx -t` falla).

```nginx
location /api/ {
    access_log off;
    proxy_pass http://127.0.0.1:8787;
    proxy_set_header X-Real-IP $remote_addr;
    client_max_body_size 1k;
}
```

## Consultar-ho

```bash
curl -H "Authorization: Bearer $RESUM_TOKEN" "https://malaherbasoft.cat/api/resum?dies=30"
```

Retorna, per joc: partides noves i continuades, quantes arriben a cada acte i a cada final, minuts
totals i minuts per sessió. Sense `RESUM_TOKEN` configurat, aquesta ruta no existeix.
Per a consultes més fines: `sqlite3 ~/malaherbasoft-api/dades/estadistiques.sqlite` al servidor.

Un joc nou: afegeix-lo a `JOCS` a `compose.yaml` (és el nom de la seva carpeta a `jocs/games/`) i torna a aixecar el contenidor.
Perquè compti els actes, les seves missions s'han de dir `acte1`, `acte2`, `acte3`…
