import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  // Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetBrandsQuery } from "../slices/productsApiSlice.js";
import CustomSpinner from "../components/CustomSpinner";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Filter({
  handleSortOptionClick,
  pageNumber,
  selectedFilters,
  setSelectedFilters,
  createQueryString,
  // concatenateQueryString,
}) {
  const { t } = useTranslation();
  const { data, isLoading: brandsLoading } = useGetBrandsQuery();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const navigate = useNavigate();
  const brandData = data?.data?.listOfBrands;
  // Function to extract filter values from the URL
  const filters = [
    {
      id: "brand",
      name: t("filter.brand"),
      options: brandData
        ? brandData?.map((brand) => ({
            value: brand.name,
            label: brand.name,
            checked: false,
          }))
        : [
            { value: "Apple", label: "Apple", checked: false },
            { value: "Cannon", label: "Cannon", checked: false },
            { value: "Sony", label: "Sony", checked: false },
            { value: "Logitech", label: "Logitech", checked: false },
            { value: "Amazon", label: "Amazon", checked: false },
          ],
    },
  ];

  const getFilterValuesFromUrl = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const filterValuesFromUrl = {};

    for (const [key, value] of urlSearchParams.entries()) {
      // Assuming filters have specific keys in the URL, e.g., "brand", "color", etc.
      // Update this condition based on your URL structure
      if (filters.find((filter) => filter.id === key)) {
        filterValuesFromUrl[key] = value.split(",");
      }
    }

    return filterValuesFromUrl;
  };

  const sortOptions = [
    // { name: t("filter.most_popular"), value: "-createdAt" },
    { name: t("filter.best_rating"), value: "-rating" }, // Replace "rating" with your actual field
    { name: t("filter.newest"), value: "-createdAt" },
    { name: t("filter.price_low_to_high"), value: "price" }, // Replace "price" with your actual field
    { name: t("filter.price_high_to_low"), value: "-price" }, // Replace "price" with your actual field
  ];

  const subCategories = [
    { name: t("categories.Laptops"), to: "Laptops" },
    { name: t("categories.TV & Video"), to: "TV & Video" },
    { name: t("categories.Headphones"), to: "Headphones" },
    { name: t("categories.Gaming Accessories"), to: "Gaming Accessories" },
    { name: t("categories.Mobiles & Tablets"), to: "Mobiles & Tablets" },
    { name: t("categories.Smartwatches"), to: "Smartwatches" },
  ];

  const filterValuesFromUrl = getFilterValuesFromUrl();

  const handleFilterChange = (e, filterId, value) => {
    e.preventDefault();
    const sortQuery = new URLSearchParams(window.location.search).get("sort");
    const updatedFilters = { ...selectedFilters, [filterId]: [value] };

    console.log(updatedFilters);
    setSelectedFilters(updatedFilters);
    // Update the URL with the selected filters
    const baseUrl = `/products/page/${pageNumber}`;
    const queryString = createQueryString(updatedFilters);
    const updatedUrl = `${baseUrl}${sortQuery ? `?sort=${sortQuery}` : "?"}${
      queryString ? (sortQuery ? `&${queryString}` : queryString) : ""
    }`;
    console.log(updatedUrl);
    navigate(updatedUrl);
  };

  const handleClearFilters = () => {
    // Clear all selected filters
    const clearedFilters = {};
    filters.forEach((section) => {
      clearedFilters[section.id] = [];
    });

    setSelectedFilters(clearedFilters);

    // Update the URL with the cleared filters
    const baseUrl = `/products/page/${pageNumber}`;
    const sortQuery = new URLSearchParams(window.location.search).get("sort");
    const updatedUrl = `${baseUrl}${sortQuery ? `?sort=${sortQuery}` : ""}`;

    navigate(updatedUrl);
  };

  const handleRadioChange = (filterId, value) => {
    const sortQuery = new URLSearchParams(window.location.search).get("sort");
    const updatedFilters = { ...selectedFilters, [filterId]: [value] };

    setSelectedFilters(updatedFilters);

    // Update the URL with the selected filters
    const baseUrl = `/products/page/${pageNumber}`;
    const queryString = createQueryString(updatedFilters);
    const updatedUrl = `${baseUrl}${sortQuery ? `?sort=${sortQuery}` : "?"}${
      queryString ? (sortQuery ? `&${queryString}` : queryString) : ""
    }`;

    console.log(updatedUrl);
    navigate(updatedUrl);
  };

  return (
    <div className="bg-white dark:bg-[#151725]">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as="div"
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25 " />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex ">
              <Transition.Child
                as="div"
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                {brandsLoading && <CustomSpinner />}
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl dark:bg-[#1C1E2D]">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 dark:bg-[#1C1E2D]"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900 dark:text-white"
                    >
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <button
                            // to={`/products/page/1/?category=${category.to}`}
                            onClick={(e) =>
                              handleFilterChange(
                                e,
                                "category",
                                encodeURIComponent(category.to)
                              )
                            }
                            className="block px-2 py-3 "
                          >
                            {category.name}
                          </button>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500 dark:bg-[#1C1E2D]">
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5 "
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            {/* mobile */}
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      defaultChecked={option.checked}
                                      type="radio"
                                      checked={
                                        selectedFilters[section.id][0] ===
                                          option.value ||
                                        (
                                          filterValuesFromUrl[section.id] || []
                                        ).includes(option.value)
                                      }
                                      onChange={() =>
                                        handleRadioChange(
                                          section.id,
                                          option.value
                                        )
                                      }
                                      // defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 "
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500 dark:text-white"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                              <button
                                type="button"
                                className="mt-4  border-gray-300 text-red-600 focus:ring-red-500"
                                onClick={handleClearFilters}
                              >
                                <div className="flex justify-between items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-ban"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0" />
                                  </svg>
                                  <span
                                    className="ml-3  text-gray-600 dark:text-white"
                                    style={{ whiteSpace: "nowrap" }}
                                  >
                                    Clear
                                  </span>
                                </div>
                              </button>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {t("filter.new_arrivals")}
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-white">
                    {t("filter.sort")}
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 "
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-[#1C1E2D]">
                    <div className="py-1">
                      {sortOptions?.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={() =>
                                handleSortOptionClick(option.value)
                              } // Update this line
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900 "
                                  : "text-gray-500 ",
                                active ? "bg-gray-100 dark:bg-[#151725]" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              {/* <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7 "
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button> */}
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden "
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <button
                        // to={`/products/page/1/?category=${encodeURIComponent(
                        //   category.to
                        // )}`}
                        onClick={(e) =>
                          handleFilterChange(
                            e,
                            "category",
                            encodeURIComponent(category.to)
                          )
                        }
                        className="whitespace-nowrap"
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500 dark:bg-[#151725] ">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  type="radio"
                                  checked={
                                    selectedFilters[section.id][0] ===
                                      option.value ||
                                    (
                                      filterValuesFromUrl[section.id] || []
                                    ).includes(option.value)
                                  }
                                  onChange={() =>
                                    handleRadioChange(section.id, option.value)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mx-1"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            className="mt-3 border-gray-300 text-red-600 focus:ring-red-500"
                            onClick={handleClearFilters}
                          >
                            <div className="flex justify-between items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-ban"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0" />
                              </svg>
                              <span
                                className="ml-3  text-gray-600 dark:text-white mr-2"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                {t("filter.clear")}
                              </span>
                            </div>
                          </button>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">{/* Your content */}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
