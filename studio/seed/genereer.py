#!/usr/bin/env python3
"""Zet site/src/inhoud/seed.json (NL) en seed-en.json (EN) om naar seed.ndjson
voor Sanity.

De seeds in de site zijn de bron (platte teksten per taal); dit script vouwt
elke tekst in een {nl: ..., en: ...}-taalobject en zet _id, _type en _key's
zoals de schema's ze verwachten. Importeren:

    cd studio
    npx sanity dataset import seed/seed.ndjson production --replace
"""

import json
import pathlib

HIER = pathlib.Path(__file__).resolve().parent
BRON_NL = HIER.parent.parent / "site" / "src" / "inhoud" / "seed.json"
BRON_EN = HIER.parent.parent / "site" / "src" / "inhoud" / "seed-en.json"
DOEL = HIER / "seed.ndjson"

seed = json.loads(BRON_NL.read_text())
seed_en = json.loads(BRON_EN.read_text())


def L(nl, en=None):
    """Bouwt een taalobject {nl, en} voor taalString/taalTekst-velden."""
    return {"nl": nl, "en": en}


def beeld(bestand, alt=None):
    """Afbeelding als importeerbare asset; het pad is relatief aan seed.ndjson."""
    asset = {"_type": "image", "_sanityAsset": f"image@file://./beelden/{bestand}"}
    if alt:
        asset["alt"] = alt
    return asset


nav = seed["nav"]
nav_en = seed_en["nav"]
hero = seed["hero"]
hero_en = seed_en["hero"]
insp = seed["inspiratie"]
insp_en = seed_en["inspiratie"]
fil = seed["filosofie"]
fil_en = seed_en["filosofie"]
dst = seed["diensten"]
dst_en = seed_en["diensten"]
ib = seed["inspiratieboek"]
ib_en = seed_en["inspiratieboek"]
pk = seed["pakketten"]
pk_en = seed_en["pakketten"]
gs = seed["geschenken"]
gs_en = seed_en["geschenken"]
ov = seed["over"]
ov_en = seed_en["over"]
ct = seed["contact"]
ct_en = seed_en["contact"]
f = ct["formulier"]
f_en = ct_en["formulier"]
inst = seed["instellingen"]
inst_en = seed_en["instellingen"]

GESCHENK_FOTO = {
    "onboarding": "geschenk-onboarding.jpg",
    "relatie": "geschenk-relatie.jpg",
    "kerst": "geschenk-kerst.jpg",
}

