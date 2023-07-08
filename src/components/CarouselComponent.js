import Carousel from 'react-bootstrap/Carousel';
import { CartState } from '../context/Context';

function CarouselComponent() {
    const {
        state: { products },
        productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
      } = CartState();


  return (
    <Carousel slide={false} className='container' style={{scale: '80%'}}>
       {products.map((prod, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 img-fluid"
            src={prod.image}
            alt="First slide"
            
          />
          <Carousel.Caption>
            <h3>{prod.name}</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel> 
  );
}

export default CarouselComponent;