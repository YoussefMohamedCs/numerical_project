import React, { useState } from "react";

export default function Cramer() {
    const [matrix, setMatrix] = useState([
        [2, -1, 3, 9],
        [1, 1, 1, 6],
        [3, -1, -1, 2],
      ]);
      const [result, setResult] = useState(null);
    
      const updateMatrix = (e, i, j) => {
        const newMatrix = matrix.map(row => [...row]);
        newMatrix[i][j] = parseFloat(e.target.value);
        setMatrix(newMatrix);
      };
    
      const determinant3x3 = (m) => {
        return (
          m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
          m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
          m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
        );
      };
    
      const replaceColumn = (A, colIndex, B) => {
        return A.map((row, i) => row.map((val, j) => (j === colIndex ? B[i] : val)));
      };
    
      const computeCramer = () => {
        if (matrix.length !== 3 || matrix[0].length !== 4) {
          alert("Cramer's Rule requires a 3x4 augmented matrix");
          return;
        }
    
        const A = matrix.map(row => row.slice(0, 3));
        const B = matrix.map(row => row[3]);
    
        const D = determinant3x3(A);
        if (D === 0) {
          alert("No unique solution: determinant is zero");
          return;
        }
    
        const Dx = determinant3x3(replaceColumn(A, 0, B));
        const Dy = determinant3x3(replaceColumn(A, 1, B));
        const Dz = determinant3x3(replaceColumn(A, 2, B));
    
        const x = Dx / D;
        const y = Dy / D;
        const z = Dz / D;
    
        // Correct rounding for floating point issues
        const round = num => Math.round((num + Number.EPSILON) * 100) / 100;
    
        setResult({ x: round(x), y: round(y), z: round(z) });
      };
    
  return (
    <div className="text-center">
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
    <h2>Cramer's Rule (3x3)</h2>
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
    <button onClick={computeCramer} style={{ marginTop: 10 }} className='btn btn-info mt-4 w-100'>Compute Cramer's Rule</button>
    {result && (
      <div style={{ marginTop: 20 }}>
        <h4>Solution:</h4>
        <div>x = {result.x}</div>
        <div>y = {result.y}</div>
        <div>z = {result.z}</div>
      </div>
    )}
  </div>
  </div>
  )
}
