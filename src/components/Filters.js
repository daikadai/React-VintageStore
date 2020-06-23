import React from 'react'
import { ProductContext } from '../context/products'

const Filters = () => {
  const {
    filters: { search, category, shipping, price },
    updateFilters,
    sorted } = React.useContext(ProductContext)
  return (
    <section className="filters-section">
      <h2 className="section-title">search products</h2>
      <form className="filters-form">
        <div>
          {/* search input */}
          <div className="form-group">
            <label htmlFor="search">search term</label>
            <input type="text" name="search" id="search" value={search} onChange={updateFilters} className="form-control" />
          </div>
          {/* select category */}
          <div className="form-group">
            <label htmlFor="category">category</label>
            <select name="category" id="category" onChange={updateFilters} className="form-control">
              <option value="all">all</option>
              <option value="samsung">samsung</option>
              <option value="apple">apple</option>
              <option value="nokia">nokia</option>
            </select>
          </div>
          <div className="form-group">
            <input type="checkbox" name="shipping" id="shipping" checked={shipping} onChange={updateFilters} />
            <label htmlFor="shipping">free shipping</label>
          </div>
        </div>
        <div className="price-group">
          <p>price</p>
          <label>
            <input type="radio" name="price" value="all" checked={price === 'all'} onChange={updateFilters} />
            all
          </label>
          <label>
            <input type="radio" name="price" value="0" checked={price === 0} onChange={updateFilters} />
            $0 - $300
          </label>
          <label>
            <input type="radio" name="price" value="300" checked={price === 300} onChange={updateFilters} />
            $300 - $650
          </label>
          <label>
            <input type="radio" name="price" value="650" checked={price === 650} onChange={updateFilters} />
           Over $650
          </label>
        </div>
      </form>
      <h6>total products: {sorted.flat().length}</h6>
      <hr />
    </section>
  )
}

export default Filters
