// products context
import React from 'react';
import axios from 'axios';
import url from '../utils/URL';
import { featuredProducts } from '../utils/helpers';
export const ProductContext = React.createContext();

// Provider, Consumer

export default function ProductProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`)
      .then(response => {
        const featured = featuredProducts(response.data);
        setProducts(response.data);
        setFeatured(featured);
        setLoading(false);
        console.log(response.data);

      });
    return () => {

    }
  }, [])

  return (
    <ProductContext.Provider value={{ products, loading, featured }}>
      {children}
    </ProductContext.Provider>
  )
}