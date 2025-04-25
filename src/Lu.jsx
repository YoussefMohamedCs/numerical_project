import { slu, matrix } from "mathjs";
import React, { useEffect, useState } from "react";

export default function Lu() {
  const [row1x1, setrow1x1] = useState(0);
  const [row1x2, setrow1x2] = useState(0);
  const [row1x3, setrow1x3] = useState(0);
  const [row2x1, setrow2x1] = useState(0);
  const [row2x2, setrow2x2] = useState(0);
  const [row2x3, setrow2x3] = useState(0);
  const [row3x1, setrow3x1] = useState(0);
  const [row3x2, setrow3x2] = useState(0);
  const [row3x3, setrow3x3] = useState(0);
  const [row1B, setrow1B] = useState(0);
  const [row2B, setrow2B] = useState(0);
  const [row3B, setrow3B] = useState(0);

  const [inputMatrix, setInputMatrix] = useState([
    [row1x1, row1x2, row1x3, row1B],
    [row2x1, row2x2, row2x3, row2B],
    [row3x1, row3x2, row3x3, row3B],
  ]);

  const [result, setResult] = useState(null);
  const [solutionsL, setSolutionsL] = useState(null);
  const [solutionsU, setSolutionsU] = useState(null);




  const computeLU = (matrix) => {
    const n = matrix.length;
    let L = Array.from({ length: n }, () => Array(n).fill(0));
    let U = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let k = i; k < n; k++) {
        let sum = 0;
        for (let j = 0; j < i; j++) {
          sum += L[i][j] * U[j][k];
        }
        U[i][k] = matrix[i][k] - sum;
      }

      for (let k = i; k < n; k++) {
        if (i === k) {
          L[i][i] = 1; // Diagonal of L is 1
        } else {
          let sum = 0;
          for (let j = 0; j < i; j++) {
            sum += L[k][j] * U[j][i];
          }
          L[k][i] = (matrix[k][i] - sum) / U[i][i];
        }
      }
    }

    return { L, U };
  };

  // Forward substitution to solve L * y = b
  const forwardSubstitution = (L, b) => {
    const n = L.length;
    const y = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < i; j++) {
        sum += L[i][j] * y[j];
      }
      y[i] = b[i] - sum;
    }
    return y;
  };
  

  // Backward substitution to solve U * x = b
  const backwardSubstitution = (U, y) => {
    const n = U.length;
    const x = Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      let sum = 0;
      for (let j = i + 1; j < n; j++) {
        sum += U[i][j] * x[j];
      }
      x[i] = (y[i] - sum) / U[i][i];
    }
    return x;
  };




  const handleCompute = () => {
    const { L, U } = computeLU(inputMatrix);
    const b = inputMatrix.map((row) => row[row.length - 1]); // last column as vector b

    // Solve L * y = b
    const yL = forwardSubstitution(L, b);
    setSolutionsL(yL);

    // Solve U * x = yL
    const xU = backwardSubstitution(U, yL);
    setSolutionsU(xU);

    setResult({ L, U });
  };






  const handleMatrixChange = (event, rowIndex, colIndex) => {
    const updatedMatrix = [...inputMatrix];
    updatedMatrix[rowIndex][colIndex] = Number(event.target.value);
    setInputMatrix(updatedMatrix);
  };






  return (
    <div style={{ padding: "20px" }} className="text-center">
      <h1 className="mb-5">LU Method</h1>
      {inputMatrix.map((row, rowIndex) => (
        <div key={rowIndex}>
          <div className="d-flex flex-row">
            {row.map((col, colIndex) => (
              <input
                key={colIndex}
                type="text"
                placeholder={`input coefficient x${colIndex}`}
                className="w-100 px-1 py-2"
                onChange={(e) => handleMatrixChange(e, rowIndex, colIndex)}
                style={{ width: "50px", margin: "5px" }}
              />
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleCompute}
        style={{ marginTop: "20px" }}
        className="btn btn-info mt-4 w-100"
      >
        Compute LU
      </button>
      {result && (
        <div>
          <h3>Lower Triangular Matrix (L):</h3>
          <pre>{JSON.stringify(result.L,null)}</pre>
          <h3>Upper Triangular Matrix (U):</h3>
          <div>{JSON.stringify(result.U, null, 2)}</div>
        </div>
      )}
      {solutionsL && (
        <div>
          <h3>Solution for L (y from L * y = b):</h3>
          <div>{JSON.stringify(solutionsL)}</div>
        </div>
      )}
      {solutionsU && (
        <div>
          <h3>Solution for U (x from U * x = y):</h3>
          <div>{JSON.stringify(solutionsU)}</div>
        </div>
      )}
    </div>
  );
}