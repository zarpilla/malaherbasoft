# Mala Herba Soft

Web del segell (malaherbasoft.cat): aventures gràfiques en català, gratuïtes i per jugar al navegador.

- `public/` és la web tal com es publica.
- `public/index.html`: la landing, una sola pàgina estàtica sense dependències (només Google Fonts).
- `public/img/`: el primer frame de les portades i d'algunes sales de cada joc (480×270, es mostren pixelades).

Per veure-la: obre `public/index.html` al navegador.

## Desplegament

Cada push a `main` publica `public/` a malaherbasoft.cat amb GitHub Actions
(`.github/workflows/deploy.yml`), per rsync cap a
`/var/www/malaherbasoft.cat/public_html` del servidor. Si el missatge del commit
conté `[skip deploy]`, no es desplega. També es pot llançar a mà des de la
pestanya Actions (*Run workflow*).

## Estadístiques

`api/` és un servei petit que compta partides, actes, finals i temps de joc, de forma anònima. No es
desplega amb la web: vegeu [api/README.md](api/README.md).

Pendent:
- Durada i edat de cada joc (ara són provisionals).
- Enllaços dels botons «Juga» quan els jocs estiguin penjats.
