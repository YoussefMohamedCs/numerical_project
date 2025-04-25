import Bisection from './Bisection';
import FalsePos from './FalsePos';
import Layout from './Layout';
// import logo from './logo.svg';
// import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Newton from './Newton';
import SimpleFixedPoint from './SimpleFixedPoint';
import Scent from './Scent';
import GaussionElimination from './GaussionElimination';
import GaussEliminationWithPartial from './GaussEliminationWithPartial';
import Lu from './Lu';
import LuWithPartial from './LuWithPartial';
import GaussGordanElimination from './GaussGordanElimination';
import Cramer from './Cramer';
import GoldenMethod from './GoldenMethod';
import ConjugateMethod from './ConjugateMethod';
import GaussGordanEliminationWithPartial from './GaussGordanEliminationWithPartial';
function App() {
const router = createBrowserRouter([
  {path:"/" , element:<Layout /> , children:[
    {index:true , element:<Bisection />},
    {path:"Bisection" , element:<Bisection />} ,
    {path:"FalsePostion" , element:<FalsePos />} ,
    {path:"Newton" , element:<Newton />} ,
    {path:"SimpleFixedPoint" , element:<SimpleFixedPoint />} ,
    {path:"Secant" , element:<Scent /> } ,
    {path:"GaussionElimination" , element:<GaussionElimination />} ,
    {path:"GaussEliminationWithPartial" , element:<GaussEliminationWithPartial />} ,
    {path:"LU" , element:<Lu />},
    {path:"LuWithPartial" , element:<LuWithPartial />},
    {path:"GGE" , element:<GaussGordanElimination />},
   {path:"cramer" , element:<Cramer />}
   ,{path:"goldenMethod" , element:<GoldenMethod />} ,
   {path:"conjugateMethod" , element:<ConjugateMethod />} ,
   {path:"GGEP" , element :<GaussGordanEliminationWithPartial />}


  ]},
])
  return (
  <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
