import React, { useContext, Fragment } from 'react'
import { ProductContext } from '../context/products'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import ProductList from './Products/ProductList';

const PageProduct = () => {
  const { sorted, page, changePage } = useContext(ProductContext);
  console.log(sorted);

  if (sorted[page]) {
    return (
      <Fragment>
        <ProductList products={sorted[page]} />
        {sorted.length > 1 && <article className="pagination-buttons">
          {page > 0 && <button className="prev-page-btn" onClick={() => changePage(page - 1)}>
            <FaAngleDoubleLeft />
          </button>}
          {/* prev */}
          {sorted.map((_, index) => {
            return (
              <button
                onClick={() => changePage(index)}
                key={index}
                className={`page-btn ${page === index && `page-btn-current`}`}
              >
                {index + 1}
              </button>
            )
          })}
          {/* next */}
          {page < sorted.length - 1 && <button className="next-page-btn" onClick={() => changePage(page + 1)}>
            <FaAngleDoubleRight />
          </button>}
        </article>}
      </Fragment>
    )
  } else {
    return (
      <h3 className="search-errors">unfortunately your search query did not return any products</h3>
    )
  }
}

export default PageProduct
