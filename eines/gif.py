"""Fa el GIF de la web a partir dels fotogrames que ha gravat grava.mjs.

Treu els fotogrames repetits, en respecta el temps i fa servir una sola paleta per a tot el GIF, sense
tramat (és pixel art), perquè els colors no tremolin d'un fotograma a l'altre.

Ús: python3 eines/gif.py <carpeta gravada> <sortida.gif> [inici_ms] [final_ms]
"""
import json
import sys

from PIL import Image, ImageChops

carpeta, sortida = sys.argv[1], sys.argv[2]
inici = int(sys.argv[3]) if len(sys.argv) > 3 else 0
final = int(sys.argv[4]) if len(sys.argv) > 4 else 10**9
index = [f for f in json.load(open(f'{carpeta}/index.json')) if inici <= f['t'] <= final]

frames, temps = [], []
for f in index:
    im = Image.open(f"{carpeta}/{f['name']}").convert('RGB')
    if im.size != (480, 270):  # gravat a escala 2: es torna als píxels del joc
        im = im.resize((480, 270), Image.NEAREST)
    if frames and ImageChops.difference(im, frames[-1]).getbbox() is None:
        continue
    frames.append(im)
    temps.append(f['t'])
temps.append(index[-1]['t'] + 100)
durades = [max(20, round((b - a) / 10) * 10) for a, b in zip(temps, temps[1:])]

# La paleta surt d'un mosaic d'una mostra dels fotogrames.
mostra = frames[:: max(1, len(frames) // 24)][:24]
mosaic = Image.new('RGB', (480, 270 * len(mostra)))
for i, im in enumerate(mostra):
    mosaic.paste(im, (0, i * 270))
metode = Image.Quantize.LIBIMAGEQUANT if Image.core.HAVE_LIBIMAGEQUANT else Image.Quantize.MEDIANCUT
paleta = mosaic.quantize(256, method=metode, dither=Image.Dither.NONE)
gif = [im.quantize(palette=paleta, dither=Image.Dither.NONE) for im in frames]
gif[0].save(sortida, save_all=True, append_images=gif[1:], duration=durades, loop=0, optimize=True, disposal=1)
print(f'{sortida}: {len(gif)} fotogrames, {sum(durades)} ms')
