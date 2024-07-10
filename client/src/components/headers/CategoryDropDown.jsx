import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";
import { useGetCategoryQuery } from "../../slices/productsApiSlice";
import i18n from "../../i18n";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function CategoryDropDown() {
  const { t } = useTranslation();
  const { data } = useGetCategoryQuery();
  const subCategories = data?.data?.listOfCategories;
  const categories = subCategories?.map((el) => {
    //           {t("categories.categories")}
    return { _id: el._id, name: t(`categories.${el.name}`), href: el.name };
  });

  // {t("register.title")}
  // const categories = [
  //   { name: t(`${subCategories}`), to: "Laptops" },
  //   { name: "TV & Video", to: "TV & Video" },
  //   { name: "Headphones", to: "Headphones" },
  //   { name: "Gaming Accessories", to: "Gaming Accessories" },
  //   { name: "Mobiles & Tablets", to: "Mobiles & Tablets" },
  //   { name: "Smartwatches", to: "Smartwatches" },
  // ];
  return (
    <Menu
      as="div"
      className="relative inline-block text-left m-auto group z-50"
    >
      <div>
        <Menu.Button className="flex  gap-x-1.5 text-sm font-medium w-fit block   dark:text-white dark:after:bg-white ">
          {t("categories.categories")}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
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
        <Menu.Items
          className={`absolute ${
            i18n.dir() === "rtl" ? "right-0 text-right" : "left-0 text-left"
          } z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-opacity duration-300`}
        >
          <div className="py-1">
            {categories?.map((category) => (
              <Menu.Item key={category._id}>
                {({ active }) => (
                  <Link
                    to={`/products/page/1/?category=${encodeURIComponent(
                      category.href
                    )}`}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {category.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
