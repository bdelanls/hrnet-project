import React from 'react';

interface PaginationInfoProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

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
