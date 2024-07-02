import { defer } from "react-router-dom";
import { BASE_URL } from "../constants";
export default async function productsLoader({ params, request }) {
  // products
  try {
    const pageNumber = params.pageNumber;
    const keyword = params.keyword;
    const u = new URL(request.url);
    const sort = u.searchParams.get("sort");
    let brand = u.searchParams.get("brand");
    let category = u.searchParams.get("category");
    // const searchParams = new URLSearchParams(document.location.search);

    // Get all query parameters as an object
    brand = brand ? brand[0].toUpperCase() + brand.slice(1) : "";
    // category = category ? category[0].toUpperCase() + category.slice(1) : "";

    const limit = 6; // Set the same limit as in the backend
    const baseURL = `${BASE_URL}/products?pageNumber=${pageNumber}&limit=${limit}`;
    const queryParams = [];
    console.log(category);
    if (keyword) queryParams.push(`keyword=${encodeURIComponent(keyword)}`);
    if (sort) queryParams.push(`sort=${encodeURIComponent(sort)}`);
    if (brand) queryParams.push(`brand=${encodeURIComponent(brand)}`);
    if (category) queryParams.push(`category=${encodeURIComponent(category)}`);
    console.log(queryParams);
    const url = `${baseURL}${
      queryParams.length > 0 ? `&${queryParams.join("&")}` : ""
    }`;

    const res = await fetch(url);

    if (!res.ok) {
      throw {
        message: "Failed to fetch products",
        statusText: res.statusText,
        status: res.status,
      };
    }
    const obj = await res.json();

    const { data } = obj;

    const products = data.products;
    return defer({
      products,
      pageInfo: {
        page: obj.page,
        pages: obj.pages,
        numOfProducts: obj.numOfProducts,
      },
    });
  } catch (err) {
    return {
      message: err.message,
      statusText: err.statusText,
      status: err.status,
    };
  }
}
