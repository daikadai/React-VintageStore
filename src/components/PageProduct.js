import React, { useContext } from 'react'
import { ProductContext } from '../context/products'
import ProductList from './Products/ProductList';

const PageProduct = () => {
  const { sorted, page, changePage } = useContext(ProductContext);
  return (
    <ProductList products={sorted} />
  )
}

export default PageProduct
