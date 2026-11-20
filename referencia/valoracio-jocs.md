# Valoració dels cinc jocs

Puntuacions de 0 a 10, fetes el 20 de novembre de 2026. Només per a consulta: la web no les fa servir.

**Com s'ha fet.** Llegint el guió sencer de cada joc (`../jocs/games/<joc>/guio/guio.md`) i les dades del contingut:
sales, pistes, missions, finals i la partida sencera dels tests. Ningú no ha jugat cap joc per fer-les, així que les
durades són estimacions. Les puntuacions són d'**abans** dels arreglos de coherència (més avall); la coherència dels
cinc jocs hauria de pujar.

## Els aspectes principals

| | Ferro-9 | Suma Zero | Ni un ou | Aigua Verne | L'Última Arrel |
|---|---|---|---|---|---|
| **Dificultat** | 5,5 | 6 | 5 | 6,5 | 2 |
| **Durada** (h, primera partida sense pistes) | 3–4 | 4–6 | 3,5–5 | 5–7 | ~1 (adult) / ~1,5 (nena) |
| **Humor** | 7 | **8,5** | 6,5 | **8,5** | 7,5 |
| **Originalitat** | **8,5** | 7,5 | 6,5 | 7 | 7,5 |
| **Coherència** | 7 | 8 | **8,5** | 6,5 | 7,5 |

## Altres aspectes

| | Ferro-9 | Suma Zero | Ni un ou | Aigua Verne | L'Última Arrel |
|---|---|---|---|---|---|
| **Personatges** | 8 | 8 | 8,5 | 8,5 | 7,5 |
| **Pes emocional** | **8** | 6 | **8** | 7,5 | 6,5 |
| **Tema / missatge** | 8 | 8,5 | 8,5 | **9** | 8,5 |
| **Disseny dels trencaclosques** | 8 | **8,5** | 8 | 7 | 7 |
| **Rejugabilitat** (finals, aliats) | 7 (3 finals) | 7 (3 finals) | 7 (3 finals) | 4 (1 final) | 3 (1 final) |

Fent la mitjana dels aspectes de qualitat (sense la dificultat ni la durada), Ferro-9, Suma Zero i Ni un ou queden
empatats a uns 7,7, Aigua Verne a 7,3 i L'Última Arrel a 6,9. Les diferències entre els tres primers són massa
petites per dir quin és millor. L'Última Arrel perd sobretot per rejugabilitat, i és per a nenes de 8 a 12 anys: per
a aquest públic, la poca dificultat i la poca durada són virtuts.

## Per què

**Ferro-9.** El més original: la finestra de fase, el límit de 2 kg, la molla i el diapasó, el pilar 7 com a
«bústia que triga 120 anys». També és el que té més cor (la Iri i la Vet a través de notes, el final del Cargol). La
barra de verbs el fa una mica més difícil del que diria el guió.

**Suma Zero.** La comèdia més rodona i els millors trencaclosques: un atracament que s'ha de desfer, les sincronies
per torns, el diàleg de sospita que es torna a començar. Hi perd en pes emocional: la relació entre les germanes és
més implícita que explorada.

**Ni un ou.** El més coherent i el millor antagonista (el Bastida). És el que té menys humor, cosa que el to de
thriller justifica. Hi perdia en originalitat i en suspens, perquè el pròleg delatava el culpable.

**Aigua Verne.** El més llarg, el més difícil i el del tema més ben resolt: el Magnat cau per la seva pròpia lògica
d'avals. Tenia els forats de coherència més grossos (el pou, que era el motiu de tot, no quedava resolt), i els anar i
tornar entre planetes poden fer-se pesats. Té un sol final.

**L'Última Arrel.** Molt bon humor per a l'edat («Ets un fong?» / «Soc una nena.» / «Pitjor.») i idees fresques
(l'internet dels fongs, els gripaus en vaga). La victòria depenia de coincidències.

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

## Per a la web

Al README hi ha pendent la durada i l'edat de cada joc. Les durades d'aquí són estimacions de lectura: abans de
posar-les a la web, val la pena contrastar-les amb el temps de joc real que compta `api/`.
