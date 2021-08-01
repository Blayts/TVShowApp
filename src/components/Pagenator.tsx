import React, { useState } from 'react';


interface PagenatorProps {
  page: number,
  maxPage: number,
  onChangePage(numberPage: number): void
};

const Pagenator: React.FC<PagenatorProps> = ({ page, maxPage, onChangePage }) => {  

  function decrementPage() {
    if(page) {
      onChangePage(page - 1);
    }
  }

  function incrementPage() {
    if((page + 1) < maxPage) {
      onChangePage(page + 1);
    }
  }

  return (
    <ul className="pagenator">
      <li onClick={ decrementPage }>&lt;</li>
      <li>{ page + 1 }</li>
      <li onClick={ incrementPage }>&gt;</li>
    </ul>
  )
}

export default Pagenator;
