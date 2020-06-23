import React, { Fragment } from "react";
import { ProductContext } from "../context/products";
import Loading from "../components/Loading";
import Filters from "../components/Filters";
import PageProduct from "../components/PageProduct";

export default function Products() {
  const { loading, sorted } = React.useContext(ProductContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <Filters />
      <PageProduct />
    </Fragment>
  )
}


