import { useState } from "react";
import { predictHeartDisease } from "../services/api";

const FIELDS = [
  {
    name: "Age",
    label: "Age",
    type: "number",
    unit: "years",
    min: 1,
    max: 120,
    step: 1,
  },
  {
    name: "Sex",
    label: "Sex",
    type: "select",
    options: [
      ["M", "Male"],
      ["F", "Female"],
    ],
  },
  {
    name: "ChestPainType",
    label: "Chest pain type",
    type: "select",
    options: [
      ["ATA", "ATA — Atypical angina"],
      ["NAP", "NAP — Non-anginal pain"],
      ["TA", "TA — Typical angina"],
      ["ASY", "ASY — Asymptomatic"],
    ],
  },
  {
    name: "RestingBP",
    label: "Resting blood pressure",
    type: "number",
    unit: "mm Hg",
    min: 50,
    max: 250,
    step: 1,
  },
  {
    name: "Cholesterol",
    label: "Serum cholesterol",
    type: "number",
    unit: "mg/dl",
    min: 50,
    max: 700,
    step: 1,
  },
  {
    name: "FastingBS",
    label: "Fasting blood sugar",
    type: "select",
    options: [
      ["0", "≤ 120 mg/dl (0)"],
      ["1", "> 120 mg/dl (1)"],
    ],
  },
  {
    name: "RestingECG",
    label: "Resting ECG",
    type: "select",
    options: [
      ["Normal", "Normal"],
      ["ST", "ST — ST-T wave abnormality"],
      ["LVH", "LVH — Left ventricular hypertrophy"],
    ],
  },
  {
    name: "MaxHR",
    label: "Maximum heart rate",
    type: "number",
    unit: "bpm",
    min: 40,
    max: 250,
    step: 1,
  },
  {
    name: "ExerciseAngina",
    label: "Exercise-induced angina",
    type: "select",
    options: [
      ["N", "No"],
      ["Y", "Yes"],
    ],
  },
  {
    name: "Oldpeak",
    label: "Oldpeak (ST depression)",
    type: "number",
    unit: "",
    min: -3,
    max: 10,
    step: 0.1,
  },
  {
    name: "ST_Slope",
    label: "ST slope",
    type: "select",
    options: [
      ["Up", "Up"],
      ["Flat", "Flat"],
      ["Down", "Down"],
    ],
  },
];

const initial = Object.fromEntries(
  FIELDS.map((f) => [f.name, f.type === "select" ? "" : ""]),
);

