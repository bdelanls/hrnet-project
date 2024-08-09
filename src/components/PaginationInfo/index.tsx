import React from 'react';

interface PaginationInfoProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

/**
 * PaginationInfo component displays a summary of the current pagination state,
 * showing the range of items being displayed out of the total number of items.
 *
 * @param {number} currentPage - The current page being viewed.
 * @param {number} itemsPerPage - The number of items displayed per page.
 * @param {number} totalItems - The total number of items in the list.
 * @returns {React.ReactElement} The rendered PaginationInfo component.
 */
const PaginationInfo: React.FC<PaginationInfoProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
}) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage + 1;

  return (
    <p className="table-pagination--info">
      Showing {Math.min(indexOfFirstItem, totalItems)} to{' '}
      {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
    </p>
  );
};

export default PaginationInfo;
