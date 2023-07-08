import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartState } from '../context/Context';
import { useHistory } from "react-router-dom";
import Rating from "./Rating";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { Container } from 'react-bootstrap';

const ProductDetails = () => {
    const {
        state: { cart },
        dispatch,
      } = CartState();
      const { productId } = useParams();
      const { state: { products } } = CartState();
    const product = products.find((prod) => prod.id === productId);


    const history = useHistory();
    const [selectedImage, setSelectedImage] = useState(product.image);
    const [showFullText, setShowFullText] = useState(false);
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor luctus sapien id congue. Nulla facilisi. Nunc efficitur nunc ac bibendum vestibulum. Suspendisse potenti. Sed vel ante ut magna fringilla eleifend. In hac habitasse platea dictumst. Duis viverra ex eu velit fermentum aliquet. Cras consectetur nisl eu nunc blandit, id hendrerit dolor gravida. Vestibulum lacinia cursus turpis, eget pulvinar turpis aliquet ac. Nullam convallis consequat massa, nec congue elit eleifend et. Quisque tincidunt erat at dolor dignissim consectetur. Aliquam erat volutpat. Sed in elit odio. Nam malesuada dapibus diam at gravida. Nulla facilisi.";
    const truncatedText = showFullText ? text : text.split(' ').slice(0, 20).join(' ');
   

   

    const handleClick = (imageSrc) => {
        setSelectedImage(imageSrc);
      };
      const handleToggleText = () => {
        setShowFullText(!showFullText);
      };

      const handleBuyNowClick = () => {
        dispatch({
          type: "ADD_TO_CART",
          payload: product,
        });
        history.push(`/buynow/${product.id}`);
      };

  return (
    <>
    <hr />
    <div className="container-fluid">
      <br />
      <div className="row">
        <div className="col-md-1 d-flex flex-wrap justify-content-start">
          <button className="image-button side-p-media mb-2" onClick={() => handleClick('https://rb.gy/p8qbb')}>
            <img src="https://rb.gy/p8qbb" alt="product-photo" className="img-fluid" />
          </button>
          <button className="image-button side-p-media mb-2" onClick={() => handleClick('https://shorturl.at/ctLNT')}>
            <img src="https://shorturl.at/ctLNT" alt="product-photo" className="img-fluid" />
          </button>
          <button className="image-button side-p-media mb-2" onClick={() => handleClick('https://shorturl.at/tzDL9')}>
            <img src="https://shorturl.at/tzDL9" alt="product-photo" className="img-fluid" />
          </button>
          <button className="image-button side-p-media mb-2" onClick={() => handleClick('https://rb.gy/oi1tk')}>
            <img src="https://rb.gy/oi1tk" alt="product-photo" className="img-fluid" />
          </button>
          <button className="image-button side-p-media mb-2" onClick={() => handleClick(product && product.image)}>
            <img src={product && product.image} alt="product-photo" className="img-fluid" />
          </button>
        </div>

        <div className="col-md-5">
          <div style={{ maxHeight: '600px', overflow: '' }}>
            <img src={selectedImage} alt="product-photo" style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
          </div>
        </div>
        <div className='col-md-5'>
            <div>
            {!product.inStock ? (
          <p className="text-danger">Out of Stock</p>
        ) : (
          <div className="d-flex justify-content-center">
            {cart.some((p) => p.id === product.id) ? (
              <RemoveShoppingCartIcon
                variant="danger"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: product,
                  })
                }
                style={{color: 'red'}}
              >
              </RemoveShoppingCartIcon>
            ) : (
              <AddShoppingCartIcon
                variant="primary"
                onClick={() =>
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: product,
                  })
                }
                style={{color: '#2dace4'}}
              >
              </AddShoppingCartIcon>
            )}
            <MonetizationOnIcon
              variant="success"
              onClick={handleBuyNowClick}
              className="ms-2"
              style={{ marginLeft: "20px", color: 'green' }}
            >
            </MonetizationOnIcon>
          </div>
        )}
            </div>
          <hr/>
          <span style={{marginRight: "10px", color: "blue"}}><a style={{color: "purple"}} href='#'>visit store</a></span><span style={{marginRight: "10px"}}><a style={{color: "green"}} href='#'>rating</a></span> 
          <span style={{marginRight: "10px"}}><a style={{color: "green"}} href ="#">reviews</a></span> <span><a style={{color: "purple"}} href = "#" >FAQ</a></span>
          <hr/>
          <div><p style= {{fontWeight: "bold"}}> Tshs. {product && product.price.split(".")[0]}</p> 
          <span><a href ="#/message" style={{color: "purple"}}>bargain price</a></span></div> 
          <br/>
          <span >Can be returned after purchase:</span> <span style={{color: "green"}}>yes</span>
          <br/>
          <br/>
          <p style={{fontWeight:"bold"}}>Product Details</p>
          <div>
             {product && product.description}
          </div>
          <br/>
          <br/>
          <div>
          <p style={{fontWeight:'bold'}}>About this Product</p>
          <div>
              {showFullText ? (
                   <p style={{ fontStyle: "italic" }}>{text}</p>
                   ) : (
                   <p style={{ fontStyle: "italic" }}>{text.split(' ').slice(0, 20).join(' ')}</p>
                   )}
                   <a onClick={handleToggleText} style={{ color: "blue", cursor: "pointer" }}>
                      {showFullText ? 'Read Less' : 'Read More'}
                      </a>
                      </div>
                      </div>
                      </div>
      </div>
      <hr/>
      
      <Container fluid>
    <h5 className='container'>Similar Products</h5>
    
    <hr />
    <h5>Other Products</h5>
   
    
    <hr />
    <h5>Reviews</h5>
  </Container>
    </div>
  </>
  )
}

export default ProductDetails
