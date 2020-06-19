import React, { useState } from "react";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";
import { useHistory } from "react-router-dom";
import EmptyCart from "../components/Cart/EmptyCart";
import { injectStripe, StripeProvider, Elements, CardElement } from "react-stripe-elements";

function Checkout(props) {
  const { cart, total, clearCart } = React.useContext(CartContext);
  const { user, showAlert, hideAlert, alert } = React.useContext(UserContext);
  const history = useHistory();
  // state values
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const isEmpty = !name || alert.show;
  async function handleSubmit(e) {
    showAlert({ msg: 'submitting order... please wait' });
    e.preventDefault();
    const response = await props.stripe.createToken().catch(error => console.log(error))

    const { token } = response;
    if (token) {
      console.log(response);

    } else {
      hideAlert();
      setError(response.error.message);
    }
  }
  if (cart.length < 1) return <EmptyCart />;

  return (
    <section className="section form">
      <h2 className="section-title">checkout</h2>
      <form className="checkout-form">
        <h3>order total: <span>${total}</span></h3>
        <div className="form-control">
          <label htmlFor="name">name</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        {/* cart element */}
        <div className="stripe-input">
          <label htmlFor="cart-element">Credit or Debit Cart</label>
          <p className="stripe-info">
            Test using this credit cart: <span>4242 4242 4242 4242</span>
            <br />
            enter any 5 digits for the zip code
            <br />
            enter any 3 digits for the CVC
          </p>
        </div>
        {/* stripe element */}
        <CardElement className="card-element"></CardElement>
        {/* stripe errors */}
        {error && <p className="form-empty">{error}</p>}

        {isEmpty ? <p className="form-empty">please fill out name field</p> : <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">submit</button>}

      </form>
    </section>
  )
}

const CartForm = injectStripe(Checkout);

const StripeWrapper = () => {
  return (
    <StripeProvider apiKey="pk_test_tlPtSY38cbV9DY1fNEJwZuSv00pZuxrUml">
      <Elements>
        <CartForm></CartForm>
      </Elements>
    </StripeProvider>
  )
}

export default StripeWrapper;