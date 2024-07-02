import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import i18n from "../../i18n";

export default function StoreFront() {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden bg-white dark:bg-[#151725] border-b dark:border-0 animate-fade-right animate-once animate-duration-300 animate-delay-[600ms] xs:border-b-0">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40 xs:pb-32">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div
            className={i18n.dir() === "rtl" ? "rtl sm:max-w-lg" : "sm:max-w-lg"}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-200">
              {t("homepage.hero")}
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              {t("homepage.hero_details")}
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div
                  // sm:right-1/2 sm:top-0 sm:translate-x-8 lg:right-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-20
                  className={
                    i18n.dir() === "rtl"
                      ? "rtl absolute transform lg:right-1/4 lg:top-0 lg:translate-x-20 xs:hidden"
                      : "absolute transform lg:left-1/4 lg:top-0 lg:-translate-x-20 xs:hidden "
                  }
                >
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-100 w-100 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="/assets/header-4.png"
                          alt="Homepage Hero"
                          className={
                            i18n.dir() === "rtl"
                              ? "h-full w-full object-cover object-center "
                              : "h-full w-full object-cover object-center -scale-x-100"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/products/page/1"
                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
                {t("homepage.shop_now")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
