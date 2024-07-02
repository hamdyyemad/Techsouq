import { Typography } from "@material-tailwind/react";
import { useGetCategoryQuery } from "../../slices/productsApiSlice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import FadeInSection from "../FadeInSection";
export default function Category() {
  const { t } = useTranslation();
  const { data } = useGetCategoryQuery();
  const subCategories = data?.data?.listOfCategories;
  const products = subCategories?.map((el, i) => {
    //           {t("categories.categories")}
    return {
      id: el._id,
      name: t(`categories.${el.name}`),
      imageAlt: t(`categories.${el.name}`),
      imageSrc: `/assets/header-${i + 1}.jpg`,
      href: el.name,
    };
  });

  return (
    <section className="xs:py-12">
      <Typography
        variant="h3"
        color="blue-gray"
        className={
          i18n.dir() === "rtl"
            ? "rtl mr-10 pr-10 mt-12 mb-2 text-3xl md:text-2xl lg:text-3xl dark:text-white xs:m-0 xs:pr-5"
            : "ml-10 pl-10 mt-12 mb-2 text-3xl md:text-2xl lg:text-3xl dark:text-white xs:m-0 xs:pl-5"
        }
      >
        {t("categories.categories")}
      </Typography>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <Link
              key={product.id}
              to={`/products/page/1/?category=${encodeURIComponent(
                product.href
              )}`}
              className="group duration-500 hover:scale-105 hover:shadow-xl"
            >
              <FadeInSection>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700 dark:text-white">
                  {product.name}
                </h3>
              </FadeInSection>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
