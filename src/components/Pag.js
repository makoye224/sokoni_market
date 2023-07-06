import React from 'react';
import { Pagination } from 'react-bootstrap';

const Pag= ({ postsPerPage, totalPosts, currentPage, paginate }) => {
  const pageNumbers = Math.ceil(totalPosts / postsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageNumbers) {
      paginate(currentPage + 1);
    }
  };

  return (
    <div className="d-flex justify-content-center my-3">
      <Pagination>
        <Pagination.Prev onClick={handlePrevious} disabled={currentPage === 1} />
        {Array.from({ length: pageNumbers }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={currentPage === index + 1}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={handleNext} disabled={currentPage === pageNumbers} />
      </Pagination>
    </div>
  );
};

export default Pag;
