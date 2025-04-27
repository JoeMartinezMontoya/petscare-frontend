'use client';
import React, { useState, useEffect } from 'react';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [localPage, setLocalPage] = useState(currentPage);

  useEffect(() => {
    setLocalPage(currentPage);
  }, [currentPage]);

  const handlePageClick = (page) => {
    setLocalPage(page);
    onPageChange(page);
  };

  return (
    <div className='text-center mt-auto mb-5'>
      <div className='btn-group' role='group'>
        {totalPages > 1 && (
          <>
            <button
              className='btn btn-outline-primary'
              onClick={() => handlePageClick(localPage - 1)}
              disabled={localPage === 1}>
              <GrCaretPrevious />
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`btn btn-outline-primary ${
                  localPage === index + 1 ? 'active' : ''
                }`}
                onClick={() => handlePageClick(index + 1)}>
                {index + 1}
              </button>
            ))}

            <button
              className='btn btn-outline-primary'
              onClick={() => handlePageClick(localPage + 1)}
              disabled={localPage === totalPages}>
              <GrCaretNext />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
