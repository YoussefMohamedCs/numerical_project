import React, { useState } from "react";
export default function ConjugateMethod() {
    const [matrixA, setMatrixA] = useState([
        [4, 1, 2],
        [1, 3, 1],
        [2, 1, 3]
      ]);
      const [vectorB, setVectorB] = useState([4, 5, 7]);
      const [result, setResult] = useState(null);
    
      const conjugateGradient = (A, b, x0 = [0, 0, 0], tol = 1e-6, maxIter = 100) => {
        let x = [...x0];
        let r = b.map((bi, i) => bi - A[i].reduce((acc, aij, j) => acc + aij * x[j], 0));
        let p = [...r];
        let rsOld = r.reduce((acc, ri) => acc + ri * ri, 0);
    
        for (let i = 0; i < maxIter; i++) {
          const Ap = A.map((row, i) => row.reduce((acc, aij, j) => acc + aij * p[j], 0));
          const alpha = rsOld / p.reduce((acc, pi, i) => acc + pi * Ap[i], 0);
          x = x.map((xi, i) => xi + alpha * p[i]);
          r = r.map((ri, i) => ri - alpha * Ap[i]);
          const rsNew = r.reduce((acc, ri) => acc + ri * ri, 0);
          if (Math.sqrt(rsNew) < tol) break;
          const beta = rsNew / rsOld;
          p = r.map((ri, i) => ri + beta * p[i]);
          rsOld = rsNew;
        }
    
        return x;
      };
    
      const handleCompute = () => {
        const solution = conjugateGradient(matrixA, vectorB);
        setResult(solution);
      };
  return (
    <div className="container mt-4">
    <h2 className="mb-3">Conjugate Gradient Method (3x3)</h2>
    <button onClick={handleCompute} className="btn btn-info mt-4 w-100">Solve Ax = b</button>

    {result && (
      <div className="alert alert-success mt-4">
        <strong>Solution:</strong>
        <div>x ≈ {result[0].toFixed(4)}</div>
        <div>y ≈ {result[1].toFixed(4)}</div>
        <div>z ≈ {result[2].toFixed(4)}</div>
      </div>
    )}
  </div>
  )
}
