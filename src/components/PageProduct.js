import React, { useContext } from 'react'
import { ProductContext } from '../context/products'
import ProductList from './Products/ProductList';

const PageProduct = () => {
  const { sorted, page, changePage } = useContext(ProductContext);
  console.log(sorted);

  if (sorted[page]) {
    return (
      <ProductList products={sorted[page]} />
    )
  } else {
    return (
      <h3 className="search-errors">unfortunately your search query did not return any products</h3>
    )
  }
}

export default PageProduct
