import React, { useState } from 'react'
import gauss from "gaussian-elimination"
export default function GaussionElimination() {
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

const [result , setResult] = useState([])

    function solve(x1 , x2 , x3 , x4 , x5 , x6 , x7 , x8 ,x9 , b1 , b2 , b3){

        let ma = [[x1, x2, x3, b1],  
        [x4, x5, x6, b2],  
        [x7, x8, x9,b3]]

        let res = gauss(ma)
        setResult(res)
    }

   

  return (
    <div className='text-center'>
        <h1 className='mb-5'>Gaussian Elimination</h1>
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
       <button className='btn btn-info mt-4 w-100' onClick={()=>solve(row1x1 , row1x2 , row1x3 , row2x1 , row2x2 , row2x3 , row3x1 , row3x2 , row3x3 , row1B , row2B , row3B) }>Calculate !</button>
      {/* {console.log(result)} */}

<div className='mt-5 w-100'>
      <pre className='w-100'>|   x1     0    0    {result[0]}|</pre>
      <pre className='w-100'>|   0     x2   0    {result[1]}|</pre>
      <pre className='w-100'>|   0     0    x3    {result[2]}|</pre>

</div>
     
     <div>-------------------------------------------------------------</div>

<div>
        <h1>x1 = {result[0]}</h1>
        <h1>x2 = {result[1]}</h1>
        <h1>x3 = {result[2]}</h1>

</div>

    </div>
  )
}