export default function Predict() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const er = {};
    for (const f of FIELDS) {
      const v = form[f.name];
      if (v === "") {
        er[f.name] = "Required";
        continue;
      }
      if (f.type === "number") {
        const n = Number(v);
        if (Number.isNaN(n)) er[f.name] = "Enter a number";
        else if (n < f.min || n > f.max)
          er[f.name] = `Must be between ${f.min} and ${f.max}`;
      }
    }
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setResult(null);
    if (!validate()) return;

    const payload = {};
    for (const f of FIELDS) {
      payload[f.name] =
        f.type === "number" ? Number(form[f.name]) : form[f.name];
    }
    payload.FastingBS = Number(payload.FastingBS);

    setLoading(true);
    try {
      const predictionResult = await predictHeartDisease(payload);

      setResult(predictionResult);
      setTimeout(
        () =>
          document
            .getElementById("result")
            ?.scrollIntoView({ behavior: "smooth" }),
        50,
      );
    } catch (err) {
      setApiError(
        "Something went wrong while running the model. Please check your values.",
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setForm(initial);
    setErrors({});
    setResult(null);
    setApiError("");
  };

  const pct = result ? Math.round(result.probability * 100) : 0;
  const high = result?.prediction === 1;

  return (
    <section className="section">
      <div className="wrap predict">
        <div className="predict-head">
          <p className="eyebrow">Assessment</p>
          <h1 className="h1-sm">Tell us about your heart health</h1>
          <p className="lead">
            All fields are required. Values come from a routine check-up and
            ECG.
          </p>
        </div>

        <form className="card form" onSubmit={onSubmit} noValidate>
          <div className="grid">
            {FIELDS.map((f) => (
              <label
                key={f.name}
                className={`field ${errors[f.name] ? "has-error" : ""}`}
              >
                <span className="label">
                  {f.label}
                  {f.unit && <small> ({f.unit})</small>}
                </span>
                {f.type === "select" ? (
                  <select
                    name={f.name}
                    value={form[f.name]}
                    onChange={onChange}
                  >
                    <option value="" disabled>
                      Select…
                    </option>
                    {f.options.map(([v, l]) => (
                      <option key={v} value={v}>
                        {l}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    name={f.name}
                    value={form[f.name]}
                    onChange={onChange}
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    inputMode="decimal"
                  />
                )}
                {errors[f.name] && (
                  <span className="err">{errors[f.name]}</span>
                )}
              </label>
            ))}
          </div>

          {apiError && (
            <div className="alert" role="alert">
              {apiError}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={reset}
              disabled={loading}
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Analysing…" : "Predict risk"}
            </button>
          </div>
        </form>

        
{result && (
  <div
    id="result"
    className="mt-10 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-200/50"
  >
    {/* TOP ACCENT */}
    <div className={`h-1.5 ${high ? "bg-red-500" : "bg-emerald-500"}`} />

    <div className="p-6 md:p-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
            PulseCheck / Analysis
          </p>
          <h2 className="mt-2 text-xl font-bold text-gray-900">
            Prediction summary
          </h2>
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500">
          KNN · K = 5
        </span>
      </div>

      {/* MAIN RESULT */}
      <div
        className={`mt-8 rounded-2xl p-6 md:p-8 ${
          high
            ? "bg-red-50"
            : "bg-emerald-50"
        }`}
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* STATUS ICON */}
          <div
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${
              high ? "bg-red-100" : "bg-emerald-100"
            }`}
          >
            {high ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-8 w-8 text-red-600"
              >
                <path d="M12 8v5m0 4h.01" strokeLinecap="round" />
                <path d="M10.3 3.9 2.5 17.4A2 2 0 0 0 4.2 20h15.6a2 2 0 0 0 1.7-2.6L13.7 3.9a2 2 0 0 0-3.4 0Z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-8 w-8 text-emerald-600"
              >
                <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>

          <div className="flex-1">
            <p className={`text-sm font-semibold ${high ? "text-red-600" : "text-emerald-600"}`}>
              MODEL PREDICTION
            </p>

            <div className="mt-1 flex flex-wrap items-baseline gap-3">
              <h3 className={`text-4xl font-extrabold tracking-tight ${high ? "text-red-700" : "text-emerald-700"}`}>
                {high ? "YES" : "NO"}
              </h3>
              <span className={`text-sm font-medium ${high ? "text-red-700" : "text-emerald-700"}`}>
                {high ? "Class 1 · Heart disease" : "Class 0 · No heart disease"}
              </span>
            </div>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              {high
                ? "The model classified this input into the heart disease category."
                : "The model classified this input into the non-heart disease category."}
            </p>
          </div>
        </div>
      </div>

      {/* MODEL VOTING */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">
              Class 1 voting share
            </p>
            <span className="text-2xl font-bold text-gray-900">
              {pct}%
            </span>
          </div>

          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                high ? "bg-red-500" : "bg-emerald-500"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>

          <p className="mt-3 text-xs leading-5 text-gray-500">
            Share of the 5 nearest neighbours voting for class 1.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 p-5">
          <p className="text-sm font-semibold text-gray-700">
            Nearest neighbour votes
          </p>

          <div className="mt-4 flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((vote) => (
              <div
                key={vote}
                className={`h-3 flex-1 rounded-full ${
                  vote <= Math.round(pct / 20)
                    ? "bg-red-500"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <p className="mt-3 text-xs leading-5 text-gray-500">
            {Math.round(pct / 20)} out of 5 neighbours voted for class 1.
          </p>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="mt-8 flex gap-3 rounded-xl bg-gray-50 p-4">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="mt-0.5 h-5 w-5 shrink-0 text-gray-400"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5m0-8h.01" strokeLinecap="round" />
        </svg>

        <p className="text-xs leading-6 text-gray-500">
          <span className="font-bold text-gray-700">Important:</span>{" "}
          This is an educational machine-learning prediction, not a medical
          diagnosis or a clinically validated estimate of personal risk.
          Please consult a qualified healthcare professional for medical advice.
        </p>
      </div>
    </div>
  </div>
)}

      </div>
    </section>
  );
}
