# Valoració dels cinc jocs

Puntuacions de 0 a 10, fetes el 20 de novembre de 2026 i actualitzades el mateix dia després dels arreglos de
coherència, de la passada d'humor, de la llibreta de camp i l'avi a L'Última Arrel, i dels trencaclosques nous
d'Aigua Verne. Només per a consulta: la web no les fa servir.

**Com s'ha fet.** Llegint el guió sencer de cada joc (`../jocs/games/<joc>/guio/guio.md`) i les dades del contingut:
sales, pistes, missions, finals i la partida sencera dels tests. Ningú no ha jugat cap joc per fer-les, així que les
durades són estimacions. On una nota ha canviat, la taula mostra «abans → ara»: el primer número és el de la
valoració inicial, i el segon, el d'després dels arreglos (més avall).

## Els aspectes principals

| | Ferro-9 | Suma Zero | Ni un ou | Aigua Verne | L'Última Arrel |
|---|---|---|---|---|---|
| **Dificultat** | 5,5 | 6 | 5 | 6,5 | 2 |
| **Durada** (h, primera partida sense pistes) | 3–4 | 4–6 | 3,5–5 | 5–7 | ~1 (adult) / ~1,5 (nena) |
| **Humor** | 7 → 8 | 8,5 → **9** | 6,5 → 7,5 | 8,5 → **9** | 7,5 → 8 |
| **Originalitat** | **8,5** | 7,5 | 6,5 → 7 | 7 | 7,5 |
| **Coherència** | 7 → 8,5 | 8 → **9** | 8,5 → **9** | 6,5 → 8 | 7,5 → 8,5 |

## Altres aspectes

| | Ferro-9 | Suma Zero | Ni un ou | Aigua Verne | L'Última Arrel |
|---|---|---|---|---|---|
| **Personatges** | 8 | 8 | 8,5 | 8,5 | 7,5 |
| **Pes emocional** | **8** | 6 | **8** | 7,5 | 6,5 → 7 |
| **Tema / missatge** | 8 | 8,5 | 8,5 | **9** | 8,5 |
| **Disseny dels trencaclosques** | 8 | **8,5** | 8 | 7 → 8 | 7 → 7,5 |
| **Rejugabilitat** (finals, aliats) | 7 (3 finals) | 7 (3 finals) | 7 (3 finals) | 4 → 5 (1 final, camins) | 3 → 4 (1 final, llibreta) |

Fent la mitjana dels aspectes de qualitat (sense la dificultat ni la durada), Ferro-9 queda a 8,0, Suma Zero i Ni un
ou a 7,9, Aigua Verne a 7,8 i L'Última Arrel a 7,3. Abans dels arreglos eren 7,7, 7,7, 7,7, 7,3 i 6,9. Les diferències
entre els tres primers continuen sent massa petites per dir quin és millor. Qui ha pujat més és Aigua Verne, gràcies a
la coherència i als trencaclosques nous. L'Última Arrel perd sobretot per rejugabilitat, i és per a nenes de 8 a 12 anys: per
a aquest públic, la poca dificultat i la poca durada són virtuts. A més, la rejugabilitat es mesura comptant finals,
i això és un barem d'adults: un nen torna a jugar un joc perquè li ha agradat. Sense la rejugabilitat, L'Última Arrel
quedaria a 7,8 i Ferro-9 a 8,1.

## Per què

**Ferro-9.** El més original: la finestra de fase, el límit de 2 kg, la molla i el diapasó, el pilar 7 com a
«bústia que triga 120 anys». També és el que té més cor (la Iri i la Vet a través de notes, el final del Cargol). La
barra de verbs el fa una mica més difícil del que diria el guió. Ara té més humor, que surt de la mateixa premissa: la
Iri parla l'argot de fa 120 anys, i el museu la tracta com una peça d'exposició.

**Suma Zero.** La comèdia més rodona i els millors trencaclosques: un atracament que s'ha de desfer, les sincronies
per torns, el diàleg de sospita que es torna a començar. Hi perd en pes emocional: la relació entre les germanes és
més implícita que explorada.

**Ni un ou.** Comparteix amb Suma Zero el lloc del més coherent, i té el millor antagonista (el Bastida). Continua
sent el que té menys humor, cosa que el to de thriller justifica, però ara té revisions mèdiques i un walkie que fan
riure sense trencar la tensió. El pròleg ja no delata el culpable, i hi guanya suspens.

**Aigua Verne.** El més llarg, el més difícil i el del tema més ben resolt: el Magnat cau per la seva pròpia lògica
d'avals. Tenia els forats de coherència més grossos (el pou, que era el motiu de tot, no quedava resolt). Ara estan
tapats. Els anar i tornar entre planetes ja no són viatges buits: qui és previsor s'endú les coses d'entrada, i qui
hi torna troba el lloc canviat. La subhasta final ara demana pensar. Continua tenint un sol final.

