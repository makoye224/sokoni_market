import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import BuyNow from "./components/BuyNow";

function App() {
  return (
    <BrowserRouter>
    <hr/>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Header />
        <div className="App">
          <Route path="/" exact component={Home} />
          <Route path="/cart" component={Cart} />
          <Route path="/buynow/:productId" component={BuyNow} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
