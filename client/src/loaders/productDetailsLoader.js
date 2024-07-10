import axios from "axios";
import { BASE_URL } from "../constants";
export default async function productDetailsLoader({ params }) {
  const url1 = `${BASE_URL}/products/${params.id}`;
  const url2 = `${BASE_URL}/products/seller/product/${params.id}`;

  try {
    // First URL
    const response1 = await axios.get(url1);
    const { data } = response1.data;
    //
    const product = data.product;
    return product;
  } catch (error1) {
    try {
      // Second URL
      const response2 = await axios.get(url2);
      const { data } = response2.data;
      //
      const product = data.product;
      return product;
    } catch (error2) {
      // If both requests fail
      throw {
        message: "Failed to fetch product",
        statusText1: error1.response.statusText,
        status1: error1.response.status,
        statusText2: error2.response.statusText,
        status2: error2.response.status,
      };
    }
  }
}
