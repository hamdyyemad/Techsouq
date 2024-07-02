import { useGetProductsPaginateQuery } from "../../slices/productsApiSlice";
import EcommerceCard from "../EcommerceCard";
import AliceCarousel from "react-alice-carousel";
import CustomSpinner from "../CustomSpinner";
import ErrorComponent from "../ErrorComponent";
import "react-alice-carousel/lib/alice-carousel.css";
const handleDragStart = (e) => e.preventDefault();
const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
  1200: { items: 4 },
  1700: { items: 5 },
};

export default function LatestProducts() {
  const { data, isLoading, error } = useGetProductsPaginateQuery();
  const newArrival = true;
  const products = data?.data.products || [];

  return (
    <>
      {isLoading ? (
        <CustomSpinner />
      ) : error ? (
        <ErrorComponent error={error} />
      ) : (
        <>
          <AliceCarousel
            disableButtonsControls={true}
            infinite
            mouseTracking
            controlsStrategy="alternate"
            responsive={responsive}
            items={products?.map((product, i) => (
              <div
                onDragStart={handleDragStart}
                role="presentation"
                key={product._id}
                className="w-full min-h-full pb-5 animate-fade-right animate-once animate-duration-300 animate-delay-[600ms]"
                data-value={`${i}`}
              >
                <EcommerceCard
                  product={product}
                  id={product._id}
                  newArrival={newArrival}
                />
              </div>
            ))}
          />
          {/* {} */}
        </>
      )}
    </>
  );
}
