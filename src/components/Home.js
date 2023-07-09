import React, { useState, useEffect } from 'react';
import { Col, Container, FormControl, InputGroup, Pagination, Row } from 'react-bootstrap';
import { CartState } from '../context/Context';
import Filters from './Filters';
import SingleProduct from './SingleProduct';
import CarouselComponent from './CarouselComponent';
import FilterModal from './FilterModal';
import { BsSearch } from 'react-icons/bs';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 30;
  const maxPageNumbers = 5;

  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) => prod.ratings >= byRating);
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = transformProducts().slice(indexOfFirstPost, indexOfLastPost);


  const pageNumbers = Math.ceil(products.length / postsPerPage);
  const startPage = Math.max(currentPage - Math.floor(maxPageNumbers / 2), 1);
  const endPage = Math.min(startPage + maxPageNumbers - 1, pageNumbers);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentPage]);

  return (
    <>
      <br />
      <Container className="d-flex justify-content-center align-items-center">
      <FilterModal />
    </Container>
      <br />
      <section>
        <Container>
          <Row>
            {currentPosts.map((prod) => (
              <Col key={prod.id} lg={4} md={6} xs={12} className='mb-3'>
                <SingleProduct prod={prod} />
                <br />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section>
        <div className="d-flex justify-content-center my-3">
          <Pagination>
            <Pagination.First
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: pageNumbers }, (_, index) => index + 1)
              .slice(startPage - 1, endPage + 1)
              .map((number) => (
                <Pagination.Item
                  key={number}
                  active={currentPage === number}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </Pagination.Item>
              ))}
            <Pagination.Next
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pageNumbers}
            />
            <Pagination.Last
              onClick={() => setCurrentPage(pageNumbers)}
              disabled={currentPage === pageNumbers}
            />
          </Pagination>
        </div>
      </section>
      
    </>
  );
};


export default Home;
