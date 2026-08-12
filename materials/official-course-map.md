# learn-ai-academia-with-phoebe - official source map

Two tracks, 16 sessions. Leader track (a1-a6) for PIs, professors, lab heads and research-office
leaders. Researcher track (b1-b10) for PhD students, postdocs and hands-on researchers.

**The no-bluff contract of this course:** the audience is researchers - every policy claim traces
to a primary source (the live notice or policy page), every tool claim traces to vendor
documentation or a peer-reviewed evaluation, and anything unverifiable is flagged on the page
rather than asserted. Sources verified August 2026. **Fast-moving territory: re-verify the policy
appendix against the live pages before any delivery.**

Signature interactive: **`assets/acad-live.js`** - the screening lab. A 40-record constructed
corpus (12 truly relevant) around a real research question (retrieval practice in undergraduate
STEM). Recall, precision, workload and the PRISMA flow are computed live from the record set and
lever state - nothing scripted per step. Five levers (boolean string, snowballing, dedup, written
criteria, AI-verified screening) plus one ANTI-lever ("let AI screen unverified").

## Simulator canon (verified live in-browser 2026-08-12, before fan-out)

| Step | Levers | Recall | Precision | Hand-screened |
|------|--------|--------|-----------|---------------|
| 0 | none (keyword only) | 4/12 | 44% | 27 |
| 1 | + boolean | 7/12 | 54% | 35 |
| 2 | + snowball | 9/12 | 60% | 39 |
| 3 | + dedup | 9/12 | 75% | 35 |
| 4 | + criteria | 11/12 | 100% | 35 |
| 5 | + AI verified | 11/12 | 100% | 11 |
| trap | AI unverified | 9/12 | 75% | 0 |

The 12th study is unreachable by design (unindexed grey literature) - the honest-ceiling teaching
point. The trap silently excludes g2 and g9 with plausible reasons and includes 3 non-evidence
records.

## Session coverage - leader track

