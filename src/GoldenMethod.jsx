import React, { useState } from "react";
import { evaluate } from "mathjs";
export default function GoldenMethod() {
    const [equation, setEquation] = useState("(x - 2)^2");
  const [a, setA] = useState(0);
  const [b, setB] = useState(5);
  const [result, setResult] = useState(null);

  const goldenSection = (a, b, f, maxIterations = 100) => {
    const gr = (Math.sqrt(5) + 1) / 2;
    let c = b - (b - a) / gr;
    let d = a + (b - a) / gr;

    for (let i = 0; i < maxIterations; i++) {
      if (f(c) < f(d)) {
        b = d;
      } else {
        a = c;
      }
      c = b - (b - a) / gr;
      d = a + (b - a) / gr;
    }
    return (b + a) / 2;
  };

  const handleCompute = () => {
    try {
      const f = (x) => evaluate(equation, { x });
      const min = goldenSection(parseFloat(a), parseFloat(b), f);
      setResult(min);
    } catch (error) {
      alert("Error in evaluating function. Please check your equation.");
    }
  };

  return (
    <div className="container mt-4">
    <h2 className="mb-3">Golden Section Method</h2>

    <div className="mb-2">
      <label className="form-label">Equation (in x):</label>
      <input type="text" value={equation} onChange={(e) => setEquation(e.target.value)} className="form-control" />
    </div>

    <div className="mb-2">
      <label className="form-label">Interval a:</label>
      <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="form-control" />
    </div>

    <div className="mb-2">
      <label className="form-label">Interval b:</label>
      <input type="number" value={b} onChange={(e) => setB(e.target.value)} className="form-control" />
    </div>

    <button onClick={handleCompute} className="btn btn-info mt-4 w-100">Compute Minimum</button>

    {result !== null && (
      <div className="alert alert-success mt-4">
        <strong>Minimum x ≈ {result.toFixed(4)}</strong>
      </div>
    )}
  </div>
  )
}
