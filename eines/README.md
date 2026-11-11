# Animacions dels jocs

Els GIF de la web (`public/img/*-joc.gif`, `*-joc2.gif`) són gravacions del joc de debò: una protagonista
tria un verb, clica una cosa, hi camina i diu la seva frase. Es fan des dels projectes Benne de `../jocs`.

1. Engega el joc en desenvolupament (cal `provar`, que només hi és amb `npm run dev`), un port per joc:

   ```bash
   cd ../jocs/games/ni-un-ou/ni-un-ou && npx vite --port 5181
   ```

2. Grava l'escena (Node 22 o més nou i Google Chrome):

   ```bash
   node eines/grava.mjs http://127.0.0.1:5181/ eines/escenes/nuo-maquines.json /tmp/nuo-maquines
   ```

   Si surt «Gravació dolenta», torna-ho a provar: la pàgina s'ha recarregat (algú tocava el joc).
   Mira el GIF abans de pujar-lo: si la frase és «Això no funciona», torna a gravar.

3. Fes-ne el GIF:

   ```bash
   python3 eines/gif.py /tmp/nuo-maquines public/img/niunou-joc.gif
   ```

Cada escena (`escenes/*.json`) diu on és cada protagonista, quins clics treuen el diàleg d'entrada (en una
casella buida de l'inventari: el botó de menú és a la dreta de la barra) i què es fa mentre es grava. Les
coordenades són en píxels del joc (640×360); els verbs són al mateix lloc als tres jocs (Mira: 191, 344).
