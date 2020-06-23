// products context
import React from 'react';
import axios from 'axios';
import url from '../utils/URL';
import { featuredProducts, flattenProducts, paginate } from '../utils/helpers';
export const ProductContext = React.createContext();

// Provider, Consumer

export default function ProductProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);

  // Extra State Value
  const [sorted, setSorted] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [filters, setFilters] = React.useState({
    search: "",
    category: "all",
    shipping: false,
    price: 'all'
  });

  React.useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`)
      .then(response => {
        const featured = featuredProducts(flattenProducts(response.data));
        const products = flattenProducts(response.data);

        setSorted(paginate(products));
        setProducts(products);
        setFeatured(featured);
        setLoading(false);
        console.log(products);

      });
    return () => {

    }
  }, [])

  const changePage = index => {
    setPage(index);
  }

  const updateFilters = e => {
    const type = e.target.type;
    const filter = e.target.name;
    const value = e.target.value;
    let filterValue;
    if (type === 'checkbox') {
      filterValue = e.target.checked
    } else if (type === 'radio') {
      value === 'all' ? (filterValue = value) : (filterValue = parseInt(value))
    } else {
      filterValue = value;
    }
    setFilters({ ...filters, [filter]: filterValue });
  }

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      featured,
      sorted,
      page,
      filters,
      changePage,
      updateFilters
    }}>
      {children}
    </ProductContext.Provider>
  )
}