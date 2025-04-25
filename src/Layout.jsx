import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Accordion from 'react-bootstrap/Accordion';
export default function Layout() {
    const navigate = useNavigate()
  return (

    <div className="w-100 " >
<div>
<div className="row d-flex flex-row align-items-center " style={{height:"100vh"}}>
    <div className="col-6 px-5 py-2">
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Unit One 1#</Accordion.Header>
        <Accordion.Body>
        <Accordion.Item className='acc__item' onClick={()=> navigate('Bisection')}>
            Bisection
        </Accordion.Item>
        <Accordion.Item className='acc__item' onClick={()=> navigate('FalsePostion')}>
            fasle position method
        </Accordion.Item>
        <Accordion.Item className='acc__item' onClick={()=> navigate("Newton")}>
            newton
        </Accordion.Item>
        <Accordion.Item className='acc__item' onClick={()=> navigate("SimpleFixedPoint")}>
            fixed point iteration
        </Accordion.Item>
        <Accordion.Item className='acc__item' onClick={()=> navigate("Secant")}>
            scent
        </Accordion.Item>
        </Accordion.Body>
      </Accordion.Item>
      
      <Accordion.Item eventKey="1">
        <Accordion.Header>Unit Two#</Accordion.Header>
        <Accordion.Body>
        <Accordion.Item className='acc__item' onClick={()=> navigate('GaussionElimination')}>
     Gaussian-Elimination
        </Accordion.Item>
        <Accordion.Item className='acc__item' onClick={()=> navigate('GaussEliminationWithPartial')}>
        gauss elimination with partial
        </Accordion.Item>
        <Accordion.Item className='acc__item' onClick={()=> navigate('LU')}>
         LU
        </Accordion.Item>
        <Accordion.Item className='acc__item' onClick={()=> navigate('LuWithPartial')}>
         LU With Partial 
        </Accordion.Item>
        <Accordion.Item className='acc__item' onClick={()=> navigate('GGE')}>
         Gasss Gordan Elimination
        </Accordion.Item>
        <Accordion.Item className='acc__item' onClick={()=> navigate('GGEP')}>
         Gauss Gordan Elimination With Partial Pivoting
        </Accordion.Item>
        <Accordion.Item className='acc__item' onClick={()=> navigate('cramer')}>
       Cramer's
        </Accordion.Item>

        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Unit three#</Accordion.Header>
        <Accordion.Body>
        <Accordion.Item className='acc__item' onClick={()=> navigate('goldenMethod')}>
  Golden section Method
        </Accordion.Item>
        <Accordion.Item className='acc__item' onClick={()=> navigate('conjugateMethod')}>
        Conjugate Gradient Method
        </Accordion.Item>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
    <div className="col-6">
    <Outlet />

        </div>
</div></div>

</div>

  )
}
