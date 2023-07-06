import React, { useState } from 'react';
import { FormControl, Pagination } from 'react-bootstrap';
import { CartState } from '../context/Context';
import Filters from './Filters';
import SingleProduct from './SingleProduct';

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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const transformProducts = () => {
    let sortedProducts = currentPosts;

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

  const pageNumbers = Math.ceil(products.length / postsPerPage);
  const startPage = Math.max(currentPage - Math.floor(maxPageNumbers / 2), 1);
  const endPage = Math.min(startPage + maxPageNumbers - 1, pageNumbers);

  return (
    <>
      <section className="container">
        <FormControl
          type="search"
          placeholder="Search a product..."
          className="m-auto form-control-lg"
          aria-label="Search"
          onChange={(e) => {
            productDispatch({
              type: 'FILTER_BY_SEARCH',
              payload: e.target.value,
            });
          }}
        />
      </section>

      <section>
        <div className="home">
          <Filters />
          <div className="productContainer">
            <div className="row">
              {transformProducts().map((prod) => (
                <div key={prod.id} className="col-md-6 col-lg-3 mb-5">
                  <SingleProduct prod={prod} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="d-flex justify-content-center my-3">
          <Pagination>
            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: pageNumbers }, (_, index) => index + 1)
              .slice(startPage - 1, endPage)
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
            <Pagination.Last onClick={() => setCurrentPage(pageNumbers)} disabled={currentPage === pageNumbers} />
          </Pagination>
        </div>
      </section>
    </>
  );
};

export default Home;
