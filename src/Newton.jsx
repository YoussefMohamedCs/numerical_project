import React, { useState } from 'react'
import { evaluate, derivative } from 'mathjs';
export default function Newton() { 
    const [func, setFunc] = useState('x^2 - 2'); // Default function
    const [x0, setX0] = useState(1);            // Initial guess
    const [errorTol, setErrorTol] = useState(0.001);
    const [iterations, setIterations] = useState([]);
    const [root, setRoot] = useState(null);
  
    const f = (x) => evaluate(func, { x });
    const fPrime = (x) => evaluate(derivative(func, 'x').toString(), { x });
  
    const newton = () => {
      let x = parseFloat(x0);
      const tol = parseFloat(errorTol);
      let currentError = 100;
      let iter = 0;
      const results = [];
  
      while (currentError > tol && iter < 50) {
        const fx = f(x);
        const fpx = fPrime(x);
  
        if (fpx === 0) {
          alert("Derivative is zero. Newton's method fails.");
          return;
        }
  
        const xNext = x - fx / fpx;
        if(iter !== 0){
            currentError = Math.abs((x - xOld) / x) * 100;
        }
  
        results.push({
          i: iter,
          xi: x.toFixed(5),
          fxi: fx.toFixed(5),
          fpxi: fpx.toFixed(5),
          error: iter === 0 ? "0" : currentError.toFixed(5) ,
        });
  var xOld = x;
        x = xNext;
        iter++;
      }
  
      setIterations(results);
      setRoot(x.toFixed(6));
    };
   
  return (
    <div className='px-4 text-center'>
        <h1 className='mb-5'>Newton Method</h1>
        <input type="text" className='equField w-100'  placeholder='x3+3x-5' onKeyUp={(e)=> setFunc(e.target.value)} />
        {/* <input type="text" className='equField w-100 mt-4'  placeholder='3x^2+3' onKeyUp={(e)=> setEquationDash(e.target.value)}  /> */}

 <div className='mt-4 d-flex justify-content-between'>
     <input type="text" className='xuField' placeholder='Xi value' onKeyUp={(e)=> setX0(e.target.value)} />
     <input type="text" className='xlField' placeholder='error vlaue' onKeyUp={(e)=> setErrorTol(e.target.value)} />
 </div>

 <button className='btn btn-info mt-4 w-75' onClick={()=>newton(x0 , errorTol) } >Calculate!</button>
 <table className='table mt-5'>
     <thead className='table-dark'>
         <tr>
             <th>i</th>
             <th>Xi</th>
             <th>f(Xi)</th>
             <th>F^(Xi)</th>
             <th>error</th>
         </tr>
     </thead>
     <tbody>
     {iterations.map(e=>(
         <tr>
             <td>{e.i}</td>
             <td>{Number((e.xi)).toFixed(3)}</td>
             <td>{Number(e.fxi).toFixed(3)}</td>
             <td>{Number(e.fpxi).toFixed(3)}</td>
             <td>{Number(e.error).toFixed(3)}</td>
            
         </tr>
        ))}


     </tbody>
 </table> 
 
 {root === 0 ? "" : <h1>root : {root}</h1> }


    </div>
  )
}
