# Mala Herba Soft

Web del segell (malaherbasoft.cat): aventures gràfiques en català, gratuïtes i per jugar al navegador.

- `public/` és la web tal com es publica.
- `public/index.html`: la landing, una sola pàgina estàtica sense dependències (només Google Fonts).
- `public/img/`: la portada de cada joc (el primer fotograma, 640×360, com els jocs) i dues gravacions de partida en GIF
  (`*-joc.gif`, `*-joc2.gif`), que es fan amb les eines d'[`eines/`](eines/README.md). Es mostren pixelades.

Per veure-la: obre `public/index.html` al navegador.

## Desplegament

Cada push a `main` publica `public/` a malaherbasoft.cat amb GitHub Actions
(`.github/workflows/deploy.yml`), per rsync cap a
`/var/www/malaherbasoft.cat/public_html` del servidor. Si el missatge del commit
conté `[skip deploy]`, no es desplega. També es pot llançar a mà des de la
pestanya Actions (*Run workflow*).

Els jocs (`/ni-un-ou/`, `/ferro-9/`, `/suma-zero/`) els publica la CI del repo dels jocs, cadascun a la
seva carpeta. El `rsync --delete` d'aquí les exclou: un joc nou s'hi ha d'afegir.

## Estadístiques

`api/` és un servei petit que compta partides, actes, finals i temps de joc, de forma anònima. No es
desplega amb la web: vegeu [api/README.md](api/README.md).

Pendent:
- Durada i edat de cada joc (ara són provisionals).