pagina = {
    "_id": "pagina",
    "_type": "pagina",
    "nav": {
        "inspiratie": L(nav["inspiratie"], nav_en["inspiratie"]),
        "diensten": L(nav["diensten"], nav_en["diensten"]),
        "contact": L(nav["contact"], nav_en["contact"]),
    },
    "hero": {
        "kop": L(hero["kop"], hero_en["kop"]),
        "sub": L(hero["sub"], hero_en["sub"]),
        "intro": L(hero["intro"], hero_en["intro"]),
        "ctaPrimair": L(hero["ctaPrimair"], hero_en["ctaPrimair"]),
        "ctaPrimairKort": L(hero["ctaPrimairKort"], hero_en["ctaPrimairKort"]),
        "ctaSecundair": L(hero["ctaSecundair"], hero_en["ctaSecundair"]),
        "cueTekst": L(hero["cueTekst"], hero_en["cueTekst"]),
        "foto": beeld(
            "hero-breed.jpg",
            "Ontvangstruimte van een kantoor met een volle groep planten, een kentiapalm, ficus, monstera en varen in keramische potten naast een eiken balie, links een rustige lichte wand",
        ),
    },
    "inspiratieSectie": {
        "railLabel": L(insp["railLabel"], insp_en["railLabel"]),
        "railNote": L(insp["railNote"], insp_en["railNote"]),
        "kop": L(insp["kop"], insp_en["kop"]),
        "lede": L(insp["lede"], insp_en["lede"]),
    },
    "filosofie": {
        "railLabel": L(fil["railLabel"], fil_en["railLabel"]),
        "railNote": L(fil["railNote"], fil_en["railNote"]),
        "kop": L(fil["kop"], fil_en["kop"]),
        "kopVervolg": L(fil["kopVervolg"], fil_en["kopVervolg"]),
        "kopAccent": L(fil["kopAccent"], fil_en["kopAccent"]),
        "tekst": L(fil["tekst"], fil_en["tekst"]),
        "foto": beeld("band-breed.jpg", fil["fotoAlt"]),
    },
    "dienstenSectie": {
        "railLabel": L(dst["railLabel"], dst_en["railLabel"]),
        "railNote": L(dst["railNote"], dst_en["railNote"]),
        "kop": L(dst["kop"], dst_en["kop"]),
        "kaarten": [
            {
                "_type": "dienst",
                "_key": f"dienst{i}",
                "icoon": kaart["icoon"],
                "titel": L(kaart["titel"], dst_en["kaarten"][i]["titel"]),
                "tekst": L(kaart["tekst"], dst_en["kaarten"][i]["tekst"]),
            }
            for i, kaart in enumerate(dst["kaarten"])
        ],
    },
    "inspiratieboek": {
        "label": L(ib["label"], ib_en["label"]),
        "kop": L(ib["kop"], ib_en["kop"]),
        "tekst": L(ib["tekst"], ib_en["tekst"]),
        "ctaTekst": L(ib["ctaTekst"], ib_en["ctaTekst"]),
        "foto": beeld("inspiratieboek.jpg", ib["fotoAlt"]),
    },
    "pakkettenSectie": {
        "railLabel": L(pk["railLabel"], pk_en["railLabel"]),
        "railNote": L(pk["railNote"], pk_en["railNote"]),
        "kop": L(pk["kop"], pk_en["kop"]),
        "prijsVanaf": L(pk["prijsVanaf"], pk_en["prijsVanaf"]),
        "prijsToelichting": L(pk["prijsToelichting"], pk_en["prijsToelichting"]),
        "ctaTekst": L(pk["ctaTekst"], pk_en["ctaTekst"]),
        "achtergrondFoto": beeld("pakketten-achtergrond.jpg"),
    },
    "geschenken": {
        "railLabel": L(gs["railLabel"], gs_en["railLabel"]),
        "kop": L(gs["kop"], gs_en["kop"]),
        "lede": L(gs["lede"], gs_en["lede"]),
        "items": [
            {
                "_type": "geschenk",
                "_key": f"geschenk{i}",
                "icoon": item["icoon"],
                "titel": L(item["titel"], gs_en["items"][i]["titel"]),
                "sub": L(item["sub"], gs_en["items"][i]["sub"]),
                "tekst": L(item["tekst"], gs_en["items"][i]["tekst"]),
                "beeldSlot": item["beeldSlot"],
                "foto": beeld(GESCHENK_FOTO[item["beeldSlot"]], item["alt"]),
            }
            for i, item in enumerate(gs["items"])
        ],
        "seizoen": {
            "icoon": gs["seizoen"]["icoon"],
            "titel": L(gs["seizoen"]["titel"], gs_en["seizoen"]["titel"]),
            "sub": L(gs["seizoen"]["sub"], gs_en["seizoen"]["sub"]),
            "tekst": L(gs["seizoen"]["tekst"], gs_en["seizoen"]["tekst"]),
            "afsluiter": L(gs["seizoen"]["afsluiter"], gs_en["seizoen"]["afsluiter"]),
            "foto": beeld("geschenk-seizoen.jpg", gs["seizoen"]["alt"]),
        },
    },
    "over": {
        "railLabel": L(ov["railLabel"], ov_en["railLabel"]),
        "kop": L(ov["kop"], ov_en["kop"]),
        "tekst1": L(ov["tekst1"], ov_en["tekst1"]),
        "tekst2": L(ov["tekst2"], ov_en["tekst2"]),
        "foto": beeld("over-vignet.jpg", ov["fotoAlt"]),
    },
    "contactSectie": {
        "label": L(ct["label"], ct_en["label"]),
        "kop": L(ct["kop"], ct_en["kop"]),
        "lede": L(ct["lede"], ct_en["lede"]),
        "labelEmail": L(ct["labelEmail"], ct_en["labelEmail"]),
        "labelTelefoon": L(ct["labelTelefoon"], ct_en["labelTelefoon"]),
        "labelWerkgebied": L(ct["labelWerkgebied"], ct_en["labelWerkgebied"]),
        "werkgebiedTekst": L(ct["werkgebiedTekst"], ct_en["werkgebiedTekst"]),
    },
    "formulier": {sleutel: L(waarde, f_en[sleutel]) for sleutel, waarde in f.items()},
}

