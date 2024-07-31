import React from 'react';
import './Pagination.scss';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <nav aria-label="Table pagination" className="table-pagination--nav">
      <ul className="table-pagination--list">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            aria-label="Previous page"
            disabled={currentPage === 1}
          >
            &laquo; Previous
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index + 1}>
            <button
              onClick={() => handlePageChange(index + 1)}
              aria-label={`Page ${index + 1}`}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            aria-label="Next page"
            disabled={currentPage === totalPages}
          >
            Next &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
