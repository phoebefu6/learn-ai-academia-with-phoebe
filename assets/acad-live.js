/* acad-live.js - the screening lab: a systematic-review screen you can actually run.
   Usage:
     <div class="albox" data-mode="lab" data-levers=""></div>       full lever board
     <div class="albox" data-mode="ladder"></div>                   scripted step-through
   data-levers = which levers start ON (comma list of: boolean,snowball,dedup,criteria,aiverify).

   HONESTY RAIL (also printed on the page): the 40-record corpus below is CONSTRUCTED for this
   exercise - realistic-shaped titles around a real research question (retrieval practice in
   undergraduate STEM), but they are not real citations and must never be cited. What is real is
   the arithmetic: every recall, precision and workload number on screen is computed live from
   the records and your lever settings - nothing is hard-coded per step. The real literature on
   retrieval practice exists (Roediger & Karpicke 2006; Dunlosky et al. 2013; Adesope et al.
   2017) - the session links to it. The "let AI screen unverified" toggle is an ANTI-lever: it
   reproduces the documented failure mode of unchecked AI screening - plausible-sounding wrong
   calls - and the meters fall.

   Record flags: gold (truly relevant, 12 of them), kw (naive keyword search finds it),
   bool (structured boolean adds it), snow (citation snowballing adds it), dup (id of the record
   it duplicates), borderline (golden but excluded when no explicit criteria), near (irrelevant
   but included when no explicit criteria), aiX (unverified AI wrongly excludes, with the
   plausible reason), aiI (unverified AI confidently includes, with the plausible reason). */
