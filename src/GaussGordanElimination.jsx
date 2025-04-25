import React, { useState } from "react";
export default function GaussGordanElimination() {
    const [matrix, setMatrix] = useState([
        [2, 1, -1, 8],
        [-3, -1, 2, -11],
        [-2, 1, 2, -3],
      ]);
      const [result, setResult] = useState(null);
    
      const updateMatrix = (e, i, j) => {
        const newMatrix = matrix.map(row => [...row]);
        newMatrix[i][j] = parseFloat(e.target.value);
        setMatrix(newMatrix);
      };
    
      const gaussJordan = () => {
        const n = matrix.length;
        const m = matrix[0].length;
        const A = matrix.map(row => [...row]);
    
        for (let i = 0; i < n; i++) {
          // Make the diagonal contain all 1s
          let divisor = A[i][i];
          if (divisor === 0) {
            // Partial Pivoting
            let swap = i + 1;
            while (swap < n && A[swap][i] === 0) swap++;
            if (swap === n) {
              alert("Cannot solve: singular matrix");
              return;
            }
            [A[i], A[swap]] = [A[swap], A[i]];
            divisor = A[i][i];
          }
          for (let j = 0; j < m; j++) {
            A[i][j] /= divisor;
          }
    
          // Make all other entries in column i zero
          for (let k = 0; k < n; k++) {
            if (k !== i) {
              const factor = A[k][i];
              for (let j = 0; j < m; j++) {
                A[k][j] -= factor * A[i][j];
              }
            }
          }
        }
        setResult(A);
      };
  return (
    <div className="text-center">
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
    <h2>Gauss-Jordan Elimination</h2>
    {matrix.map((row, i) => (
      <div key={i}>
        <div className="d-flex">
        {row.map((val, j) => (
          <input
            key={j}
            type="text"
                     className="w-100 px-1 py-2"
            // value={val}
            placeholder={`input coefficient x${j}`}


            onChange={(e) => updateMatrix(e, i, j)}
            style={{ width: 50, margin: 2 }}
          />
        ))}
         </div>
      </div>
    ))}
    <button onClick={gaussJordan} style={{ marginTop: 10 }} className='btn btn-info mt-4 w-100'>Compute Gauss-Jordan</button>
    {result && (
      <div style={{ marginTop: 20 }}>
        <h4>Result:</h4>
        {result.map((r, i) => <div key={i}>{r.map(v => v.toFixed(2)).join(" ")}</div>)}
      </div>
    )}
  </div>

<div>
  {result?
  <>
    <h1>x1 is {result[0][3]}</h1>
  <h1>x2 is {result[1][3]}</h1>
  <h1>x3 is {result[2][3]}</h1>
  </>
  : ""
}



</div>
  </div>
  )
}
