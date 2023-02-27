import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Product from "./Pages/Product";

function App() {
  return (
    <BrowserRouter>
    <div>
      <header>
        <Link to='/'>Post Shop</Link>
      </header>
      <main>
        <Routes>
          <Route path='/product/:slug' element={ <Product />} />
          <Route path='/'element= { <Home /> } />
        </Routes>  
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
