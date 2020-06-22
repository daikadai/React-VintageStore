// submit order
import axios from 'axios';
import url from '../../src/utils/URL';

const submitOrder = async ({ name, total, items, stripeTokenId, userToken }) => {
  const response = await axios.post(`${url}/orders`, {
    name, total, items, stripeTokenId
  }, {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  }).catch(error => console.log(error))
  console.log(response);

  return response;
}

export default submitOrder
