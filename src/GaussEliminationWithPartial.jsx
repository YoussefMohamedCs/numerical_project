
import React, { useEffect, useState } from "react";
export default function GaussEliminationWithPartial() {
    const [result, setResult] = useState([])
    const [row1x1 , setrow1x1] = useState(0)
    const [row1x2 , setrow1x2] = useState(0)
    const [row1x3 , setrow1x3] = useState(0)
    const [row2x1 , setrow2x1] = useState(0)
    const [row2x2 , setrow2x2] = useState(0)
    const [row2x3 , setrow2x3] = useState(0)
    const [row3x1 , setrow3x1] = useState(0)
    const [row3x2 , setrow3x2] = useState(0)
    const [row3x3 , setrow3x3] = useState(0)
    const [row1B , setrow1B] = useState(0)
    const [row2B , setrow2B] = useState(0)
    const [row3B , setrow3B] = useState(0)

      const [isSolved , setIsSolved] = useState(false)

      useEffect(() => {
        const A = [
          [row1x1, row1x2, row1x3],
          [row2x1 , row2x2 , row2x3],
          [row3x1, row3x2, row3x3],
        ];
        const b = [ row1B, row2B, row3B];
        const n = A.length;
      
        // Deep copy A and b to avoid mutation on rerenders (optional)
        const M = A.map(row => [...row]);
        const B = [...b];
      
        for (let i = 0; i < n; i++) {
          // Partial pivoting
          let max = i;
          for (let k = i + 1; k < n; k++) {
            if (Math.abs(M[k][i]) > Math.abs(M[max][i])) max = k;
          }
          [M[i], M[max]] = [M[max], M[i]];
          [B[i], B[max]] = [B[max], B[i]];
      
          // Make all rows below this one 0 in current column
          for (let k = i + 1; k < n; k++) {
            const factor = M[k][i] / M[i][i];
            for (let j = i; j < n; j++) {
              M[k][j] -= factor * M[i][j];
            }
            B[k] -= factor * B[i];
          }
        }
      
        // Back substitution
        const x = Array(n).fill(0);
        for (let i = n - 1; i >= 0; i--) {
          let sum = B[i];
          for (let j = i + 1; j < n; j++) {
            sum -= M[i][j] * x[j];
          }
          x[i] = sum / M[i][i];
        }
      
        setResult(x);
      }, [isSolved]);


      
 const solve = ()=>{
    setIsSolved((e)=> !e)
 }
  return (
    <div className='text-center'>
        <h1 className='mb-5'>Gaussian Elimination with Partial</h1>
        <div className='d-flex flex-column justify-content-center align-items-center'>

        <div className='d-flex gap-3 w-100'>
        <input type="text" placeholder='x1coefficient' className='w-100 px-1 py-2' onKeyUp={(e)=> setrow1x1(Number(e.target.value))} />
        <input type="text" placeholder='x2coefficient' className='w-100 px-1 py-2' onKeyUp={(e)=> setrow1x2(Number(e.target.value))} />
        <input type="text" placeholder='x3coefficient' className='w-100 px-1 py-2' onKeyUp={(e)=> setrow1x3(Number(e.target.value))} />
        <input type="text" placeholder='b1coefficient' className='w-100 px-1 py-2' onKeyUp={(e)=> setrow1B(Number(e.target.value))} />

        </div>
       


        <div className='d-flex gap-3 w-100 mt-3'>
        <input type="text" placeholder='x1coefficient' className='w-100 px-1 py-2' onKeyUp={(e)=> setrow2x1(Number(e.target.value))} />
        <input type="text" placeholder='x2coefficient' className='w-100 px-1 py-2' onKeyUp={(e)=> setrow2x2(Number(e.target.value))} />
        <input type="text" placeholder='x3coefficient' className='w-100 px-1 py-2' onKeyUp={(e)=> setrow2x3(Number(e.target.value))} />
        <input type="text" placeholder='b2coefficient' className='w-100 px-1 py-2' onKeyUp={(e)=> setrow2B(Number(e.target.value))} />


        </div>
      

        <div className='d-flex gap-3 w-100 mt-3'>
        <input type="text" placeholder='x1coefficient' className='w-100 px-1 py-2' onKeyUp={(e)=> setrow3x1(Number(e.target.value))} />
        <input type="text" placeholder='x2coefficient' className='w-100 px-1 py-2' onKeyUp={(e)=> setrow3x2(Number(e.target.value))} />
        <input type="text" placeholder='x3coefficient' className='w-100 px-1 py-2' onKeyUp={(e)=> setrow3x3(Number(e.target.value))} />
        <input type="text" placeholder='b3coefficient' className='w-100 px-1 py-2' onKeyUp={(e)=> setrow3B(Number(e.target.value))} />


        </div>

        </div>
       <button className='btn btn-info mt-4 w-100' onClick={()=>solve() }>Calculate !</button>
      {console.log(result)}

<div className='mt-5 w-100'>
    {isSolved ? 
    <>
      <pre className='w-100'>|   x1     0    0    {result[0]}|</pre>
      <pre className='w-100'>|   0     x2   0    {result[1]}|</pre>
      <pre className='w-100'>|   0     0    x3    {result[2]}|</pre>
    
    </> : ""}
    

</div>
     
     <div>-------------------------------------------------------------</div>

<div>
    {
        isSolved ?
        <>
             
        <h1>x1 = {result[0]}</h1>
        <h1>x2 = {result[1]}</h1>
        <h1>x3 = {result[2]}</h1> </>
    : ""
    }
      

</div>

    </div>
  )
}
