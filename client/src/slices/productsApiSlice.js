import { apiSlice } from "./apiSlice";
import { BASE_URL } from "../constants";
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder, token) => ({
    getProducts: builder.query({
      query: () => ({
        url: `${BASE_URL}/products/all`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getProductsPaginate: builder.query({
      query: () => ({
        url: `${BASE_URL}/products`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId, token) => ({
        url: `${BASE_URL}/products/${productId}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/products`,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/products/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/products/${id}`,
        method: "DELETE",
      }),
    }),
    getSellerProducts: builder.query({
      query: () => ({
        url: `${BASE_URL}/products/seller/all`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getSellerAcceptedProducts: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/products/seller/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getSellerPendingProducts: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/products/seller/pending/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/uploads`,
        method: "POST",
        body: data,
      }),
    }),
    getBrands: builder.query({
      query: () => ({
        url: `${BASE_URL}/brands`, // Adjust the URL accordingly
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getBrandDetails: builder.query({
      query: (brandId) => ({
        url: `${BASE_URL}/brands/${brandId}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getCategory: builder.query({
      query: () => ({
        url: `${BASE_URL}/categories`, // Adjust the URL accordingly
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getCategoryDetails: builder.query({
      query: (categoryId) => ({
        url: `${BASE_URL}/categories/${categoryId}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsPaginateQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetSellerAcceptedProductsQuery,
  useGetSellerPendingProductsQuery,
  useGetSellerProductsQuery,
  useUploadProductImageMutation,
  useGetBrandsQuery,
  useGetBrandDetailsQuery,
  useGetCategoryQuery,
  useGetCategoryDetailsQuery,
} = productsApiSlice;
