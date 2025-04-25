import React, { useState } from 'react'
import { evaluate } from 'mathjs'
export default function Scent() {
    const [equation , setEquation] = useState("(x^3)+3x-5")
    const [xi ,setXi] = useState(0)
    const [xiMinus1 , setXiMinus1] = useState(0)
    const [error , setError] = useState(0)
    const [root , setRoot] = useState(0)
    const [isSubmited , setSubmit ] = useState(false)
    var arr2 =[]
    const [arr , setArr] = useState([])
    // function f(x) {
    //     return (0.95*Math.pow(x , 3)) - (5.9*Math.pow(x , 2)) + (10.9 * x) - 6 ;
    // }
    var f = (x)=> evaluate(equation , {x})

    function secantMethod(x0, x1, eps , maxIter = 100) {
        var f = (x)=> evaluate(equation , {x})
        setSubmit(true)
        let error = Math.abs((x1 - x0) / x1) * 100;
        let iter = 1;
    
        while (error >= eps && iter < maxIter) {
            let xNew = x1 - (f(x1) * (x0 - x1)) / (f(x0) - f(x1));
            error = Math.abs((xNew - x1) / xNew) * 100;
            var obj = {
                i : iter ,
                xiMinus1 : x1,
                xi : xNew,
                fxiMinus : f(x1) ,
                fx : f(xNew) ,
                error
            }
            arr2.push(obj)
            setArr(arr2)

            x0 = x1;
            x1 = xNew;
            iter++;
        }
        setRoot(xi)
    }
    // console.log(arr)

  return (
    <div className='px-4 text-center'>
    <h1 className='mb-5'>Secant</h1>
    <input type="text" className='equField w-100'  placeholder='0.95x3-5.9x2+10.9x-6' onChange={(e)=> setEquation(e.target.value)}  />

<div className='mt-4 d-flex justify-content-between flex-column gap-4'>
    <div className='d-flex gap-4'>
    <input type="text" className='xuField w-50' placeholder='Xi value' onKeyUp={(e)=> setXi(e.target.value)} />
    <input type="text" className='xuField w-50' placeholder='XiMinus1' onKeyUp={(e)=> setXiMinus1(e.target.value)} />
    </div>


 <input type="text" className='xlField w-100' placeholder='error vlaue' onKeyUp={(e)=> setError(e.target.value)} />
</div>

<button className='btn btn-info mt-4 w-75' onClick={()=>secantMethod(xiMinus1, xi, error ) }  >Calculate!</button>
<table className='table mt-5'>
 <thead className='table-dark'>

     <tr>
   <th>i</th>
   <th>xi-1</th>
   <th>f(xi-1)</th>
   <th>xi</th>
   <th>f(xi)</th>
   <th>error</th>
     </tr>
 </thead>
 <tbody>
 
    {
        isSubmited ?
        <tr>
        <td>0</td>
            <td>{xiMinus1}</td>
            <td>{f(xiMinus1).toFixed(3)}</td>
            <td>{xi}</td>
            <td>{f(xi).toFixed(3)}</td>
            <td>0</td>
    
    </tr> : ""

    }   
{
    arr.map((e)=>(
        <tr>
            <td>{e.i}</td>
            <td>{Number(e.xiMinus1).toFixed(3)}</td>
            <td>{Number(e.fxiMinus).toFixed(3)}</td>
            <td>{Number(e.xi).toFixed(3)}</td>
            <td>{Number(e.fx).toFixed(3)}</td>
            <td>{Number(e.error).toFixed(3)}</td>
        </tr>
    ))
}


 </tbody>
</table> 
{root === 0 ? "" : <h1>root : {root}</h1> }


</div>
  )
}
