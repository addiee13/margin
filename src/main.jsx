import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Search,
  X,
  Check,
  Link,
  BookOpen,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import artifacts from "./data/artifacts.json";
import "./style.css";
import { TextHighlighter, LetterSwap } from "./components/FancyText";
const base = import.meta.env.BASE_URL;
const routeFor = (id, section = "") =>
  `#/read/${id}${section ? "?section=" + encodeURIComponent(section) : ""}`;
function readRoute() {
  const m = location.hash.match(/^#\/read\/([^?]+)(?:\?section=(.*))?/);
  return m ? { id: m[1], section: decodeURIComponent(m[2] || "") } : null;
}
function Icon({ type, ...props }) {
  const I = type;
  return <I size={18} strokeWidth={1.5} aria-hidden="true" {...props} />;
}
function NeuralPlate() {
  const nodes = [
    { x: 55, y: 100 },
    { x: 55, y: 175 },
    { x: 55, y: 250 },
    { x: 185, y: 65 },
    { x: 185, y: 145 },
    { x: 185, y: 225 },
    { x: 185, y: 305 },
    { x: 320, y: 100 },
    { x: 320, y: 175 },
    { x: 320, y: 250 },
    { x: 440, y: 145 },
    { x: 440, y: 225 },
  ];
  const lines = [];
  [
    [
      [0, 1, 2],
      [3, 4, 5, 6],
    ],
    [
      [3, 4, 5, 6],
      [7, 8, 9],
    ],
    [
      [7, 8, 9],
      [10, 11],
    ],
  ].forEach(([a, b]) => a.forEach((i) => b.forEach((j) => lines.push([i, j]))));
  return (
    <div
      className="neural-plate"
      aria-label="A neural network, from inputs through hidden layers to output"
    >
      <div className="plate-top">
        <span>Fig. 01</span>
        <span>A little less. A lot more.</span>
      </div>
      <svg
        viewBox="0 0 495 350"
        role="img"
        aria-label="Diagram of a four-layer neural network"
      >
        <g className="connections">
          {lines.map(([i, j], k) => (
            <line
              key={k}
              pathLength="1"
              style={{ animationDelay: `${Math.floor(k / 12) * 110}ms` }}
              x1={nodes[i].x}
              y1={nodes[i].y}
              x2={nodes[j].x}
              y2={nodes[j].y}
              className={k % 4 === 0 ? "pruned" : ""}
            />
          ))}
        </g>
        {nodes.map((n, i) => (
          <g key={i} className="neuron">
            <circle
              cx={n.x}
              cy={n.y}
              r={i > 9 ? 16 : 14}
              className={i < 3 ? "input" : i > 9 ? "output" : ""}
            />
            <circle cx={n.x} cy={n.y} r="3" />
          </g>
        ))}
        <text x="55" y="341" textAnchor="middle">
          input
        </text>
        <text x="252" y="341" textAnchor="middle">
          what happens in between
        </text>
        <text x="440" y="341" textAnchor="middle">
          output
        </text>
      </svg>
      <div className="plate-note">
        <span className="small-line" />
        The art of keeping what matters.
      </div>
    </div>
  );
}
function ArtifactArt({ id }) {
  return (
    <svg
      className="artifact-art"
      viewBox="0 0 150 90"
      aria-hidden="true"
      data-illustration={id}
    >
      {id === "lecture2-efficient-ai" ? (
        <>
          <rect
            x="35"
            y="19"
            width="80"
            height="50"
            rx="5"
            fill="#eeebfb"
            stroke="#bcb4e7"
          />
          <rect
            x="47"
            y="29"
            width="56"
            height="30"
            rx="2"
            fill="#fffefb"
            stroke="#5b4fc7"
          />
          {Array.from({ length: 6 }, (_, i) => (
            <g key={i}>
              <path
                d={`M ${43 + i * 13} 10 v9 M ${43 + i * 13} 69 v9`}
                stroke="#bcb4e7"
              />
              <path
                d={`M 26 ${25 + i * 7} h9 M 115 ${25 + i * 7} h9`}
                stroke="#bcb4e7"
              />
            </g>
          ))}
          <text x="75" y="48" textAnchor="middle">
            less, better
          </text>
        </>
      ) : id === "neural-network-building-blocks" ? (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${30 + i * 26},${19 + i * 10})`}>
              <rect
                width="52"
                height="40"
                rx="2"
                fill={i === 2 ? "#fde7c4" : "#eeebfb"}
                stroke={i === 2 ? "#c9ae89" : "#bcb4e7"}
              />
              {[0, 1, 2].map((j) => (
                <path
                  key={j}
                  d={`M 0 ${10 + j * 10} h52 M ${13 + j * 13} 0 v40`}
                  stroke="#fffefb"
                />
              ))}
            </g>
          ))}
        </>
      ) : id === "channels-kernels-and-filters" ? (
        <g strokeLinecap="round" strokeLinejoin="round">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${15 + i * 8},${18 + i * 8})`}>
              <rect width="38" height="38" rx="3" fill="#eeebfb" stroke="#bcb4e7" />
              <path d="M13 0V38M25 0V38M0 13H38M0 25H38" stroke="#bcb4e7" />
            </g>
          ))}
          <path d="M72 44H86M82 40L86 44L82 48" fill="none" stroke="#5b4fc7" />
          <rect x="94" y="27" width="35" height="35" rx="3" fill="#fde7c4" stroke="#c9ae89" />
          <path d="M106 27V62M117 27V62M94 39H129M94 50H129" stroke="#c9ae89" />
          <rect x="106" y="39" width="11" height="11" fill="#5b4fc7" />
          <text x="45" y="83" textAnchor="middle">3 in</text>
          <text x="111" y="83" textAnchor="middle">1 out</text>
        </g>
      ) : id === "lecture3-efficient-ai-deep" ? (
        <>
          {[62, 94, 48, 112].map((w, i) => (
            <g key={i}>
              <rect
                x="20"
                y={15 + i * 16}
                width="112"
                height="7"
                fill="#eeeae1"
                rx="1"
              />
              <rect
                x="20"
                y={15 + i * 16}
                width={w}
                height="7"
                fill={i === 3 ? "#d4b381" : "#8f82d7"}
                rx="1"
              />
            </g>
          ))}
        </>
      ) : id === "convolution-and-exam-math-lab" ? (
        <g strokeLinecap="round" strokeLinejoin="round">
          {Array.from({ length: 16 }, (_, i) => (
            <rect key={i} x={18 + (i % 4) * 13} y={17 + Math.floor(i / 4) * 13}
              width="11" height="11" rx="1"
              fill={i % 4 < 2 && i < 8 ? "#fde7c4" : "#eeebfb"}
              stroke={i % 4 < 2 && i < 8 ? "#c9ae89" : "#bcb4e7"} />
          ))}
          <path d="M76 43H94M88 37L94 43L88 49" fill="none" stroke="#5b4fc7" />
          <rect x="102" y="29" width="25" height="25" rx="2" fill="#fffefb" stroke="#bcb4e7" />
          <text x="114" y="46" textAnchor="middle">Σ</text>
          <text x="44" y="80" textAnchor="middle">patch</text>
          <text x="114" y="80" textAnchor="middle">response</text>
        </g>
      ) : id === "lecture7-worked-guide" ? (
        <g>
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i}>
              <rect x={19 + i * 14} y="22" width="12" height="24" rx="2"
                fill={i === 0 ? "#fde7c4" : i < 4 ? "#eeebfb" : "#fffefb"}
                stroke={i === 0 ? "#c9ae89" : "#bcb4e7"} />
              <text x={25 + i * 14} y="38" textAnchor="middle">{i % 3 === 0 ? "1" : "0"}</text>
            </g>
          ))}
          <path d="M20 56H32M34 56H74M76 56H130" stroke="#bcb4e7" />
          <text x="75" y="76" textAnchor="middle">range · precision</text>
        </g>
      ) : id === "midterm-review-worked-guide" ? (
        <g strokeLinecap="round" strokeLinejoin="round">
          <rect x="35" y="9" width="80" height="72" rx="3" fill="#fffefb" stroke="#bcb4e7" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <path d={`M47 ${28 + i * 18}l3 3 6-7`} fill="none" stroke="#5b4fc7" strokeWidth="1.5" />
              <path d={`M64 ${27 + i * 18}h35M64 ${32 + i * 18}h24`} stroke="#ded9ce" />
            </g>
          ))}
          <path d="M112 15l2 5 6 .5-4.5 4 1.5 6-5-3-5 3 1.5-6-4.5-4 6-.5Z" fill="#fde7c4" stroke="#c9ae89" />
        </g>
      ) : id === "pruning-loss-and-reconstruction" ? (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12V72H134" fill="none" stroke="#ded9ce" />
          <path
            d="M32 20C44 78 102 78 126 20"
            fill="none"
            stroke="#8578d0"
            strokeWidth="2.5"
          />
          <path
            d="M79 63H106V49"
            fill="none"
            stroke="#c9ae89"
            strokeDasharray="3 3"
          />
          <path d="M79 70V75M106 70V75" stroke="#bcb4e7" />
          <circle cx="79" cy="63" r="4" fill="#5b4fc7" />
          <circle cx="106" cy="49" r="4" fill="#fde7c4" stroke="#c9ae89" />
          <path
            d="M118 51V61M115 54L118 51L121 54M115 58L118 61L121 58"
            fill="none"
            stroke="#c9ae89"
          />
          <text x="12" y="14">
            L
          </text>
          <text x="79" y="85" textAnchor="middle">
            w
          </text>
          <text x="106" y="85" textAnchor="middle">
            0
          </text>
          <text x="125" y="60">
            ΔL
          </text>
        </g>
      ) : id === "pruning-budgets-and-efficiency" ? (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M34 62A41 41 0 0 1 116 62"
            fill="none"
            stroke="#eeebfb"
            strokeWidth="10"
          />
          <path
            d="M34 62A41 41 0 0 1 87 23"
            fill="none"
            stroke="#8578d0"
            strokeWidth="10"
          />
          <path
            d="M32 62H38M44 32L48 36M75 18V25M102 32L107 27M112 62H118"
            stroke="#bcb4e7"
          />
          <path d="M99 28L106 19" stroke="#c9ae89" strokeWidth="3" />
          <circle cx="107" cy="18" r="3" fill="#fde7c4" stroke="#c9ae89" />
          <path d="M75 62L55 40" stroke="#5b4fc7" strokeWidth="2.5" />
          <circle
            cx="75"
            cy="62"
            r="5"
            fill="#fffefb"
            stroke="#5b4fc7"
            strokeWidth="1.5"
          />
          <path d="M59 70H91" stroke="#ded9ce" />
          <text x="34" y="83" textAnchor="middle">
            cost
          </text>
          <text x="112" y="83" textAnchor="middle">
            budget
          </text>
        </g>
      ) : (
        <>
          {Array.from({ length: 32 }, (_, i) => (
            <rect
              key={i}
              x={26 + (i % 8) * 13}
              y={18 + Math.floor(i / 8) * 13}
              width="9"
              height="9"
              rx="1"
              fill={i % 3 === 0 ? "#eeebfb" : "#8578d0"}
              stroke={i % 3 === 0 ? "#c4bddc" : "none"}
              strokeDasharray={i % 3 === 0 ? "2 2" : undefined}
            />
          ))}
        </>
      )}
    </svg>
  );
}
function ShareDialog({ url, onClose }) {
  const ref = useRef(null);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    const old = document.activeElement;
    ref.current.showModal();
    return () => old?.focus();
  }, []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setMsg("Link copied.");
    } catch {
      ref.current.querySelector("input").select();
      setMsg("Press Command+C or Ctrl+C to copy the selected link.");
    }
  }
  return (
    <dialog
      ref={ref}
      className="share-dialog"
      aria-labelledby="share-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="dialog-close icon-button"
        aria-label="Close share dialog"
        onClick={onClose}
      >
        <Icon type={X} />
      </button>
      <h2 id="share-title">Send this idea.</h2>
      <p>Copy the link below to share this note.</p>
      <input
        autoFocus
        aria-label="Link to this note"
        readOnly
        value={url}
        onFocus={(e) => e.target.select()}
      />
      <p role="status">{msg}</p>
      <div className="share-dialog-actions">
        <button className="text-button" onClick={copy}>
          Copy link
        </button>
        <button className="text-button secondary" onClick={onClose}>
          Done
        </button>
      </div>
    </dialog>
  );
}
const practiceUrl = (view = "exam") => `${base}practice/lecture6.html#${view}`;
function PracticeInvitation({ afterReading = false }) {
  return (
    <section
      className={`practice-invitation${afterReading ? " after-reading" : ""}`}
      aria-label="Lecture 6 practice"
    >
      <div className="practice-copy">
        <span className="section-kicker">Lecture 6 · Pruning practice</span>
        <h2>
          {afterReading
            ? "You’ve explored the ideas. Now try them."
            : "See what stays with you."}
        </h2>
        <p>
          A fresh paper, drawn from 72 questions.{" "}
          <TextHighlighter>Start with a mock exam</TextHighlighter> to put the
          concepts and calculations together, then use the worked answers to
          find your next step.
        </p>
        <div className="practice-actions">
          <a className="text-button practice-primary" href={practiceUrl()}>
            <LetterSwap label="Start a mock exam" />
            <Icon type={ArrowUpRight} />
          </a>
          <a className="practice-secondary" href={practiceUrl("bank")}>
            Prefer one concept at a time?{" "}
            <span>
              Browse all 72 questions <Icon type={ArrowRight} />
            </span>
          </a>
        </div>
      </div>
      <div className="practice-format">
        <span className="section-kicker">Your paper, at a glance</span>
        <div>
          <strong>5</strong>
          <span>Multiple choice or true / false</span>
        </div>
        <div>
          <strong>7–10</strong>
          <span>Calculations and explanations</span>
        </div>
        <p>
          Answers after submission. No timer. Written answers are self-reviewed.
          Lecture 6 practice, not an exam prediction.
        </p>
      </div>
    </section>
  );
}
function App() {
  const [route, setRoute] = useState(readRoute);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [saved, setSaved] = useState(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem("margin-saved") || "[]");
      return Array.isArray(parsed)
        ? parsed.filter((x) => typeof x === "string")
        : [];
    } catch {
      return [];
    }
  });
  const [toast, setToast] = useState("");
  const [fallback, setFallback] = useState("");
  const [recent, setRecent] = useState(() => {
    try {
      return localStorage.getItem("margin-recent");
    } catch {
      return null;
    }
  });
  const searchRef = useRef();
  useEffect(() => {
    const f = () => {
      if (location.hash.startsWith("#/")) {
        setRoute(readRoute());
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener("hashchange", f);
    return () => window.removeEventListener("hashchange", f);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(t);
  }, [toast]);
  const note = artifacts.find((a) => a.id === route?.id);
  useEffect(() => {
    document.title = note
      ? `${note.title} — Margin`
      : "Margin — A reading room for curious minds";
    if (note) {
      setRecent(note.id);
      try {
        localStorage.setItem("margin-recent", note.id);
      } catch {}
    }
  }, [note]);
  function save(id) {
    setSaved((s) => {
      const next = s.includes(id) ? s.filter((x) => x !== id) : [...s, id];
      try {
        localStorage.setItem("margin-saved", JSON.stringify(next));
      } catch {
        setToast("Saved for this visit. Browser storage is unavailable.");
      }
      return next;
    });
  }
  async function share(id) {
    const url = new URL(
      route?.id === id ? location.hash : routeFor(id),
      location.href,
    ).href;
    try {
      await navigator.clipboard.writeText(url);
      setToast("Link copied. Send a little curiosity.");
    } catch {
      setFallback(url);
    }
  }
  const filtered = artifacts.filter(
    (a) =>
      (filter !== "With labs" || a.kind === "Interactive") &&
      (filter !== "Saved" || saved.includes(a.id)) &&
      (!query ||
        `${a.title} ${a.description} ${a.searchText}`
          .toLowerCase()
          .includes(query.toLowerCase())),
  );
  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
          document.getElementById("main")?.scrollIntoView();
        }}
      >
        Skip to content
      </a>
      <header className="site-header">
        <a className="wordmark" href="#/" aria-label="Margin library">
          margin<span className="wordmark-dot">.</span>
        </a>
        <span className="header-note">A personal collection, shared.</span>
        <a className="header-practice" href={practiceUrl()}>
          <LetterSwap label="Practice" />
        </a>
        <a className="header-library" href="#/">
          <LetterSwap label="The library" /> <Icon type={BookOpen} />
        </a>
      </header>
      {note ? (
        <Reader
          note={note}
          route={route}
          saved={saved.includes(note.id)}
          onSave={() => save(note.id)}
          onShare={() => share(note.id)}
        />
      ) : route ? (
        <main tabIndex={-1} id="main" className="not-found">
          <h1>This page isn't in the collection.</h1>
          <a href="#/">Return to the library</a>
        </main>
      ) : (
        <main tabIndex={-1} id="main">
          <section className="hero">
            <div className="hero-copy">
              <div className="collection-label">
                <span className="edition-line" />
                Notes on Efficient AI
              </div>
              <h1>
                A small room
                <br />
                <TextHighlighter>for big ideas.</TextHighlighter>
              </h1>
              <p>
                Some things are worth understanding slowly.
                <br className="desktop-br" /> Essays, diagrams, and little
                experiments
                <br className="desktop-br" /> on making intelligent things more
                efficient. Then put your understanding to work with a Lecture 6
                mock exam.
              </p>
              <div className="hero-actions">
                <a
                  href={practiceUrl()}
                  className="text-button practice-primary"
                >
                  <LetterSwap label="Start a mock exam" />
                  <Icon type={ArrowUpRight} />
                </a>
                <a href="#collection" className="hero-link">
                  Explore the collection{" "}
                  <span>
                    <Icon type={ArrowRight} />
                  </span>
                </a>
              </div>
              <div className="hero-meta">
                <span>
                  {String(artifacts.length).padStart(2, "0")} artifacts
                </span>
                <span>Lectures 02–07 · Midterm review</span>
                <span>Made for the curious</span>
              </div>
            </div>
            <NeuralPlate />
          </section>
          <div className="practice-home">
            <PracticeInvitation />
          </div>
          <section id="collection" className="collection">
            <div className="collection-heading">
              <div>
                <span className="section-kicker">The reading shelf</span>
                <h2>Ideas to spend time with.</h2>
              </div>
              <span className="collection-count">
                {filtered.length.toString().padStart(2, "0")} /{" "}
                {String(artifacts.length).padStart(2, "0")}
              </span>
            </div>
            <div className="tools">
              <div className="tabs" aria-label="Filter the collection">
                {["All", "With labs", "Saved"].map((f) => (
                  <button
                    key={f}
                    aria-pressed={filter === f}
                    className={filter === f ? "active" : ""}
                    onClick={() => setFilter(f)}
                  >
                    {f}
                    {f === "Saved" && saved.length > 0 ? (
                      <span className="saved-count">{saved.length}</span>
                    ) : null}
                  </button>
                ))}
              </div>
              <div className="search">
                <Icon type={Search} />
                <label className="sr-only" htmlFor="search">
                  Search the collection
                </label>
                <input
                  ref={searchRef}
                  id="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find a concept…"
                  type="search"
                />
                {query && (
                  <button
                    aria-label="Clear search"
                    onClick={() => {
                      setQuery("");
                      searchRef.current.focus();
                    }}
                  >
                    <Icon type={X} />
                  </button>
                )}
              </div>
            </div>
            <div aria-live="polite" className="sr-only">
              {filtered.length} artifacts found
            </div>
            <div className="artifact-list">
              {filtered.map((a) => (
                <article className="artifact" key={a.id}>
                  <span className="artifact-number">
                    {String(a.order).padStart(2, "0")}
                  </span>
                  <div className="artifact-content">
                    <div className="artifact-meta">
                      <span>{a.lecture}</span>
                      <span
                        className={
                          a.kind === "Interactive" ? "lab-tag" : "kind-tag"
                        }
                      >
                        {a.kind === "Interactive"
                          ? "With interactive labs"
                          : a.kind}
                      </span>
                      {recent === a.id && (
                        <span className="visited">Last opened</span>
                      )}
                    </div>
                    <h3>
                      <a href={routeFor(a.id)}>
                        {a.title}
                        <Icon type={ArrowUpRight} />
                      </a>
                    </h3>
                    <p>{a.description}</p>
                    <span className="reading-time">≈ {a.minutes} min read</span>
                  </div>
                  <ArtifactArt id={a.id} />
                  <div className="artifact-actions">
                    <button
                      className={
                        saved.includes(a.id)
                          ? "icon-button is-saved"
                          : "icon-button"
                      }
                      aria-label={`${saved.includes(a.id) ? "Unsave" : "Save"} ${a.title}`}
                      aria-pressed={saved.includes(a.id)}
                      onClick={() => save(a.id)}
                    >
                      <Icon
                        type={Bookmark}
                        fill={saved.includes(a.id) ? "currentColor" : "none"}
                      />
                    </button>
                    <button
                      className="icon-button"
                      aria-label={`Copy link to ${a.title}`}
                      onClick={() => share(a.id)}
                    >
                      <Icon type={Link} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            {!filtered.length && (
              <div className="empty-state">
                <BookOpen size={28} strokeWidth={1} />
                <h3>
                  {filter === "Saved" && !query
                    ? "Keep something for later."
                    : "No notes found."}
                </h3>
                <p>
                  {filter === "Saved" && !query
                    ? "Use the bookmark beside a note to add it to your shelf."
                    : `Try a different concept, or return to the full collection.`}
                </p>
                <button
                  onClick={() => {
                    setQuery("");
                    setFilter("All");
                  }}
                >
                  Show all notes <Icon type={ArrowRight} />
                </button>
              </div>
            )}
            <div className="reading-path">
              <span className="path-label">A good place to start</span>
              <p>
                Begin with the big picture. Meet the building blocks.
                <br />
                Learn to count the cost. Then decide what to cut.
              </p>
              <a href={routeFor(artifacts[0].id)}>
                Start with note 01 <Icon type={ArrowUpRight} />
              </a>
            </div>
          </section>
        </main>
      )}
      <footer className="site-footer">
        <a href="#/" className="footer-mark">
          margin.
        </a>
        <p>Collected with care. Best read with curiosity.</p>
        <span>Efficient AI · A shared reading room</span>
      </footer>
      {toast && (
        <div className="toast" role="status">
          <Icon type={Check} />
          {toast}
        </div>
      )}
      {fallback && (
        <ShareDialog url={fallback} onClose={() => setFallback("")} />
      )}
    </>
  );
}
function Reader({ note, route, saved, onSave, onShare }) {
  const iframe = useRef();
  const [html, setHtml] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [toc, setToc] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    setLoaded(false);
    setHtml("");
    let cancelled = false;
    fetch(`${base}artifacts/${note.file}`)
      .then((r) => {
        if (!r.ok) throw Error("Unable to open note");
        return r.text();
      })
      .then((text) => {
        if (cancelled) return;
        const css = `.margin-bar{display:none!important}body{background:#f7f5f0!important}.sheet{background:#f7f5f0!important;padding-top:2rem!important;max-width:100%!important}a:focus-visible,button:focus-visible,input:focus-visible,summary:focus-visible{outline:2px solid #5b4fc7;outline-offset:3px}.margin-table{overflow-x:auto;max-width:100%;margin:1.5rem 0}.margin-table table{margin:0}p{text-align:left!important}@media(max-width:560px){.sheet{padding-left:12px!important;padding-right:12px!important}.mx span{width:clamp(1.45rem,7vw,2.6rem)!important;height:1.7rem!important;font-size:.6rem}.mx.sm span{width:clamp(1.35rem,5.6vw,2.1rem)!important}#g-mx span{font-size:.56rem!important}#c-vis{gap:2px!important}#c-vis span{width:clamp(.6rem,2.7vw,1.2rem)!important;height:clamp(.6rem,2.7vw,1.2rem)!important}.lab{padding:.7rem!important}.eq{overflow-x:auto;font-size:.9rem!important}.flow{margin-left:0!important;margin-right:0!important}.btns button,summary{min-height:36px}}@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}`;
        setHtml(
          text
            .replace("<head>", "<head>")
            .replace(
              "</head>",
              `<base href="${new URL(base + "artifacts/", location.origin).href}"><style>${css}</style></head>`,
            ),
        );
      })
      .catch(() => {
        if (!cancelled)
          setHtml(
            "<p>This note could not load. Please refresh to try again.</p>",
          );
      });
    return () => {
      cancelled = true;
    };
  }, [note.id]);
  useEffect(() => {
    if (!loaded || !route.section) return;
    setTimeout(() => jump(route.section), 150);
  }, [loaded, route.section]);
  function jump(id) {
    const element = iframe.current?.contentDocument?.getElementById(id);
    if (element) {
      const top =
        element.getBoundingClientRect().top +
        window.scrollY +
        iframe.current.getBoundingClientRect().top;
      window.scrollTo({
        top: top - 108,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    }
    setToc(false);
  }
  function frameLoad() {
    const f = iframe.current,
      d = f.contentDocument;
    if (!d) return;
    d.querySelectorAll("h2").forEach((h, i) => {
      if (!h.id) h.id = `margin-section-${i + 1}`;
    });
    d.querySelectorAll("table").forEach((t) => {
      if (t.parentNode.classList.contains("margin-table")) return;
      const wrap = d.createElement("div");
      wrap.className = "margin-table";
      t.parentNode.insertBefore(wrap, t);
      wrap.appendChild(t);
    });
    const resize = () => {
      const sheet = d.querySelector(".sheet");
      f.style.height = `${Math.ceil(sheet ? sheet.getBoundingClientRect().bottom : d.body.scrollHeight)}px`;
    };
    resize();
    new ResizeObserver(resize).observe(d.body);
    d.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        jump(href.slice(1));
        return;
      }
      const target = artifacts.find((x) => href?.split("#")[0] === x.file);
      if (target) {
        e.preventDefault();
        location.hash = routeFor(target.id, href.split("#")[1]);
      } else if (a.href.startsWith("http")) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
    });
    setLoaded(true);
  }
  const index = artifacts.findIndex((a) => a.id === note.id);
  return (
    <main tabIndex={-1} id="main" className="reader">
      <div className="reader-toolbar">
        <a href="#/" className="back-link">
          <Icon type={ArrowLeft} /> Library
        </a>
        <a className="reader-practice" href={practiceUrl()}>
          Try a mock exam <Icon type={ArrowUpRight} />
        </a>
        <span className="reader-current">
          {String(note.order).padStart(2, "0")} / {note.kicker}
        </span>
        <div className="reader-actions">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-expanded={sidebarOpen}
            aria-controls="reader-sidebar"
          >
            <Icon type={sidebarOpen ? PanelLeftClose : PanelLeftOpen} />
            {sidebarOpen ? "Hide sidebar" : "Show sidebar"}
          </button>
          <button
            aria-label={toc ? "Hide contents" : "Show contents"}
            className="contents-toggle"
            onClick={() => setToc(!toc)}
            aria-expanded={toc}
            aria-controls="reader-sidebar"
          >
            <Icon type={Menu} />
            Contents
          </button>
          <button
            className={saved ? "icon-button is-saved" : "icon-button"}
            aria-pressed={saved}
            aria-label={saved ? "Unsave this note" : "Save this note"}
            onClick={onSave}
          >
            <Icon type={Bookmark} fill={saved ? "currentColor" : "none"} />
          </button>
          <button
            className="share-button"
            aria-label="Share note"
            onClick={onShare}
          >
            <Icon type={Link} />
            <span>Share note</span>
          </button>
        </div>
      </div>
      <div
        className={
          sidebarOpen ? "reader-layout" : "reader-layout sidebar-collapsed"
        }
      >
        <aside
          id="reader-sidebar"
          className={toc ? "reader-toc open" : "reader-toc"}
        >
          <div className="toc-heading">
            <span className="section-kicker">In this note</span>
            <button
              className="sidebar-close icon-button"
              aria-label="Close sidebar"
              onClick={() => {
                setSidebarOpen(false);
                setToc(false);
                document.querySelector(".sidebar-toggle")?.focus();
              }}
            >
              <Icon type={X} />
            </button>
          </div>
          <nav aria-label="Note contents">
            {note.sections.map((s) => (
              <a
                key={s.id}
                href={routeFor(note.id, s.id)}
                onClick={(e) => {
                  e.preventDefault();
                  jump(s.id);
                  history.replaceState(null, "", routeFor(note.id, s.id));
                }}
              >
                {s.title.replace(/^\d+\s*·\s*/, "")}
              </a>
            ))}
          </nav>
          <a href={`${base}artifacts/${note.file}`} className="original-link">
            Open standalone page <Icon type={ArrowUpRight} />
          </a>
        </aside>
        <div className="reader-paper">
          {!loaded && <p className="loading-note">Opening your note…</p>}
          {html && (
            <iframe
              ref={iframe}
              title={note.originalTitle}
              srcDoc={html}
              onLoad={frameLoad}
              scrolling="no"
              className="article-frame"
            />
          )}
          <PracticeInvitation afterReading />
          <div className="reader-next">
            {index > 0 ? (
              <a href={routeFor(artifacts[index - 1].id)}>
                <span>
                  <Icon type={ArrowLeft} />
                  Previous note
                </span>
                <strong>{artifacts[index - 1].title}</strong>
              </a>
            ) : (
              <a href="#/">
                <span>
                  <Icon type={BookOpen} />
                  The collection
                </span>
                <strong>Back to the reading shelf</strong>
              </a>
            )}
            {index < artifacts.length - 1 && (
              <a href={routeFor(artifacts[index + 1].id)}>
                <span>
                  Up next <Icon type={ArrowRight} />
                </span>
                <strong>{artifacts[index + 1].title}</strong>
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
createRoot(document.getElementById("root")).render(<App />);
