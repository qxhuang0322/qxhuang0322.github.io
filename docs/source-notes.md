# Content verification

Reviewed 21 September 2026. This document records provenance for future maintenance.

## Identity and biography

- User-supplied biography: `people_template.md`, Chinese/English biographical document, and local academic CV.
- [CityU Scholars](https://scholars.cityu.edu.hk/en/persons/qhuang279/) confirms the same name, education, supervisor, Google Scholar ID and ORCID.
- [Departmental research student directory](https://www.cs.cityu.edu.hk/people/research-students) confirms 黃青霄. Simplified Chinese: 黄青霄.
- [ORCID](https://orcid.org/0009-0005-3883-5112) is linked from the matching CityU profile.
- Public contact uses the preferred academic email supplied in the user's biography.
- Local degree labels differ (MEng / M.S.); the website uses Master's and Bachelor's without guessing certificate wording.
- The original CV was outdated; the public CV is a separate current academic version.

## Papers

Every record in `data/publications.json` contains `sourceUrls`. Formal IEEE publication metadata was checked against publisher-deposited Crossref data and official university repositories. There are six published journal articles and two explicitly labeled preprints as of this review.

- Circular Holographic MIMO: IEEE Transactions on **Wireless** Communications, 2026, DOI [10.1109/TWC.2025.3620886](https://doi.org/10.1109/TWC.2025.3620886). The lab homepage's TMC label is inconsistent with the official publication record and was not copied.
- CA3D: already published in IEEE WCL, DOI [10.1109/LWC.2026.3723451](https://doi.org/10.1109/LWC.2026.3723451).
- SRS arXiv:2608.15271 and vehicular reflection arXiv:2603.02752 remain labeled preprints. No full journal acceptance is inferred from a conference-related note.
- Formal issue years take precedence over earlier online-first years (e.g. TGCN DOI includes 2024 while the issue year is 2025).
- A 2022 paper by a same-named author at Communication University of China was excluded because the affiliation did not match.
- Publication illustrations use figures from the corresponding papers, with a source link below each image. Conceptual placeholder diagrams have been removed. Figure sources and extraction details are recorded below.
- No unverified IEEE author-profile URL, source-code URL, citation count, or co-first-authorship marker is included.

## Honors and service

- Research Tuition Scholarship: CityU record (1 September 2026) and [lab news](https://jcstemlab-smartcity.github.io/) (5 September 2026).
- National Graduate Scholarship: 2024, consistent across the local CV, English biography and CityU biography. A 2025 date in the Chinese draft was inconsistent.
- Outstanding Graduate of Sichuan Province: Class of 2025. UESTC's 2025 graduating-cohort nomination list was published in November 2024, explaining the earlier CV date.
- Outstanding Master's Thesis Award: verified in the user's biography and CityU biography, but no explicit award year; displayed without an invented year.
- UGC Projects Funded Full-time PhD Studentship: explicitly supplied by the user. The user requested the PhD enrollment year, 2025, as the displayed date.
- The UESTC Excellent Graduate Student Scholarship and Xidian Excellent Student Scholarship entries were removed at the user’s request.
- TPC membership: IEEE VTC2025-Fall Workshops from the supplied Chinese biography; IEEE GLOBECOM 2026 Workshops explicitly added by the user. No individual workshop title was supplied. At the user’s request, both TPC entries appear under Conference Reviewer alongside Pacific Graphics 2026.
- Journal and conference reviewer roles explicitly supplied by the user: ACM Computing Surveys, IEEE Transactions on Vehicular Technology (TVT), npj Wireless Technology, IET Smart Cities, and Pacific Graphics 2026 (PG 2026). Journal and conference names were normalized against official sources: https://vtsociety.org/publication/ieee-transactions-vehicular-technology, https://www.nature.com/npjwireltech, https://ietresearch.onlinelibrary.wiley.com/journal/26317680, and https://pacificgraphics2026.github.io/.
- Teaching Assistant: the user explicitly supplied CS1302 Introduction to Computer course, 2025 Fall and 2026 Spring, and requested the same presentation as the reference homepage. This replaces the previous tentative Semester A 2026–2027 entry.

## Presentation

Academic layout based on [AcaNova-X](https://github.com/yihangtao/AcaNova-X) and [Yu Guo's homepage](https://gy65896.github.io/). All personal content was replaced. Portrait supplied by the user; the current website photo is the unmodified `qingxiao_google_scholar.jpg`. A Google Maps campus location embed is included at the user’s request. No visitor counter or analytics script was added.

## Publication figures

Images were taken from the corresponding papers without redrawing. PDF crops contain only the figure, with no surrounding body text. The original diagrams and results are unchanged. The images link to their source papers, and clicking a thumbnail opens the full image.

| Paper | Figure | Source | Method |
|---|---|---|---|
| Bringing Environmental Enhancement Back to Its Physical Essence via Specular Reflecting Surfaces | Fig. 1 | [Original paper](https://arxiv.org/html/2608.15271v1#S2.F1) | Original vector figure rendered and cropped from PDF page 3 at 400 dpi; figure only, no caption or body text. |
| Circular Holographic MIMO Beamforming for Integrated Data and Energy Multicast Systems | Fig. 1 | [Original paper](https://arxiv.org/html/2507.05057v1#S1.F1) | Unmodified original PNG from the arXiv HTML figure. |
| Holographic Integrated Data and Energy Transfer | Fig. 1 | [Original paper](https://arxiv.org/html/2404.04927v1#S2.F1) | Unmodified original PNG from the arXiv HTML figure. |
| CA3D: Computing Accessibility-Aware Cooperative 3D Deployment of Multiple UAVs | Fig. 3 | [Original paper](https://arxiv.org/html/2605.17852v1#S5.F3.fig2) | Rendered the original vector figure from PDF page 4 at 360 dpi, cropping only the plotted figure; no redrawing or body text. |
| Shatter Throughput Ceilings: Leveraging Reflection Surfaces to Enhance Transmissions for Vehicular Fast Data Exchange | Fig. 1 | [Original paper](https://arxiv.org/html/2603.02752v1#S1.F1) | Extracted the original embedded PNG image object Im1 directly from PDF page 2; no resizing, redrawing, or body text. |

Exact asset paths, dimensions, and crop details are recorded in `publication-figures.json`. The TGCN terahertz multicast and WCL IRS multicast images were supplied by the user as original figure PDFs and have been added. The non-displayed TVT hybrid THz record still has no image.

## Display scope and journal metrics

At the user’s request, both the homepage selection and the publication archive display only the five first-authored records. Other records remain in the data file for maintenance. First-author badges and the redundant first-author filter were removed.

Journal Impact Factors are journal-level Clarivate JCR metrics, with the data year shown beside each value. The latest verified values are from 2025 (released in June 2026), rather than the individual paper publication year. No impact factor is assigned to an arXiv preprint.

| Journal | 2025 JIF | Official source |
|---|---:|---|
| IEEE Transactions on Wireless Communications | 10.3 | [IEEE / IEEE ComSoc](https://open.ieee.org/wp-content/uploads/IEEE-Title-List-August-2026.pdf#page=3) |
| IEEE Transactions on Green Communications and Networking | 6.9 | [IEEE / IEEE ComSoc](https://open.ieee.org/wp-content/uploads/IEEE-Title-List-August-2026.pdf#page=2) |
| IEEE Wireless Communications Letters | 5.1 | [IEEE / IEEE ComSoc](https://open.ieee.org/wp-content/uploads/IEEE-Title-List-August-2026.pdf#page=3) |

- irs-idem-thz-2025: user-supplied system figure (D:/PhD/bio/tgcn/system-eps-converted-to.pdf); Rendered the user-supplied original figure PDF with Poppler, then trimmed exterior white page margins only; no redrawing or content changes. Source: https://doi.org/10.1109/TGCN.2024.3415030.

- irs-multicast-beamforming-2024: user-supplied system figure (D:/PhD/bio/wcl/system_model_IRS-eps-converted-to.pdf); Rendered the user-supplied original figure PDF with Poppler, then trimmed exterior white page margins only; no redrawing or content changes. Source: https://doi.org/10.1109/LWC.2024.3373494.

## Biography links

School names in About Me are plain text at the user’s request. Kun Yang links to his verified NJU faculty page (https://ise.nju.edu.cn/szll/zjzjs/yangkun.htm). Jie Hu’s old UESTC faculty URL returned an error during verification, so his name currently links to the matching official UESTC faculty introduction (https://www.sice.uestc.edu.cn/info/1470/11935.htm). The collaboration invitation uses the user-requested wording with the profile email.

The Contact map points to the CityU Tat Chee Avenue campus. It does not claim a building or room number. Campus address confirmed from https://www.cityu.edu.hk/directories/academic; an external Google Maps link is also provided.

## University marks

Original university marks are displayed alongside education and the CityU teaching role. CityU and Xidian assets come from their official brand resources; the UESTC seal comes from Article 74 of its official charter. Source URLs and extraction details are recorded in `school-logos.json`.

The user added Yizhe Zhao as a close collaborator in About Me and requested the broader term intelligent surfaces in the research sentence. The link https://faculty.uestc.edu.cn/zhaoyizhe1/zh_CN/index.htm was verified as Zhao Yizhe (赵毅哲), UESTC associate professor, via the official faculty profile and the linked school introduction https://www.sice.uestc.edu.cn/info/1086/14384.htm.
