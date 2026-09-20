"""Build the public academic CV from the homepage's verified JSON data.

Requires ReportLab and pypdf. Uses Calibri on Windows and Helvetica elsewhere.
Run from any directory: python scripts/build_cv.py
"""

from __future__ import annotations

import json
from datetime import date
from html import escape
from pathlib import Path

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "Qingxiao_Huang_CV.pdf"


def load(name):
    return json.loads((ROOT / "data" / name).read_text(encoding="utf-8-sig"))


PROFILE = load("profile.json")
PUBLICATIONS = load("publications.json")
HONORS = load("honors.json")

font_dir = Path("C:/Windows/Fonts")
FONT = "Helvetica"
if (font_dir / "calibri.ttf").exists():
    for name, filename in [
        ("Calibri", "calibri.ttf"),
        ("Calibri-Bold", "calibrib.ttf"),
        ("Calibri-Italic", "calibrii.ttf"),
        ("Calibri-BoldItalic", "calibriz.ttf"),
    ]:
        pdfmetrics.registerFont(TTFont(name, str(font_dir / filename)))
    pdfmetrics.registerFontFamily(
        "Calibri", normal="Calibri", bold="Calibri-Bold",
        italic="Calibri-Italic", boldItalic="Calibri-BoldItalic",
    )
    FONT = "Calibri"

INK = colors.HexColor("#172D3C")
ACCENT = colors.HexColor("#0C6672")
MUTED = colors.HexColor("#5C6872")
RULE = colors.HexColor("#D4E0E4")
WIDTH, HEIGHT = A4
MARGIN = 47
CONTENT_WIDTH = WIDTH - 2 * MARGIN


def text(value):
    # Keep ordinary ASCII hyphens in the generated document.
    normalized = str(value).translate(str.maketrans({
        "–": "-", "—": "-", "‑": "-", "“": '"', "”": '"', "’": "'",
    }))
    return escape(normalized)


def link(label, url):
    return f'<link href="{escape(url, quote=True)}" color="#0C6672">{text(label)}</link>'


STYLES = {
    "name": ParagraphStyle("name", fontName=FONT, fontSize=30, leading=34, textColor=INK, spaceAfter=4),
    "role": ParagraphStyle("role", fontName=FONT, fontSize=11.4, leading=15, textColor=INK),
    "contact": ParagraphStyle("contact", fontName=FONT, fontSize=10, leading=14, textColor=MUTED),
    "section": ParagraphStyle("section", fontName=FONT, fontSize=12.2, leading=16, textColor=ACCENT, spaceBefore=13, spaceAfter=4, keepWithNext=True),
    "body": ParagraphStyle("body", fontName=FONT, fontSize=10.2, leading=13.5, textColor=INK),
    "small": ParagraphStyle("small", fontName=FONT, fontSize=9.6, leading=12.4, textColor=MUTED),
    "date": ParagraphStyle("date", fontName=FONT, fontSize=9.8, leading=13.5, textColor=MUTED, alignment=TA_RIGHT),
    "pubtitle": ParagraphStyle("pubtitle", fontName=FONT, fontSize=10.3, leading=12.6, textColor=INK),
    "pubauthors": ParagraphStyle("pubauthors", fontName=FONT, fontSize=9.8, leading=12.2, textColor=INK),
    "pubmeta": ParagraphStyle("pubmeta", fontName=FONT, fontSize=9.7, leading=12.2, textColor=MUTED),
    "subtitle": ParagraphStyle("subtitle", fontName=FONT, fontSize=21, leading=26, textColor=INK, spaceAfter=5),
}


def p(value, style="body"):
    return Paragraph(value, STYLES[style])


def section(title):
    return [
        p(f"<b>{text(title)}</b>", "section"),
        HRFlowable(width="100%", thickness=0.65, color=RULE, spaceAfter=6),
    ]


def dated_row(body, dates, after=6):
    table = Table(
        [[body, p(text(dates), "date")]],
        colWidths=[CONTENT_WIDTH - 100, 100],
        hAlign="LEFT",
    )
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return KeepTogether([table, Spacer(1, after)])


updated = date.fromisoformat(PROFILE["updated"]).strftime("%d %B %Y")


class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.saved_pages = []

    def showPage(self):
        self.saved_pages.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        count = len(self.saved_pages)
        for state in self.saved_pages:
            self.__dict__.update(state)
            self.setStrokeColor(RULE)
            self.setLineWidth(0.5)
            self.line(MARGIN, 38, WIDTH - MARGIN, 38)
            self.setFont(FONT, 8.5)
            self.setFillColor(MUTED)
            self.drawString(MARGIN, 25, f"Qingxiao Huang  |  Academic CV  |  Updated {updated}")
            self.drawRightString(WIDTH - MARGIN, 25, f"{self._pageNumber} / {count}")
            super().showPage()
        super().save()


