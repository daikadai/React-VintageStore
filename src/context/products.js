// products context
import React from 'react';
import axios from 'axios';
import url from '../utils/URL';
import { featuredProducts, flattenProducts } from '../utils/helpers';
export const ProductContext = React.createContext();

// Provider, Consumer

export default function ProductProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);

  // Extra State Value
  const [sorted, setSorted] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [filter, setFilters] = React.useState({
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

        setSorted(products);
        setProducts(products);
        setFeatured(featured);
        setLoading(false);
        console.log(products);

      });
    return () => {

    }
  }, [])

  const changePage = index => {
    console.log(index);
  }

  const updateFilters = e => {
    console.log(e);

  }

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      featured,
      sorted,
      page,
      filter,
      changePage,
      updateFilters
    }}>
      {children}
    </ProductContext.Provider>
  )
}