import { evaluate } from 'mathjs'
import React, { useState } from 'react'
export default function SimpleFixedPoint() {
    const [xi , setXi] = useState(0)
    const [error , setError] = useState(0)
    const [root , setRoot] = useState(0)
    var arr2 = []
    const [arr , setArr] = useState([])

    function g(x) {
        return Math.sqrt(1.9*x + 2.8) ;
    }

    function fixedPoint(x0, eps) {

        let iter = 0;
        let xi = x0;
        let xiPlus1;
        // let error = 0.7;
    
        do {
            xiPlus1 = g(xi);
           var error = Math.abs((xiPlus1 - xi) / xiPlus1) * 100;
  
let obj = {
    i : iter ,
    xi : xi ,
    xiPlus1 ,
    error,
    fx : g(xi)

}
arr2.push(obj)
setArr(arr2)
            xi = xiPlus1;
            iter++;
        } while (error > eps);

        setRoot(xi);

    }

    
  return (
    <div className='px-4 text-center'>
    <h1 className='mb-5'>Simple Fixed Point Method</h1>
    <input type="text" className='equField w-100' disabled value='-0.9x2+1.7x+2.5'  />
<div className='mt-4 d-flex justify-content-between'>
 <input type="text" className='xuField' placeholder='Xi value' onKeyUp={(e)=> setXi(e.target.value)} />
 <input type="text" className='xlField' placeholder='error vlaue' onKeyUp={(e)=> setError(Number(e.target.value))}  />
</div>



<button className='btn btn-info mt-4 w-75' onClick={()=>{fixedPoint(xi , error)}} >Calculate!</button>
<table className='table mt-5'>
 <thead className='table-dark'>
     <tr>
         <th>i</th>
         <th>Xi</th>
         <th>f(Xi)</th>
         <th>xi+1</th>
         <th>error</th>
     </tr>
 </thead>
 <tbody>
{

arr.map((e)=>(
    <tr>
        <td>{e.i}</td>
        <td>{Number(e.xi).toFixed(3)}</td>
        <td>{Number(e.fx).toFixed(3)}</td>
        <td>{Number(e.xiPlus1).toFixed(3)}</td>
        <td>{Number(e.error).toFixed(3)}</td>
    </tr>
))
}


 </tbody>
</table> 
{root  ?  <h1>root : {root}</h1> : "" }


</div>
  )
}
