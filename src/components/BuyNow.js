import React from 'react';
import { useParams } from 'react-router-dom';
import { CartState } from '../context/Context';

const BuyNow = () => {
  const { productId } = useParams();
  const { state: { products } } = CartState();

  const product = products.find((prod) => prod.id === productId);

  return (
    <div>
      {/* Render the details of the product */}
      {product && (
        <div>
          <h2>{product.name}</h2>
          <p>Price: Tshs. {product && product.price.split(".")[0]}</p>
          {/* Add more product details */}
        </div>
      )}
    </div>
  );
}

export default BuyNow;