story = [
    p(f"<b>{text(PROFILE['name'])}</b>", "name"),
    p("PhD Student · Department of Computer Science", "role"),
    p(text(PROFILE["affiliation"]), "role"),
    Spacer(1, 7),
    p(
        link(PROFILE["email"], "mailto:" + PROFILE["email"])
        + "  ·  " + link(PROFILE["siteUrl"].removeprefix("https://"), PROFILE["siteUrl"]),
        "contact",
    ),
    p(
        link("Google Scholar", PROFILE["scholar"])
        + "  ·  " + link("ORCID " + PROFILE["orcid"].rsplit("/", 1)[-1], PROFILE["orcid"])
        + "  ·  " + link("CityU Scholars", PROFILE["cityu"]),
        "contact",
    ),
]

story += section("Education")
for education in PROFILE["education"]:
    body = [
        p(f"<b>{text(education['institution'])}</b>"),
        p(text(education["degree"])),
    ]
    if education.get("detail"):
        body.append(p(text(education["detail"]), "small"))
    story.append(dated_row(body, education["dates"], after=7))

story += section("Research Interests")
story.append(p(" · ".join(text(item) for item in PROFILE["interests"])))
story.append(Spacer(1, 5))
for research in PROFILE["research"]:
    story.append(p(f"<b>{text(research['title'])}.</b> {text(research['description'])}", "small"))
    story.append(Spacer(1, 3))

story += section("Selected Honors & Awards")
for honor in HONORS[:7]:
    award_date = honor["date"] if honor["date"] not in ("—", "", None) else ""
    body = p(f"<b>{text(honor['title'])}</b> · {text(honor['org'])}", "small")
    story.append(dated_row(body, award_date, after=4))

story += section("Academic Service & Teaching")
for service in PROFILE["service"]:
    story.append(p(f"<b>{text(service['title'])}.</b> " + "; ".join(text(item) for item in service["items"]), "small"))
    story.append(Spacer(1, 4))

story.append(PageBreak())
story.append(p("<b>Publications &amp; Preprints</b>", "subtitle"))
published = [pub for pub in PUBLICATIONS if pub["status"] != "preprint"]
preprints = [pub for pub in PUBLICATIONS if pub["status"] == "preprint"]
story.append(p(f"{len(published)} journal articles · {len(preprints)} preprints · Name in bold identifies Qingxiao Huang.", "small"))


def publication(pub, number):
    authors = ", ".join(
        f"<b>{text(author)}</b>" if author == PROFILE["name"] else text(author)
        for author in pub["authors"]
    )
    title = f"<b>{number}. {text(pub['title'])}</b>"
    meta = f"<i>{text(pub['venue'])}</i>, {text(pub['year'])}."
    doi = link("DOI: " + pub["doi"], "https://doi.org/" + pub["doi"])
    return KeepTogether([
        p(title, "pubtitle"),
        p(authors, "pubauthors"),
        p(meta, "pubmeta"),
        p(doi, "pubmeta"),
        Spacer(1, 9),
    ])


story += section("Journal Articles")
for number, pub in enumerate(published, 1):
    story.append(publication(pub, f"J{number}"))

story += section("Preprints")
for number, pub in enumerate(preprints, 1):
    story.append(publication(pub, f"P{number}"))

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
doc = SimpleDocTemplate(
    str(OUTPUT), pagesize=A4,
    leftMargin=MARGIN, rightMargin=MARGIN,
    topMargin=41, bottomMargin=53,
    title="Qingxiao Huang - Academic CV",
    author=PROFILE["name"],
    subject="Education, research, publications, honors, and academic service",
    creator="ReportLab - scripts/build_cv.py",
    pageCompression=1,
)
doc.build(story, canvasmaker=NumberedCanvas)

reader = PdfReader(OUTPUT)
assert len(reader.pages) == 2, f"Expected two CV pages; found {len(reader.pages)}"
all_text = "\n".join(page.extract_text() for page in reader.pages)
for pub in PUBLICATIONS:
    assert pub["doi"] in all_text, f"Missing DOI: {pub['doi']}"
for private in ["137-", "qxhuang@std.uestc.edu.cn", "GPA", "2024107983144"]:
    assert private not in all_text, f"Unexpected private/omitted content: {private}"
print(f"Created {OUTPUT} ({len(reader.pages)} pages, {OUTPUT.stat().st_size:,} bytes)")