instellingen = {
    "_id": "instellingen",
    "_type": "instellingen",
    "email": inst["email"],
    "telefoonWeergave": inst["telefoonWeergave"],
    "telefoonInternationaal": inst["telefoonInternationaal"],
    "whatsappNummer": inst["whatsappNummer"],
    "whatsappBericht": L(inst["whatsappBericht"], inst_en["whatsappBericht"]),
    "branche": L(inst["branche"], inst_en["branche"]),
    "werkgebied": L(inst["werkgebied"], inst_en["werkgebied"]),
    "kvkRegel": L(inst["kvkRegel"], inst_en["kvkRegel"]),
    "voetTagline": L(inst["voetTagline"], inst_en["voetTagline"]),
    "privacyLabel": L(inst["privacyLabel"], inst_en["privacyLabel"]),
    "voorwaardenLabel": L(inst["voorwaardenLabel"], inst_en["voorwaardenLabel"]),
}
if inst.get("linkedinUrl"):
    instellingen["linkedinUrl"] = inst["linkedinUrl"]
if inst.get("instagramUrl"):
    instellingen["instagramUrl"] = inst["instagramUrl"]

documenten = [pagina, instellingen]

PAKKET_FOTO = {
    "S": "pakket-impact.jpg",
    "M": "pakket-corporate.jpg",
    "L": "pakket-signature.jpg",
    "XL": "pakket-prestige.jpg",
}

for i, kaart in enumerate(pk["kaarten"]):
    kaart_en = pk_en["kaarten"][i]
    documenten.append(
        {
            "_id": f"pakket-{kaart['code'].lower()}",
            "_type": "pakket",
            "code": kaart["code"],
            "naam": kaart["naam"],
            "beschrijving": L(kaart["beschrijving"], kaart_en["beschrijving"]),
            "punten": [
                {"_type": "taalString", "_key": f"punt{j}", **L(punt, kaart_en["punten"][j])}
                for j, punt in enumerate(kaart["punten"])
            ],
            "foto": beeld(PAKKET_FOTO[kaart["code"]]),
            "volgorde": i + 1,
        }
    )

BEELDSLOT_BESTAND = {
    "hotel": "inspiratie-hotel.jpg",
    "makelaar": "inspiratie-makelaar.jpg",
    "directie": "scenario-directie.jpg",
    "praktijk": "scenario-praktijk.jpg",
    "ontvangst": "scenario-ontvangst.jpg",
    "villa": "inspiratie-villa.jpg",
    "tandarts": "inspiratie-tandarts.jpg",
    "lobby": "inspiratie-lobby.jpg",
}

for i, item in enumerate(insp["items"]):
    slot = item["beeldSlot"]
    item_en = insp_en["items"][i]
    documenten.append(
        {
            "_id": f"inspiratiebeeld-{slot}",
            "_type": "inspiratiebeeld",
            "label": L(item["label"], item_en["label"]),
            "alt": L(item["alt"], item_en["alt"]),
            "beeldSlot": slot,
            "rij": item["rij"],
            "volgorde": i + 1,
            "foto": beeld(BEELDSLOT_BESTAND[slot]),
        }
    )

with DOEL.open("w") as uit:
    for doc in documenten:
        uit.write(json.dumps(doc, ensure_ascii=False) + "\n")

print(f"{len(documenten)} documenten naar {DOEL.name}")
