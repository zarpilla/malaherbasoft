# Animacions dels jocs

Els GIF de la web (`public/img/*-joc.gif`, `*-joc2.gif`) són gravacions del joc de debò: una protagonista
passa el ratolí per sobre d'una cosa, hi clica (o tria què fer al menú), hi camina i diu la seva frase. Es fan des dels projectes Benne de `../jocs`.

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

   Si `python3 -c "from PIL import Image; Image.new('RGB', (2, 2)).resize((1, 1))"` falla (el Pillow del sistema
   de vegades es trenca), fes servir un entorn virtual: `python3 -m venv /tmp/venv && /tmp/venv/bin/pip install pillow`.

3. Fes-ne el GIF:

   ```bash
   python3 eines/gif.py /tmp/nuo-maquines public/img/niunou-joc.gif
   ```

Cada escena (`escenes/*.json`) diu on és cada protagonista, quins clics treuen el diàleg d'entrada (en una
casella buida de l'inventari) i què es fa mentre es grava. Les coordenades són en píxels del joc (640×360).
Amb `situacio.estat` es posen flags i variables de la partida (p. ex. que la subhasta d'Aigua Verne ja hagi
començat).

Ni un ou, Suma Zero i Aigua Verne ja no tenen barra de verbs: el clic esquerre fa l'acció (o mira, si encara no
s'ha mirat), i si n'hi ha més d'una obre un menú. Ferro-9 encara té la barra: les seves escenes
(`escenes/f9-*.json`) hi cliquen «Mira» (191, 344).

Les captures fixes d'Aigua Verne (`aiguaverne-joc.png`, `-joc2.png`) són l'últim fotograma de `av-salo` i
`av-galeria`, reduït a 640×360 amb `Image.NEAREST`.
