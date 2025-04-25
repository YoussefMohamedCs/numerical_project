import React, { useState } from 'react'
import { evaluate } from "mathjs";


export default function Bisection() {

    const [xu , setXu] = useState(0)
    const [xl , setXl] = useState(0)
    const [arr , setArr] = useState([])
    const [xr , setXr] = useState(0)
const [eps , setEps] = useState(0)
    const [root , setRoot] = useState(0)
    const [equation , setEquation] = useState("x^3+(3*x)-5")


    //start of function
    function bisect() {
    var f = (x)=> evaluate(equation , {x})
    var iter = 0;
    var arr2=[]
     var xl2 = xl;
    var xu2 = xu;
        var xr = 0;
        var xrOld = 0;
        var error = 0;
xl2 = Number(xl2)
xu2 = Number(xu)
        do {
            xrOld = xr;
            xr =((xl2 + xu2) / 2);
            console.log("xr" , xl2+xu2)
            error = Math.abs((xr - xrOld) / xr) *100;
            console.log(`iteration=${iter} | xl=${xl2} | f(xl)=${f(xl2)} | xu=${xu2} | f(xu)=${f(xu2)} | xr=${xr} | f(xr)=${f(xr)} | Error%= ${error} `);
            var newtem = {
                iter : iter ,
                xl : xl2,
                xu : xu2,
                fxl : f(xl2) ,
                fxu : f(xu2) ,
                error : error , 
                xr : xr,
                fxr : f(xr)
            } 
            arr2.push(newtem)
            setArr(arr2)
            if (f(xl) * f(xr) > 0) {
                xl2 = xr;
            } else {
                xu2 = xr;
            }
            iter++;
        } while (error > eps);
        setRoot(xr)
        return xr;
    }
    // end of func bisec

  return (
    <div className='px-4 text-center'>
<h1 className='mb-5'>Bisection Method</h1>
<input type="text" className='equField w-100'  placeholder='x3+3x-5' onChange={(e)=>setEquation(e.target.value) }   />

<div className='mt-4 d-flex justify-content-between'>
    <input type="text" className='xuField' placeholder='XU value' onKeyUp={(e)=> setXu(e.target.value)} />
    <input type="text" className='xlField' placeholder='XL vlaue' onKeyUp={(e)=> setXl(e.target.value)}/>
</div>
<input type="text" className='error mt-4 w-100' placeholder='error value'  onKeyUp={(e)=> setEps(e.target.value)} />
<button className='btn btn-info mt-4 w-75' onClick={()=> bisect(xl , xu)}>Calculate!</button>
<table className='table mt-5'>
    <thead className='table-dark'>
        <tr>
            <th>i</th>
            <th>xl</th>
            <th>f(xl)</th>
            <th>xu</th>
            <th>f(xu)</th>
            <th>xr</th>
            <th>f(xr)</th>
            <th>error</th>
        </tr>
    </thead>
    <tbody>
       {arr.map(e=>(
        <tr>
            <td>{e.iter}</td>
            <td>{Number((e.xl)).toFixed(3)}</td>
            <td>{Number(e.fxl).toFixed(3)}</td>
            <td>{Number(e.xu).toFixed(3)}</td>
            <td>{Number(e.fxu).toFixed(3)}</td>
            <td>{Number(e.xr).toFixed(3)}</td>
            <td>{Number(e.fxr).toFixed(3)}</td>
            <td>{e.iter===0 ? "none" : Number(e.error).toFixed(3)}</td>
        </tr>
       ))}
       
    </tbody>
</table> 
{root === 0 ? "" : <h1>root : {root}</h1> }
    </div>
  )
}
