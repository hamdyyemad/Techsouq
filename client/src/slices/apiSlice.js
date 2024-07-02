import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: (headers, { getState, endpoint }) => {
      // Add your logic to get the user token from the Redux state
      // Replace 'user.token.access' with the correct path to your token
      console.log("Preparing headers...");
      if (getState().auth.userInfo) {
        const user = getState().auth.userInfo;
        const { id, token, role } = user;
        if (user.role === "ADMIN") {
          headers.set("Authorization", `Bearer ${token}`);
        } else if (user && endpoint !== "refresh") {
          headers.set("Authorization", `Bearer ${token}`);
        }
        // Optionally, you can include additional headers
        headers.set("User-ID", id);
        headers.set("User-Role", role);
        return headers;
      }
    },
    credentials: "include", // This allows the server to set cookies
  }),
  tagTypes: ["Product", "Order", "User"],
  endpoints: () => ({}),
});
