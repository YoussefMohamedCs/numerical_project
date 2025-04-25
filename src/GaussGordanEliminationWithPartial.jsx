import React, { useState } from "react";
export default function GaussGordanEliminationWithPartial() {
    const [matrix, setMatrix] = useState([
        [2, 1, -1, 8],
        [-3, -1, 2, -11],
        [-2, 1, 2, -3],
      ]);
    
      const [solution, setSolution] = useState(null);
    
      const updateMatrix = (e, i, j) => {
        const newMatrix = matrix.map((row) => [...row]);
        newMatrix[i][j] = parseFloat(e.target.value);
        setMatrix(newMatrix);
      };
    
      const gaussJordan = () => {
        const n = 3;
        const A = matrix.map((row) => [...row]);
    
        for (let i = 0; i < n; i++) {
          // Partial Pivoting
          let maxRow = i;
          for (let k = i + 1; k < n; k++) {
            if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) maxRow = k;
          }
          [A[i], A[maxRow]] = [A[maxRow], A[i]];
          // Make diagonal 1
          const pivot = A[i][i];
          for (let j = 0; j <= n; j++) {
            A[i][j] = A[i][j] / pivot;
          }
    
          // Make other rows 0
          for (let k = 0; k < n; k++) {
            if (k !== i) {
              const factor = A[k][i];
              for (let j = 0; j <= n; j++) {
                A[k][j] -= factor * A[i][j];
              }
            }
          }
        }
    
        const x = A.map((row) => row[n]);
        setSolution(x);
      };
  return (
    <div className="text-center">
    <div className="container" style={{ padding: 20, fontFamily: "sans-serif" }}>
    <h2 className="mb-4">Gauss-Jordan Elimination with Partial Pivoting</h2>
    {matrix.map((row, i) => (
      <div key={i} className="d-flex mb-2">
        {row.map((val, j) => (
          <input
            key={j}
            type="text"
            // value={val}
                    className="w-100 px-1 py-2"
            onChange={(e) => updateMatrix(e, i, j)}
            style={{ width: 60, marginRight: 8 }}
            placeholder={`x${j + 1}`}
          />
        ))}
      </div>
    ))}
    <button onClick={gaussJordan}className='btn btn-info mt-4 w-100'>
      Solve
    </button>

    {solution && (
      <div className="mt-4">
        <h4>Solution:</h4>
        {solution.map((val, i) => (
          <div key={i}>x{i + 1} = {val.toFixed(4)}</div>
        ))}
      </div>
    )}
  </div>
  </div>
  )
}
