import React from 'react';
import sass from'../css/CarouselPaginationDesign.module.scss';

const CarouselPagination = ({ totalPages, currentPage, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={sass.carousel_pagination}>
      <button onClick={() => paginate(1)} disabled={currentPage === 1}>&laquo;</button>
      <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
      <div className={sass.page_numbers}>
        {pageNumbers.map(number => (
          <button
            key={number}
            className={sass.currentPage === number ? 'active' : ''}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}
      </div>
      <button onClick={() => paginate(currentPage + 1 )} disabled={currentPage === totalPages}>&gt;</button>
      <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>&raquo;</button>
    </div>
  );
};

export default CarouselPagination;