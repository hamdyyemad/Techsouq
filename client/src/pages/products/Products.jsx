import { useLoaderData, Await, useParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import EcommerceCard from "../../components/EcommerceCard";
import ProductsNavbar from "../../components/ProductsNavbar";
import CustomSpinner from "../../components/CustomSpinner";
import DefaultPagination from "../../components/DefaultPagination";
import Filter from "../../components/Filter";
export default function Products() {
  // const [pageNumber] = useState(1);

  const params = useParams();
  const [selectedFilters, setSelectedFilters] = useState({ brand: [] });

  const { pageNumber, keyword } = params;
  const dataPromise = useLoaderData(pageNumber, keyword);

  const navigate = useNavigate();
  const handlePageChange = (newPage) => {
    // Update the URL with the new page number
    const sortQuery = new URLSearchParams(window.location.search).get("sort");
    const queryString = createQueryString(selectedFilters);
    console.log(queryString);
    console.log(queryString);
    const newQueryString = keyword
      ? `/products/search/${keyword}/page/${newPage}${
          sortQuery ? `?sort=${sortQuery}` : "?"
        }${queryString}`
      : `/products/page/${newPage}${
          sortQuery ? `?sort=${sortQuery}` : "?"
        }${queryString}`;

    navigate(newQueryString);
  };

  const createQueryString = (filters) => {
    const queryString = Object.entries(filters)
      .map(([filterId, values]) => {
        if (values?.length > 0) {
          return `${filterId}=${values?.join(",")}`;
        }
        return null;
      })
      .filter(Boolean)
      .join("&");

    return queryString ? `${queryString}` : "";
  };
  const handleSortOptionClick = (sortValue) => {
    const queryString = createQueryString(selectedFilters);

    const newQueryString = keyword
      ? `/products/search/${keyword}/page/${pageNumber}?sort=${sortValue}${
          queryString ? `&${queryString}` : ""
        }`
      : `/products/page/${pageNumber}?sort=${sortValue}${
          queryString ? `&${queryString}` : ""
        }`;
    navigate(newQueryString);
  };

  if (dataPromise.message === "Failed to fetch") {
    throw new Error("Please re-connect to the internet.");
  }
  return (
    <section className="dark:bg-[#1C1E2D] w-full">
      <div className="pt-6">
        <ProductsNavbar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10 p-5">
        <div className="lg:col-span-1">
          <Filter
            handleSortOptionClick={handleSortOptionClick}
            pageNumber={pageNumber}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            createQueryString={createQueryString}
          />
        </div>
        <div className="md:col-span-3 lg:col-span-3 grid grid-cols-3 xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6 gap-6 max-w-full">
          <React.Suspense fallback={<CustomSpinner />}>
            <Await resolve={dataPromise.products}>
              {(products) => {
                return products?.map((product) => {
                  return (
                    <div className="py-1" key={product._id}>
                      <EcommerceCard
                        key={product._id}
                        product={product}
                        id={product._id}
                      />
                    </div>
                  );
                });
              }}
            </Await>
          </React.Suspense>
        </div>
      </div>
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        <DefaultPagination
          activePage={parseInt(dataPromise.pageInfo.page)}
          totalPages={dataPromise.pageInfo.pages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