| Session | Covers | Status |
|---------|--------|--------|
| **a1** The AI-era lab | Capability/failure map; real teaching cases: "Certainly, here is a possible introduction" retraction (Elsevier *Surfaces and Interfaces* 2024), Frontiers AI rat-figure retraction (Feb 2024, retracted in days), tortured phrases (Cabanac et al. 2021) + Problematic Paper Screener; Liang et al. ICML 2024: 6.5-16.9% of AI-conference peer-review text LLM-modified | ✓ |
| **a2** Policy rails | NIH NOT-OD-23-149 (AI prohibited in peer review, 2023) + NOT-OD-25-132 (substantially-AI-developed applications not the applicant's original ideas; 6-application cap; 2025); NSF PAPPG stance; publisher matrix (Springer Nature, Elsevier, Science/AAAS, Wiley, IEEE, ACM); ICMJE dedicated AI section (cover-letter + in-work disclosure; reviewer permission-first); COPE position | ✓ |
| **a3** Supervision + authorship | Universal no-AI-authorship consensus (accountability rationale); disclosure norms without stigma; student-use ground rules; detector caution: Liang et al. Patterns 2023 - GPT detectors biased against non-native English writers (verify exact figure before quoting); Grammarly Authorship as provenance (not detection) | ✓ |
| **a4** Grants with AI | NOT-OD-25-132 practical meaning (intellectual control of aims/design/claims; post-award escalation risk); NSF proposer responsibility; university research-office guidance exemplars (Stanford Medicine 10 rules, Utah OSP, UCSF OSR); disclosure norms funder-dependent (flagged, no universal standard) | ✓ |
| **a5** Peer review duty | NOT-OD-23-149 confidentiality logic; Elsevier + Springer Nature reviewer upload bans; ICMJE permission-first + disclose-in-review; workload reality: Aczel et al. 2021 - >100M reviewer hours in 2020; Publons 2018 ~68.5M hrs/yr; COPE case guidance on suspected AI reviews | ✓ |
| **a6** Lab stack + policy capstone | Consumer vs enterprise data terms; unpublished/participant-data red line; free-first stack; the one-page lab AI policy (drafted live); quarterly re-verification ritual | ✓ |

## Session coverage - researcher track

| Session | Covers | Status |
|---------|--------|--------|
| **b1** Setup + ground rules | Lifecycle leverage map; policy check demo on the learner's own university/funder/journals; free stack (Semantic Scholar, OpenAlex, ResearchRabbit/Connected Papers, ASReview, Zotero, NotebookLM); fabrication base rates (Walters & Wilder 2023: 55% GPT-3.5 / 18% GPT-4; Chelli et al. 2024: 28.6-39.6%, Bard 91.4%); three ground rules | ✓ |
| **b2** Search + discovery | Semantic Scholar (Ai2, 200M+ papers, free API); OpenAlex (CC0; 324M works via live API 2026-08; usage-based API pricing since Feb 2026 - verify); Connected Papers / ResearchRabbit (free-forever tier; acquired by Litmaps 2025) / Litmaps; boolean craft + synonym harvesting; backward/forward snowballing; deep-research modes as leads-not-evidence (no published academic citation-accuracy audit; nearest: Magesh et al. 2025 legal RAG 17-33% hallucination) | ✓ |
| **b3** Screening lab | PRISMA 2020 flow logic; recall + precision; written PICO criteria; known-set spot check; AI screening evidence: ASReview (van de Schoot et al., Nat Mach Intell 2021; SAFE stopping rule, Syst Rev 2024), LLM-screening studies (Khraisha et al. 2024 RSM; BMC Med Res Methodol 2024; Matsui et al. JMIR 2024; Environmental Evidence 2025) - consistent finding: second screener/prioritizer, not replacement; the simulator | ✓ |
| **b4** Extraction + synthesis | Elicit workflow (Pro screening to 5,000 papers; self-published accuracy evals vs peer-reviewed "usable with human verification" - Research Synthesis Methods feasibility study; Soc Sci Computer Review 2025: second reviewer, not replacement); Covidence extraction suggestions; Rayyan relevance predictions; scite Smart Citations (supports/contrasts/mentions; QSS 2021 paper ~880M statements as verified anchor); verify-every-cell discipline; NotebookLM grounding limits (Google's own FAQ) | ✓ |
| **b5** Hypothesis engine | AI sparring patterns; falsifiability discipline; HARKing risk industrialized by AI (published commentary, arXiv 2502.05151, 2507.04491); OSF preregistration + AsPredicted (Wharton Credibility Lab); novelty check against literature | ✓ |
| **b6** Research code | JOSS review criteria (tests required: automated suite + CI = "Good", nothing = not acceptable); ACM artifact badging v1.1 (Available / Functional / Results Reproduced); NeurIPS paper checklist (seeds, error bars, reproduction info); "Twelve quick tips for AI-assisted coding in science" (PLOS Comp Biol 2026); SciCoQA (ACL 2026): best LLMs find only 46.7% of paper-code discrepancies - human audit stays; pytest + CI on an analysis pipeline (build-along) | ✓ |
| **b7** Data analysis | ChatGPT ADA = real Python sandbox, OpenAI's own review-the-code instruction; Gelman & Loken forking paths (2013); AI-specific: Prompt-Hacking (arXiv 2504.14571), Sanity Checks for Agentic Data Science (arXiv 2604.11003), LLM hacking in annotation (arXiv 2509.08825); multiple-comparisons discipline; repro package assembly | ✓ |
| **b8** Writing + publication | Springer Nature: AI copy-editing needs no declaration; Elsevier: disclosure statement required beyond grammar checks; Science strictest historically; ICMJE: describe use in cover letter AND submitted work; Overleaf AI Assist/Writefull, Paperpal, Grammarly Authorship, Curie→Rubriq (AJE); equity evidence: Amano et al. PLOS Biology 2023 (non-native speakers: 2.5x rejection, 12.5x English-revision requests); only ~0.1% of post-2023 papers disclosed AI use despite ~70% of journals having policies (arXiv 2512.06705) | ✓ |
| **b9** Reviewing others | Reviewer rules consolidated (never upload; ICMJE permission + disclosure; NIH ban); Liang et al. ICML 2024 detection findings; what IS allowed: AI on your own review text within journal rules; review-response strategy for authors | ✓ |
| **b10** Capstone | Full pipeline on the learner's own question: search → screen → extract → code → analyse → write, with audit trail, disclosure statement, repro package; one honest unknown stated | ✓ |

## Verified sources appendix (primary URLs)

### Policies
- NIH NOT-OD-23-149: https://grants.nih.gov/grants/guide/notice-files/NOT-OD-23-149.html
- NIH NOT-OD-25-132: https://grants.nih.gov/grants/guide/notice-files/NOT-OD-25-132.html
- Elsevier GenAI policies: https://www.elsevier.com/about/policies-and-standards/generative-ai-policies-for-journals
- Springer Nature AI guidance: https://group.springernature.com/gp/group/ai/ai-guidance-for-our-researchers-and-communities
- Springer Nature editorial policies: https://www.springernature.com/gp/policies/editorial-policies
- ICMJE AI recommendations: https://www.icmje.org/recommendations/browse/artificial-intelligence/
- COPE AI focus: https://publicationethics.org/cope-focus/artificial-intelligence
- APA journals GenAI policy: https://www.apa.org/pubs/journals/resources/publishing-tips/policy-generative-ai
- arXiv: LLM use not prohibited; authors take full responsibility for all contents however generated; CS section penalizes unchecked AI content (hallucinated citations, residual prompts) up to a one-year ban - Nature news: https://www.nature.com/articles/d41586-026-01595-5
- bioRxiv + ERC current AI stances: NOT fully verified in this build - pages must say "check the live policy" rather than assert specifics (policy agent died mid-run; re-verify before delivery)

### Tools (vendor docs)
- Semantic Scholar: https://www.semanticscholar.org/about
- OpenAlex: https://openalex.org/about + https://help.openalex.org/
- ASReview: https://asreview.readthedocs.io + https://github.com/asreview/asreview
- Elicit pricing/capabilities: https://elicit.com/pricing
- Rayyan: https://www.rayyan.ai/pricing
- Covidence automation: https://support.covidence.org/help/overview-of-all-automation-ai-features-available-in-covidence
- NotebookLM limits/grounding: https://support.google.com/notebooklm/answer/16269187
- Claude Projects: https://support.claude.com/en/articles/9517075-what-are-projects
- ChatGPT data analysis: https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt
- OpenAI Deep Research quotas: https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt
- Gemini Deep Research: https://support.google.com/gemini/answer/15719111
- GitHub Copilot education plans: https://docs.github.com/en/copilot/get-started/plans
- Overleaf AI features: https://www.overleaf.com/about/ai-features
- Grammarly Authorship: https://www.grammarly.com/authorship
- ResearchRabbit: https://www.researchrabbit.ai/pricing
- Litmaps: https://www.litmaps.com/pricing

### Peer-reviewed evidence
- van de Schoot et al. 2021, ASReview validation, Nat Mach Intell: https://www.nature.com/articles/s42256-020-00287-7
- Boetje & van de Schoot 2024, SAFE stopping rule: https://systematicreviewsjournal.biomedcentral.com/articles/10.1186/s13643-024-02502-7
- Walters & Wilder 2023, fabricated citations, Sci Rep: https://www.nature.com/articles/s41598-023-41032-5
- Chelli et al. 2024, hallucination rates, JMIR: https://www.jmir.org/2024/1/e53164
- Magesh et al. 2025, legal RAG hallucination, JELS: https://onlinelibrary.wiley.com/doi/full/10.1111/jels.12413
- Liang et al. 2024, LLM-modified peer reviews, ICML: https://arxiv.org/abs/2403.07183
- Liang et al. 2023, detector bias vs non-native writers, Patterns: https://www.cell.com/patterns/fulltext/S2666-3899(23)00130-7
- Aczel et al. 2021, 100M review hours: https://link.springer.com/article/10.1186/s41073-021-00118-2
- Amano et al. 2023, non-native speaker costs, PLOS Biology: https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.3002184
- Khraisha et al. 2024, LLM systematic review tasks, RSM: https://onlinelibrary.wiley.com/doi/10.1002/jrsm.1715
- BMC Med Res Methodol 2024 ChatGPT screening: https://link.springer.com/article/10.1186/s12874-024-02203-8
- Matsui et al. 2024, 3-layer screening, JMIR: https://www.jmir.org/2024/1/e52758
- Environmental Evidence 2025, GPT screening: https://link.springer.com/article/10.1186/s13750-025-00360-x
- Gelman & Loken 2013, forking paths: https://sites.stat.columbia.edu/gelman/research/unpublished/p_hacking.pdf
- PLOS Comp Biol 2026, Twelve quick tips AI-assisted coding: https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1014428
- SciCoQA (ACL 2026), paper-code discrepancies: https://aclanthology.org/2026.acl-long.1795.pdf
- Undisclosed AI use rate (arXiv): https://arxiv.org/pdf/2512.06705
- Cabanac et al. 2021, tortured phrases: https://arxiv.org/abs/2107.06751
- JOSS review criteria: https://joss.readthedocs.io/en/latest/review_criteria.html
- ACM artifact badging: https://www.acm.org/publications/policies/artifact-review-and-badging-current
- NeurIPS paper checklist: https://neurips.cc/public/guides/PaperChecklist

### Teaching cases (retractions - real, citable)
- "Certainly, here is a possible introduction": Zhang et al., Surfaces and Interfaces (Elsevier), retracted May 2024. Catalogued: https://www.academ-ai.info/posts/zhang2024/
- Radiology Case Reports "I am an AI language model" removal: https://www.sciencedirect.com/science/article/pii/S1930043324001298
- Frontiers AI rat figure retraction: https://www.frontiersin.org/articles/10.3389/fcell.2024.1386861/full ; Bik analysis: https://scienceintegritydigest.com/2024/02/15/the-rat-with-the-big-balls-and-enormous-penis-how-frontiers-published-a-paper-with-botched-ai-generated-images/
- Academ-AI catalogue: https://www.academ-ai.info/

## Flagged UNVERIFIED (never state as fact on any page)
1. Consensus (the tool) pricing and current corpus figures.
2. scite's current citation-statement count (use QSS 2021 ~880M as anchor).
3. Julius AI pricing/limits.
4. Perplexity Deep Research quota changes (press-reported only) and Academic corpus composition.
5. Any "Paperpile AI" feature set.
6. Scholarcy free-tier limits (sources conflict).
7. Rayyan "#1 duplicate detection" (no cited study).
8. Elicit's self-published 94-99% extraction accuracy (use peer-reviewed "usable with verification" framing).
9. Any citation-accuracy rate for OpenAI/Gemini/Claude deep-research modes in academic domains (no published audit found).
10. The exact "61% of non-native essays flagged" detector figure (verify against the Patterns paper before quoting a number; the bias finding itself is verified).

## Not covered, by design
- **Claim-vs-source evidence auditing** - AI + Research (learn-ai-research-with-phoebe) owns it; referenced and pointed across.
- **Fabricated-citation detection technique** - AI + Law (learn-ai-law-with-phoebe) owns the deep dive; this course carries the base rates as motivation.
- **Teaching with AI / course design** - AI + Education owns the educator side.
- **Meta-analytic computation** (pooling effect sizes) - the course teaches the screening/extraction discipline, not statistical synthesis.
- **Field-specific instrument AI** (AlphaFold-class scientific ML) - out of scope; this course is the working researcher's toolchain, not domain models.
- Certificates/formal systematic-review accreditation stay with the official bodies (Cochrane, JBI); said honestly on the pages.
