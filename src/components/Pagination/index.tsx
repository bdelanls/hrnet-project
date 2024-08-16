import React from 'react';
import './Pagination.scss';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination component that handles navigation through a paginated list.
 *
 * @param {number} totalItems - The total number of items to paginate.
 * @param {number} itemsPerPage - The number of items to display per page.
 * @param {number} currentPage - The current page being viewed.
 * @param {(page: number) => void} onPageChange - Function to call when the page changes.
 * @returns {React.ReactElement} The rendered Pagination component.
 */
const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  /**
   * Handles the page change by validating the new page number
   * and triggering the onPageChange callback.
   *
   * @param {number} newPage - The new page number to navigate to.
   */
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  /**
   * Generates an array representing the pagination buttons to be displayed.
   *
   * This function ensures that a maximum of five page numbers are visible at once.
   * It includes ellipses ("...") to indicate that there are more pages either
   * before or after the currently visible range. The first and last page numbers
   * are always shown if there are more than five pages in total.
   *
   * @returns {Array<number | string>} An array of page numbers and ellipses.
   * - Numbers represent actual page numbers.
   * - Strings represent ellipses ("...") indicating skipped pages.
   *
   * Example output for a total of 10 pages:
   * - If on page 1: [1, 2, 3, 4, 5, '...', 10]
   * - If on page 7: [1, '...', 6, 7, 8, 9, 10]
   */
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      let startPage, endPage;

      if (currentPage <= 3) {
        startPage = 2;
        endPage = 5;
      } else if (currentPage >= totalPages - 3) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }

      if (startPage > 2) {
        pageNumbers.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }

      if (endPage < totalPages) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
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
        {getPageNumbers().map((page, index) => (
          <li key={index}>
            {typeof page === 'number' ? (
              <button
                onClick={() => handlePageChange(page)}
                aria-label={`Page ${page}`}
                className={currentPage === page ? 'active' : ''}
              >
                {page}
              </button>
            ) : (
              <span className="ellipsis">...</span>
            )}
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
