import React, { useState } from "react";
import { cloneDeep } from "lodash";

export default function LuWithPartial() {

  const [matrix, setMatrix] = useState([
    [2, 1, -1, 1],
    [5, 2, 2, -4],
    [3, 1, 1, 5],
  ]);
  const [result, setResult] = useState(null);

  const updateMatrix = (e, i, j) => {
    const newMatrix = matrix.map((row) => [...row]);
    newMatrix[i][j] = parseFloat(e.target.value);
    setMatrix(newMatrix);
  };

  const computeLU = () => {
    const n = 3;
    const A = matrix.map((row) => [...row]);
    const L = Array.from({ length: n }, () => Array(n).fill(0));
    const U = Array.from({ length: n }, () => Array(n).fill(0));
    const P = [...Array(n).keys()];

    // Partial pivoting
    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) maxRow = k;
      }
      [A[i], A[maxRow]] = [A[maxRow], A[i]];
      [P[i], P[maxRow]] = [P[maxRow], P[i]];
    }

    // LU decomposition
    for (let i = 0; i < n; i++) {
      for (let j = i; j < n; j++) {
        let sum = 0;
        for (let k = 0; k < i; k++) sum += L[i][k] * U[k][j];
        U[i][j] = A[i][j] - sum;
      }

      for (let j = i; j < n; j++) {
        if (i === j) L[j][i] = 1;
        else {
          let sum = 0;
          for (let k = 0; k < i; k++) sum += L[j][k] * U[k][i];
          L[j][i] = (A[j][i] - sum) / U[i][i];
        }
      }
    }

    // Solve Ly = b using forward substitution
    const b = A.map((row) => row[3]);
    const y = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < i; j++) sum += L[i][j] * y[j];
      y[i] = b[i] - sum;
    }

    // Solve Ux = y using backward substitution
    const x = Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      let sum = 0;
      for (let j = i + 1; j < n; j++) sum += U[i][j] * x[j];
      x[i] = (y[i] - sum) / U[i][i];
    }

    setResult({ L, U, P, x });
  };

  return (
    <div className="text-center">
      <div style={{ fontFamily: "sans-serif", padding: 20 }}>
        <h2 className="mb-5">LU Decomposition with Partial</h2>
        {matrix.map((row, i) => (
          <div key={i}>
            <div className="d-flex">
              {row.map((val, j) => (
                <input
                  placeholder={`input coefficient x${j}`}
                  key={j}
                  type="text"
                  className="w-100 px-1 py-2"
                  onChange={(e) => updateMatrix(e, i, j)}
                  style={{ width: 50, margin: 2 }}
                  // value={val}
                />
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={computeLU}
          style={{ marginTop: 10 }}
          className="btn btn-info mt-4 w-100"
        >
          Compute LU
        </button>
        {result && (
          <div style={{ marginTop: 20 }}>
            <h4>L:</h4>
            {result.L.map((r, i) => (
              <div key={i}>{r.map((v) => v.toFixed(2)).join(" ")}</div>
            ))}
            <h4>U:</h4>
            {result.U.map((r, i) => (
              <div key={i}>{r.map((v) => v.toFixed(2)).join(" ")}</div>
            ))}

            <h4 className="mt-3">Solution:</h4>
            <div>
              {result.x.map((v, i) => (
                <div key={i}>
                  x{i + 1} = {v.toFixed(4)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}