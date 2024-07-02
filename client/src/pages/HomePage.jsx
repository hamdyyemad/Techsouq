import { Suspense } from "react";
import { Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { useRedirect } from "../hooks/useRedirect";
import i18n from "../i18n";

// import HomePageHeader from "../components/homePage/HomePageHeader";
import HomePageBody from "../components/homePage/HomePageBody";
import Brands from "../components/homePage/Brands";
import CustomSpinner from "../components/CustomSpinner";
import StoreFront from "../components/homePage/StoreFront";
import Category from "../components/homePage/Category";
export default function HomePage() {
  useRedirect();

  const { t } = useTranslation();

  return (
    <Suspense fallback={<CustomSpinner />}>
      <StoreFront />
      {/* <HomePageHeader /> */}

      <Typography
        variant="h3"
        color="blue-gray"
        className={
          i18n.dir() === "rtl"
            ? "rtl mr-10 pr-10 mt-12 mb-2 text-3xl md:text-2xl lg:text-3xl dark:text-white xs:m-0 xs:pr-5"
            : "ml-10 pl-10 mt-12 mb-2 text-3xl md:text-2xl lg:text-3xl dark:text-white xs:m-0 xs:pl-5"
        }
      >
        {t("homepage.Latest_Products")}
      </Typography>

      <HomePageBody />

      <Category />

      <Brands />
    </Suspense>
  );
}
