import { Link } from "react-router-dom";

const steps = [
  { n: "01", t: "Enter your details", d: "Eleven simple clinical values — age, blood pressure, cholesterol, ECG findings and more." },
  { n: "02", t: "The model analyses", d: "A K-Nearest Neighbours model trained on 918 patient records compares you with similar cases." },
  { n: "03", t: "Get a risk estimate", d: "See whether your profile resembles patients with heart disease, with a probability score." },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">Machine-learning heart screening</p>
            <h1>Know your heart's story <em>before</em> it speaks up.</h1>
            <p className="lead">
              PulseCheck estimates the likelihood of heart disease from eleven routine clinical
              measurements — in under a minute.
            </p>
            <div className="hero-actions">
              <Link to="/predict" className="btn btn-primary">Start assessment →</Link>
              <a href="#how" className="btn btn-ghost">How it works</a>
            </div>
            <dl className="stats">
              <div><dt>88.6%</dt><dd>test accuracy</dd></div>
              <div><dt>918</dt><dd>training patients</dd></div>
              <div><dt>11</dt><dd>input features</dd></div>
            </dl>
          </div>
          <div className="ecg-card" aria-hidden="true">
            <svg viewBox="0 0 400 160" className="ecg">
              <path className="ecg-line" pathLength="100" d="M0 90 H70 l10 -8 10 8 H120 l8 14 10 -78 12 100 10 -36 H200 l10 -10 14 10 H290 l8 14 10 -78 12 100 10 -36 H400" />
            </svg>
            <div className="ecg-meta"><span className="dot" /> live rhythm · demo</div>
          </div>
        </div>
      </section>

      <section id="how" className="section">
        <div className="wrap">
          <h2>How it works</h2>
          <div className="steps">
            {steps.map((s) => (
              <article key={s.n} className="step">
                <span className="step-n">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap notice">
          <h2>Please note</h2>
          <p>
            This tool is a student machine-learning project built on a public dataset. It is not a
            diagnosis and must never replace professional medical advice. If you have chest pain,
            shortness of breath or other symptoms, seek medical care immediately.
          </p>
          <Link to="/predict" className="btn btn-primary">Try the assessment</Link>
        </div>
      </section>
    </>
  );
}