(function () {
  "use strict";

  var QUESTION = "Does retrieval practice improve long-term retention in undergraduate STEM courses, compared with re-study?";

  var LEVERS = [
    { key: "boolean",  label: "Structured search string", hint: "Naive keyword search misses every paper that says it differently. A boolean string with the field's synonyms - \"retrieval practice\" OR \"testing effect\" OR \"practice testing\" OR \"test-enhanced learning\" - widens what you even get to screen." },
    { key: "snowball", label: "Citation snowballing",     hint: "Chase references backward and citations forward from what you found. Papers using vocabulary you did not guess - \"successive relearning\", \"quizzing\" - only surface here." },
    { key: "dedup",    label: "Deduplication",            hint: "Preprint + published versions of the same study count as one study, not two. Without dedup you screen the same work twice and your included count double-books it." },
    { key: "criteria", label: "Explicit inclusion criteria", hint: "Written PICO-style rules decided BEFORE screening: population (undergraduates, STEM course), comparison (re-study), outcome (retention at a delay). Without them, borderline calls wobble - the same abstract gets a different answer on Tuesday than on Friday." },
    { key: "aiverify", label: "AI screening + human verification", hint: "An AI assistant pre-sorts every abstract against your written criteria; a human verifies every exclude near the boundary and every include. Published evaluations support this pairing: big workload cut, accuracy held - ONLY with the human check." }
  ];

  /* ---------- the corpus: 40 records ---------- */
  var C = [
    /* 12 golden - truly relevant */
    { id: "g1",  gold: 1, kw: 1, y: 2016, t: "Testing effect in introductory biology: a randomized classroom study of retention at one semester" },
    { id: "g2",  gold: 1, kw: 1, y: 2018, t: "Retrieval practice improves retention of general chemistry concepts at six months",
      aiX: "Excluded - retention interval unclear from abstract." },
    { id: "g3",  gold: 1, bool: 1, y: 2015, t: "Test-enhanced learning in undergraduate physics: two randomized experiments" },
    { id: "g4",  gold: 1, kw: 1, borderline: 1, y: 2019, t: "Weekly quizzes and exam performance in a large engineering statics course: a quasi-experiment" },
    { id: "g5",  gold: 1, bool: 1, y: 2020, t: "Practice testing versus re-reading in first-year calculus: delayed retention outcomes" },
    { id: "g6",  gold: 1, kw: 1, y: 2017, t: "Retrieval practice in a flipped microbiology classroom: a controlled comparison with restudy" },
    { id: "g7",  gold: 1, bool: 1, y: 2021, t: "Test-enhanced learning of statistical concepts among undergraduate psychology-methods students" },
    { id: "g8",  gold: 1, snow: 1, y: 2018, t: "Successive relearning of core computer-science concepts: spacing plus retrieval in CS1" },
    { id: "g9",  gold: 1, kw: 1, y: 2014, t: "Testing effects on long-term retention in an anatomy and physiology sequence",
      aiX: "Excluded - appears to concern assessment policy rather than a learning intervention." },
    { id: "g10", gold: 1, snow: 1, y: 2013, t: "Retrieval-based learning in undergraduate genetics: benefits persist at 12 weeks" },
    { id: "g11", gold: 1, snow: 1, borderline: 1, y: 2022, t: "Low-stakes quizzing in organic chemistry: a multi-section quasi-experimental study" },
    { id: "g12", gold: 1, y: 2019, t: "Retrieval practice in engineering mathematics (unindexed conference proceeding, grey literature)" },

    /* 3 near-miss - included when criteria are fuzzy */
    { id: "n1",  near: 1, kw: 1, y: 2015, t: "Testing effect for word lists in a laboratory study with psychology undergraduates" },
    { id: "n2",  near: 1, kw: 1, y: 2017, t: "Retrieval practice raises science scores in middle-school classrooms" },
    { id: "n3",  near: 1, kw: 1, y: 2020, t: "Students report higher confidence after frequent quizzing: a survey study" },

    /* 3 AI-confident wrong includes */
    { id: "x1",  aiI: "Included - directly on-topic per title.", kw: 1, y: 2021, t: "Why testing works: an opinion piece on retrieval practice in higher education" },
    { id: "x2",  aiI: "Included - comprehensive coverage of the intervention.", kw: 1, y: 2019, t: "A narrative overview of the testing effect (no new data)" },
    { id: "x3",  aiI: "Included - reports strong retention gains.", bool: 1, y: 2023, t: "Flashcard-app usage and course grades: an uncontrolled vendor case study" },

    /* 4 duplicates (preprint twins) */
    { id: "d1",  dup: "g1", kw: 1, y: 2015, t: "Testing effect in introductory biology (preprint version)" },
    { id: "d2",  dup: "g2", bool: 1, y: 2017, t: "Retrieval practice and chemistry retention (preprint version)" },
    { id: "d3",  dup: "n1", kw: 1, y: 2014, t: "Testing effect for word lists (preprint version)" },
    { id: "d4",  dup: "x2", kw: 1, y: 2019, t: "A narrative overview of the testing effect (repository copy)" },

    /* 18 plainly irrelevant - the noise every real search returns */
    { id: "r1",  kw: 1, y: 2016, t: "High-stakes testing policy and curriculum narrowing in secondary schools" },
    { id: "r2",  kw: 1, y: 2018, t: "Software testing effectiveness in agile teams: an industrial case study" },
    { id: "r3",  kw: 1, y: 2020, t: "Genetic testing uptake among university students: attitudes and barriers" },
    { id: "r4",  kw: 1, y: 2015, t: "The spacing effect in paired-associate learning: a meta-analytic note" },
    { id: "r5",  kw: 1, y: 2019, t: "Effects of sleep on memory consolidation in young adults" },
    { id: "r6",  kw: 1, y: 2021, t: "Standardized testing anxiety and undergraduate wellbeing" },
    { id: "r7",  kw: 1, y: 2017, t: "Retrieval-induced forgetting in eyewitness memory paradigms" },
    { id: "r8",  kw: 1, y: 2022, t: "Practice effects on repeated IQ testing: a longitudinal cohort" },
    { id: "r9",  kw: 1, y: 2014, t: "Formative assessment beliefs among STEM faculty: an interview study" },
    { id: "r10", kw: 1, y: 2018, t: "Machine scoring of short-answer tests in MOOCs" },
    { id: "r11", bool: 1, y: 2016, t: "Test-enhanced learning in medical residency training programs" },
    { id: "r12", bool: 1, y: 2020, t: "Practice testing in corporate compliance training: completion and recall" },
    { id: "r13", bool: 1, y: 2019, t: "Retrieval practice in second-language vocabulary apps for adult learners" },
    { id: "r14", kw: 1, y: 2021, t: "Exam wrappers and metacognition in introductory programming" },
    { id: "r15", kw: 1, y: 2015, t: "Clickers and participation in large lectures: a review" },
    { id: "r16", snow: 1, y: 2017, t: "Desirable difficulties in motor-skill acquisition" },
    { id: "r17", kw: 1, y: 2023, t: "Item-response models for adaptive testing platforms" },
    { id: "r18", kw: 1, y: 2013, t: "Testing accommodations for students with disabilities in higher education" }
  ];
  var GOLD_TOTAL = 12;

  /* ---------- the real computation ---------- */
  function runScreen(on) {
    /* on = {boolean,snowball,dedup,criteria,aiverify,aiblind} */
    var pool = C.filter(function (r) {
      return r.kw || (on.boolean && r.bool) || (on.snowball && r.snow);
    });
    var identified = pool.length;

    var afterDedup = on.dedup ? pool.filter(function (r) { return !r.dup; }) : pool.slice();

    var included = [];
    afterDedup.forEach(function (r) {
      var base = r.dup ? C.filter(function (m) { return m.id === r.dup; })[0] : r;
      var dec;
      if (on.aiblind) {
        /* unverified AI: gets the easy calls right, and is confidently wrong on the traps */
        if (base.aiX) dec = false;
        else if (base.aiI) dec = true;
        else dec = !!base.gold;
      } else {
        /* human (or AI+verify, same accuracy): correct on golden/irrelevant,
           wobbles on borderline and near-miss unless criteria are written */
        if (base.gold) dec = on.criteria ? true : !base.borderline;
        else if (base.near) dec = !on.criteria;
        else dec = false;
      }
      if (dec) included.push(r);
    });

    var goldIds = {};
    included.forEach(function (r) {
      var base = r.dup ? C.filter(function (m) { return m.id === r.dup; })[0] : r;
      if (base.gold) goldIds[base.id] = 1;
    });
    var recall = Object.keys(goldIds).length;
    var precision = included.length ? recall / included.length : 0;

    var workload;
    if (on.aiblind) workload = 0;
    else if (on.aiverify) workload = Math.ceil(afterDedup.length * 0.3);
    else workload = afterDedup.length;

    return {
      identified: identified, deduped: afterDedup.length, screened: afterDedup.length,
      included: included.length, recall: recall, precision: precision, workload: workload,
      rows: afterDedup, includedRows: included, on: on
    };
  }

  /* ---------- rendering ---------- */
  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt !== undefined) e.textContent = txt;
    return e;
  }

  function meter(label, value, sub, warn) {
    var m = el("div", "al-meter" + (warn ? " al-warn" : ""));
    m.appendChild(el("div", "al-m-val", value));
    m.appendChild(el("div", "al-m-label", label));
    if (sub) m.appendChild(el("div", "al-m-sub", sub));
    return m;
  }

  function statusFor(r, res) {
    var base = r.dup ? C.filter(function (m) { return m.id === r.dup; })[0] : r;
    var inc = res.includedRows.indexOf(r) >= 0;
    if (inc && base.gold) return ["✓ included", "al-ok"];
    if (inc && !base.gold) return ["✗ wrongly included", "al-bad"];
    if (!inc && base.gold) {
      if (res.on.aiblind && base.aiX) return ["✗ AI excluded: " + base.aiX, "al-bad"];
      if (!res.on.criteria && base.borderline && !res.on.aiblind) return ["✗ excluded (borderline call wobbled)", "al-bad"];
      return ["✗ missed", "al-bad"];
    }
    return ["– excluded (correct)", "al-dim"];
  }

  function render(box, on, opts) {
    box.innerHTML = "";
    var res = runScreen(on);

    box.appendChild(el("div", "al-q", "Question: " + QUESTION));

    if (!opts.scripted) {
      var board = el("div", "al-levers");
      LEVERS.forEach(function (L) {
        var b = el("button", "al-lever" + (on[L.key] ? " on" : ""), L.label);
        b.type = "button"; b.title = L.hint;
        b.onclick = function () { on[L.key] = !on[L.key]; render(box, on, opts); };
        board.appendChild(b);
      });
      var trap = el("button", "al-lever al-trap" + (on.aiblind ? " on" : ""), "Let AI screen unverified");
      trap.type = "button";
      trap.title = "The tempting shortcut: zero abstracts read by a human. Watch what it silently does.";
      trap.onclick = function () { on.aiblind = !on.aiblind; if (on.aiblind) on.aiverify = false; render(box, on, opts); };
      board.appendChild(trap);
      box.appendChild(board);
    }

    var meters = el("div", "al-meters");
    meters.appendChild(meter("recall", res.recall + " / " + GOLD_TOTAL, "relevant studies found and included", res.recall < 10));
    meters.appendChild(meter("precision", Math.round(res.precision * 100) + "%", "of what you included is actually relevant", res.precision < 0.9));
    meters.appendChild(meter("abstracts hand-screened", String(res.workload), on.aiblind ? "nobody checked anything" : (on.aiverify ? "AI pre-sorted, human verified the boundary" : "every abstract read by a human"), false));
    box.appendChild(meters);

    var flow = el("div", "al-flow");
    [["identified", res.identified], ["after dedup", res.deduped], ["screened", res.screened], ["included", res.included]].forEach(function (s, i) {
      if (i) flow.appendChild(el("span", "al-f-arrow", "→"));
      var st = el("span", "al-f-step");
      st.appendChild(el("b", null, String(s[1])));
      st.appendChild(el("span", null, s[0]));
      flow.appendChild(st);
    });
    box.appendChild(flow);

    if (on.aiblind) {
      var warn = el("div", "al-trapnote");
      warn.appendChild(el("b", null, "What just silently happened:"));
      var ul = el("ul");
      C.forEach(function (r) {
        if (r.aiX) ul.appendChild(el("li", null, "“" + r.t + "” - " + r.aiX + " (a relevant study, gone, with a reasonable-sounding reason)"));
        if (r.aiI) ul.appendChild(el("li", null, "“" + r.t + "” - " + r.aiI + " (not evidence, now in your review)"));
      });
      warn.appendChild(ul);
      warn.appendChild(el("p", null, "Every reason reads plausibly. That is the failure mode: you do not notice, because there is nothing visibly broken to notice. The published evaluations that show big AI screening time savings all keep a human in the loop."));
      box.appendChild(warn);
    }

    if (res.recall === 11 && !on.aiblind) {
      box.appendChild(el("div", "al-note", "The 12th study never appears: it lives in an unindexed conference proceeding. No search lever finds what is not indexed - that last mile is registries, expert contact and grey-literature sources. An honest review reports that limit."));
    }

    var det = document.createElement("details");
    det.className = "al-corpus";
    var sum = el("summary", null, "See all " + res.rows.length + " records in the pool and each decision");
    det.appendChild(sum);
    var tbl = el("div", "al-rows");
    res.rows.forEach(function (r) {
      var s = statusFor(r, res);
      var row = el("div", "al-row " + s[1]);
      row.appendChild(el("span", "al-r-title", r.t + " (" + r.y + ")"));
      row.appendChild(el("span", "al-r-status", s[0]));
      tbl.appendChild(row);
    });
    det.appendChild(tbl);
    box.appendChild(det);

    box.appendChild(el("div", "al-rail", "Honesty rail: these 40 records are constructed for this exercise (do not cite them) - but every number above is computed live from the records and your levers, nothing is scripted per step. The real literature on retrieval practice is linked in this session."));
  }

  /* ---------- ladder mode: the baked walk ---------- */
  var LADDER = [
    { title: "0 · Naive keyword search, no rules", on: {}, say: "One keyword, no written criteria. The pool is small, borderline calls wobble, near-misses slip in." },
    { title: "1 · + structured search string", on: { boolean: 1 }, say: "The field's synonyms triple your reachable evidence. Recall jumps and you have not screened any harder - you just stopped missing papers that say it differently." },
    { title: "2 · + citation snowballing", on: { boolean: 1, snowball: 1 }, say: "Backward and forward citation chasing surfaces the vocabulary you did not guess." },
    { title: "3 · + deduplication", on: { boolean: 1, snowball: 1, dedup: 1 }, say: "Recall holds; the included count stops double-booking preprint twins, so precision is now honest." },
    { title: "4 · + explicit inclusion criteria", on: { boolean: 1, snowball: 1, dedup: 1, criteria: 1 }, say: "Written PICO rules recover the borderline studies and eject the near-misses. This lever is paperwork, and it is worth more than any AI." },
    { title: "5 · + AI screening, human-verified", on: { boolean: 1, snowball: 1, dedup: 1, criteria: 1, aiverify: 1 }, say: "Same recall, same precision - a fraction of the reading. AI screening buys you time, not truth. The trap button shows what happens when you spend the time saving and skip the verification." }
  ];

  function renderLadder(box) {
    var step = 0;
    function draw() {
      box.innerHTML = "";
      var nav = el("div", "al-ladder-nav");
      LADDER.forEach(function (s, i) {
        var b = el("button", "al-step" + (i === step ? " on" : ""), String(i));
        b.type = "button";
        b.onclick = function () { step = i; draw(); };
        nav.appendChild(b);
      });
      box.appendChild(nav);
      box.appendChild(el("h4", "al-ladder-title", LADDER[step].title));
      box.appendChild(el("p", "al-ladder-say", LADDER[step].say));
      var inner = el("div", "al-inner");
      box.appendChild(inner);
      render(inner, Object.assign({}, LADDER[step].on), { scripted: true });
    }
    draw();
  }

  /* ---------- mount ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".albox").forEach(function (box) {
      var mode = box.getAttribute("data-mode") || "lab";
      if (mode === "ladder") { renderLadder(box); return; }
      var on = {};
      var pre = box.getAttribute("data-levers");
      if (pre !== null && pre !== "") pre.split(",").forEach(function (k) { on[k.trim()] = true; });
      render(box, on, { scripted: false });
    });
  });
})();
