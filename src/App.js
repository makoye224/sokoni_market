import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import BuyNow from "./components/BuyNow";
import ProductDetails from "./components/ProductDetails";
import Checkout from "./components/Checkout";

function App() {
  return (
    <BrowserRouter >
      <div style={{backgroundColor: '#FAF9F6'}}>
        <Header />
        <div className="App">
          <Route path="/" exact component={Home} />
          <Route path="/cart" component={Cart} />
          <Route path="/buynow/:productId" component={BuyNow} />
          <Route path="/product-details/:productId" component={ProductDetails} />
          <Route path="/checkout" component={Checkout} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