**L'Última Arrel.** Molt bon humor per a l'edat («Ets un fong?» / «Soc una nena.» / «Pitjor.») i idees fresques
(l'internet dels fongs, els gripaus en vaga). La victòria depenia de coincidències; ara el canal 7 és un pla, i la
Pla atura el camió per un motiu. Tres acudits es paguen a l'epíleg. L'avi, que fins ara només eren objectes (el
walkie, la lupa, el cèntim), té un moment a l'epíleg, i la llibreta de camp dona un motiu per tornar-hi a jugar.
Continua tenint un sol final, i el pes emocional és el més baix dels cinc després de Suma Zero.

## Els forats de coherència, arreglats

Commit `235512b` del repo dels jocs, i el següent per a l'art del pròleg de Ni un ou. Cada arreglo és al joc i al
guió.

- **Ferro-9.** Per què la Vet recorda als finals 2 i 3 («el camp no esborra qui hi ha estat a dins»). Per què la
  Directora parla del tub de la vàlvula (és el seu pacte) i deixa passar el fullet (vanitat). Per què la Vet va lliure
  pel mòdul C. La sospita del Sic té conseqüència a l'acte 3. El guió ja no promet dues solucions per peça ni un límit
  d'enceses que el joc no ensenya.
- **Suma Zero.** Què es desfà i què queda (el «compte zero» es manté com a pista per a una continuació). La nòmina surt
  tota de cop a les dotze. El micròfon de seguretat es veu abans que calgui la ràdio del Ballester. El vigilant de
  l'aeroport ja no pregunta el nom del nen com si no l'hagués sentit mai. L'arc de la Vet es tanca també si menteix al
  Ballester (una postal).
- **Ni un ou.** El pròleg ja no delata el Bastida: s'encén una pantalla darrere un ull de bou de la caseta i no es veu
  qui hi escriu. El robatori del portàtil té motiu. El mapa de dependències demana les 4 revisions, com el joc. El
  Ferran no surt mai.
- **Aigua Verne.** El Magnat no reconeix la Iri perquè no la mira mai. El pou queda ple, el pare torna de la
  residència sense pagar el suplement, i el contracte 7.788 és del Banc però la bomba està desconnectada. El gel cau a
  trossets i es fon abans de tocar a terra. Les festes del Magnat són sempre en dijous, i les vàlvules són sota la
  piscina perquè «ho vol tot sota els peus».
- **L'Última Arrel.** El canal 7 és un pla, no una casualitat (l'altaveu capta walkies). La Pla atura el camió «fins
  que ho miri el jurídic», i l'Ajuntament retira el permís. La melmelada és per a les fades. La Vet que juga la 5 i la
  6a seguides queda com l'única excepció a «una escena, una germana».

## La passada d'humor

Commits `3e8f7d4` i `5c2bb82` del repo dels jocs. Les receptes són a `docs/guia-joc-nou.md` (fase 7) del repo dels
jocs.

- **Tots cinc.** Les respostes per defecte («No hi puc fer res») van per torns entre tres variants per verb i
  protagonista, en lloc de repetir sempre la mateixa.
- **Ferro-9.** L'argot de fa 120 anys («de rovell», «fer òrbita», «deure un filtre»), el glossari de la Iri, i els
  acudits del museu.
- **Ni un ou.** Preguntes opcionals a les revisions mèdiques, el «codi flam» del walkie, i acudits que tornen més tard
  (el gat, el motor, l'entrepà).
- **Suma Zero.** La família que no existeix, i els plats.
- **Aigua Verne.** Les llenties, que tornen diverses vegades, i l'aire.
- **L'Última Arrel.** Respostes per defecte pensades per a nenes, i tres acudits que es paguen a l'epíleg.

## La llibreta de camp i l'avi (L'Última Arrel)

Commit `d981338` del repo dels jocs. Per a la rejugabilitat i el pes emocional, sense fer el joc més difícil.

- **La llibreta de camp.** 12 observacions opcionals, una o dues per escena: la Iri les apunta amb la lupa, i la Vet
  les dicta pel walkie. Cadascuna és una dada real d'una línia. Al final es diu quantes se n'han apuntat («Les
  pàgines en blanc esperen una altra visita al bosc»). No en cal cap per acabar, i les pistes no hi apunten.
  Rejugabilitat: 3 → 4.
- **L'avi.** A la sorpresa de l'epíleg, l'Espora explica que l'avi venia cada dissabte, i que el canal 7, «el número
  més valent», el va triar ell. Pes emocional: 6,5 → 7.

## Els trencaclosques nous (Aigua Verne)

Commit `576d697` del repo dels jocs. Per al disseny dels trencaclosques, que era la nota més baixa del joc.

- **La subhasta.** L'ordre de les vàlvules compta: cada dipòsit fa baixar el preu una quantitat diferent, i si baixa de
  60 el Magnat remata lots més de pressa. Aqua, el gros, ha d'anar l'últim. L'Iri guanya temps amb tres objeccions,
  que només funcionen al seu lot: el contracte 7.788 (el subsòl de Terra-2), «Accepten ànimes en garantia?» (els
  deutors) i els peixos del lot 12 (el mar d'Aqua). Abans era un menú de +2 i +3.
- **Les tornades.** Les quatre coses que no s'agafen la primera vegada es poden endur «per si de cas» si s'insisteix.
  Si no, quan s'hi torna el lloc ha canviat: Verne ha posat estaques a la platja d'Aqua per subhastar-la, un cadenat
  al graner de Terra-2, i la Rosa només deixa el vestit si en Tomàs baixa de la nau.
- **Ferrum.** El condensador ja no és un encàrrec de peces: només s'engega amb targeta de treballador de Verne, i
  l'únic que supera el formulari de contractació és la Mosca.
- **En Fidel.** Segon camí: el tractor de l'avi, «pagat amb un pou», com a aval en lloc del sac de llavors.
- Disseny dels trencaclosques: 7 → 8. Rejugabilitat: 4 → 5 (dos passos amb dos camins, i la partida previsora).

## Per a la web

Al README hi ha pendent la durada i l'edat de cada joc. Les durades d'aquí són estimacions de lectura: abans de
posar-les a la web, val la pena contrastar-les amb el temps de joc real que compta `api/`.
