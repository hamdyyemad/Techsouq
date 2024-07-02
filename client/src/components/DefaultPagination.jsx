import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import i18n from "../i18n.js";
export default function DefaultPagination({
  activePage,
  totalPages,
  onPageChange,
}) {
  const [active, setActive] = React.useState(activePage);
  const { t } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  React.useEffect(() => {
    // Update the active state when the prop changes
    setActive(activePage);
  }, [activePage]);
  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "white ",
    onClick: () => {
      setActive(index);
      onPageChange(index);
    },
  });

  const next = () => {
    if (active === totalPages) return;

    setActive(active + 1);
    onPageChange(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
    onPageChange(active - 1);
  };

  if (!totalPages) return;

  return (
    <div className="flex items-center gap-4 mx-auto ">
      <Button
        variant="text"
        className="flex items-center gap-2 dark:text-white"
        onClick={prev}
        disabled={active === 1}
      >
        {isRTL ? (
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        ) : (
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 " />
        )}

        {t("filter.previous")}
      </Button>
      <div className="flex items-center gap-2 xs:hidden">
        {[...Array(totalPages).keys()].map((index) => (
          <IconButton
            className="dark:text-white"
            key={index}
            {...getItemProps(index + 1)}
          >
            {index + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 dark:text-white"
        onClick={next}
        disabled={active === totalPages || !totalPages}
      >
        {t("filter.next")}
        {isRTL ? (
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 " />
        ) : (
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
