#!/usr/bin/env python3
"""Zet site/src/inhoud/seed.json om naar seed.ndjson voor Sanity.

De seed in de site is de bron (platte NL-teksten); dit script vouwt elke tekst
in een {nl: ...}-taalobject en zet _id, _type en _key's zoals de schema's ze
verwachten. Importeren:

    cd studio
    npx sanity dataset import seed/seed.ndjson production --replace
"""

import json
import pathlib

HIER = pathlib.Path(__file__).resolve().parent
BRON = HIER.parent.parent / "site" / "src" / "inhoud" / "seed.json"
DOEL = HIER / "seed.ndjson"

seed = json.loads(BRON.read_text())


def L(tekst):
    return {"nl": tekst}


def beeld(bestand, alt=None):
    """Afbeelding als importeerbare asset; het pad is relatief aan seed.ndjson."""
    asset = {"_type": "image", "_sanityAsset": f"image@file://./beelden/{bestand}"}
    if alt:
        asset["alt"] = alt
    return asset


def taal_items(teksten, prefix):
    return [
        {"_type": "taalString", "_key": f"{prefix}{i}", "nl": t}
        for i, t in enumerate(teksten)
    ]


hero = seed["hero"]
mb = seed["maandbedrag"]
pk = seed["pakketten"]
ww = seed["werkwijze"]
sc = seed["scenarios"]
ct = seed["contact"]
f = ct["formulier"]
inst = seed["instellingen"]

pagina = {
    "_id": "pagina",
    "_type": "pagina",
    "hero": {
        "label": L(hero["label"]),
        "kop": L(hero["kop"]),
        "kopAccent": L(hero["kopAccent"]),
        "sub": L(hero["sub"]),
        "ctaPrimair": L(hero["ctaPrimair"]),
        "ctaSecundair": L(hero["ctaSecundair"]),
        "fineprint": L(hero["fineprint"]),
        "foto": beeld(
            "hero-breed.jpg",
            "Ontvangstruimte van een kantoor: een kentiapalm en een ficus in keramische potten naast een eiken balie, links een lege lichte wand",
        ),
        "meta": [
            {"_type": "metaItem", "_key": f"meta{i}", "label": L(m["label"]), "waarde": L(m["waarde"])}
            for i, m in enumerate(hero["meta"])
        ],
    },
    "zekerheden": taal_items(seed["zekerheden"], "zeker"),
    "maandbedrag": {
        "railLabel": L(mb["railLabel"]),
        "railNote": L(mb["railNote"]),
        "kop": L(mb["kop"]),
        "lede": L(mb["lede"]),
        "pijlers": [
            {"_type": "pijler", "_key": f"pijler{i}", "icoon": p["icoon"], "titel": L(p["titel"]), "tekst": L(p["tekst"])}
            for i, p in enumerate(mb["pijlers"])
        ],
    },
    "pakkettenSectie": {
        "railLabel": L(pk["railLabel"]),
        "railNote": L(pk["railNote"]),
        "kop": L(pk["kop"]),
        "lede": L(pk["lede"]),
        "ctaTekst": L(pk["ctaTekst"]),
        "achtergrondFoto": beeld("pakketten-achtergrond.jpg"),
    },
    "werkwijze": {
        "railLabel": L(ww["railLabel"]),
        "railNote": L(ww["railNote"]),
        "kop": L(ww["kop"]),
        "stappen": [
            {"_type": "stap", "_key": f"stap{i}", "titel": L(st["titel"]), "tekst": L(st["tekst"])}
            for i, st in enumerate(ww["stappen"])
        ],
    },
    "scenariosSectie": {
        "railLabel": L(sc["railLabel"]),
        "railNote": L(sc["railNote"]),
        "kop": L(sc["kop"]),
    },
    "marco": {
        "label": L(seed["marco"]["label"]),
        "kop": L(seed["marco"]["kop"]),
        "tekst": L(seed["marco"]["tekst"]),
    },
    "tagline": L(seed["tagline"]),
    "taglineFoto": beeld("band-breed.jpg"),
    "contactSectie": {"label": L(ct["label"]), "kop": L(ct["kop"]), "lede": L(ct["lede"])},
    "formulier": {sleutel: L(waarde) for sleutel, waarde in f.items()},
}

instellingen = {
    "_id": "instellingen",
    "_type": "instellingen",
    "email": inst["email"],
    "telefoonWeergave": inst["telefoonWeergave"],
    "telefoonInternationaal": inst["telefoonInternationaal"],
    "whatsappNummer": inst["whatsappNummer"],
    "branche": L(inst["branche"]),
    "werkgebied": L(inst["werkgebied"]),
    "kvkRegel": L(inst["kvkRegel"]),
    "voetTagline": L(inst["voetTagline"]),
}

documenten = [pagina, instellingen]

for i, kaart in enumerate(pk["kaarten"]):
    documenten.append({
        "_id": f"pakket-{kaart['code'].lower()}",
        "_type": "pakket",
        "code": kaart["code"],
        "naam": kaart["naam"],
        "prijsBedrag": kaart["prijsBedrag"],
        "vanaf": kaart["vanaf"],
        "beschrijving": L(kaart["beschrijving"]),
        "punten": taal_items(kaart["punten"], "punt"),
        "volgorde": i + 1,
    })

xl = pk["xl"]
documenten.append({
    "_id": "pakket-xl",
    "_type": "pakket",
    "code": xl["code"],
    "naam": xl["naam"],
    "prijsBedrag": xl["prijsBedrag"],
    "vanaf": xl["vanaf"],
    "beschrijving": L(xl["beschrijving"]),
    "punten": [],
    "volgorde": len(pk["kaarten"]) + 1,
})

SCENARIO_ALTS = {
    "ontvangst": "Wachtbank van eikenhout met linnen kussens, ernaast een kentiapalm en een zamioculcas",
    "directie": "Vergaderhoek met walnoten tafel, wollen stoelen en een grote ficus in een keramische pot",
    "praktijk": "Twee linnen fauteuils met bijzettafel en kentiapalm in een rustige wachtruimte",
}

for i, item in enumerate(sc["items"]):
    slot = item["beeldSlot"]
    documenten.append({
        "_id": f"scenario-{slot}",
        "_type": "scenario",
        "titel": L(item["titel"]),
        "tekst": L(item["tekst"]),
        "pastBij": L(item["pastBij"]),
        "foto": beeld(f"scenario-{slot}.jpg", SCENARIO_ALTS.get(slot)),
        "beeldSlot": slot,
        "volgorde": i + 1,
    })

for i, vr in enumerate(seed["vragen"]):
    documenten.append({
        "_id": f"vraag-{i + 1}",
        "_type": "vraag",
        "vraag": L(vr["vraag"]),
        "antwoord": L(vr["antwoord"]),
        "volgorde": i + 1,
    })

with DOEL.open("w") as uit:
    for doc in documenten:
        uit.write(json.dumps(doc, ensure_ascii=False) + "\n")

print(f"{len(documenten)} documenten naar {DOEL.name}")
