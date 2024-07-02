// import { Carousel, Typography, Button } from "@material-tailwind/react";
// import { Link } from "react-router-dom";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";
// import i18n from "../../i18n";
// export default function HomePageHeader() {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const { userInfo } = useSelector((state) => state.auth);
//   const { t } = useTranslation();
//   const renderButtons = userInfo ? (
//     <></>
//   ) : (
//     <div
//       className={
//         i18n.dir() === "rtl"
//           ? "rtl flex gap-2 xs:hidden mr-2"
//           : "rtl flex gap-2 xs:hidden"
//       }
//     >
//       {/*  */}
//       <Link to="/register">
//         <Button size="md" color="white">
//           {t("homepage.Sign_up")}
//         </Button>
//       </Link>
//       <Link to="/login">
//         <Button size="md" color="white" variant="text">
//           {t("homepage.Sign_in")}
//         </Button>
//       </Link>
//     </div>
//   );
//   return (
//     <Carousel
//       autoplay={true}
//       loop={true}
//       autoplayDelay={5000}
//       transition={{ type: "tween", duration: 0.3 }}
//     >
//       <div className="relative max-h-[600px] m-auto w-full z-10">
//         <LazyLoadImage
//           src="/assets/header-1.jpg"
//           alt="image 1"
//           className="max-h-[600px] w-full object-cover"
//           onLoad={() => setIsLoaded(true)}
//         />
//         <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
//           <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
//             <Typography
//               variant="h1"
//               color="white"
//               className="mb-4 text-3xl md:text-4xl lg:text-5xl"
//             >
//               Smartphones
//             </Typography>
//             <Typography
//               variant="lead"
//               color="white"
//               className="mb-8 xs:mb-4 text-1xl opacity-80"
//             >
//               It is not so much for its beauty that the forest makes a claim
//               upon men&apos;s hearts, as for that subtle something, that quality
//               of air that emanation from old trees, that so wonderfully changes
//               and renews a weary spirit.
//             </Typography>
//             {renderButtons}
//           </div>
//         </div>
//       </div>
//       <div className="relative max-h-[600px] m-auto w-full z-10">
//         <LazyLoadImage
//           src="/assets/header-2.jpg"
//           alt="image 2"
//           className="max-h-[600px] w-full object-cover"
//           onLoad={() => setIsLoaded(true)}
//         />
//         <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
//           <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
//             <Typography
//               variant="h1"
//               color="white"
//               className="mb-4 text-3xl md:text-4xl lg:text-5xl"
//             >
//               Laptops
//             </Typography>
//             <Typography
//               variant="lead"
//               color="white"
//               className="mb-8 xs:mb-4 text-1xl opacity-80"
//             >
//               It is not so much for its beauty that the forest makes a claim
//               upon men&apos;s hearts, as for that subtle something, that quality
//               of air that emanation from old trees, that so wonderfully changes
//               and renews a weary spirit.
//             </Typography>
//             {renderButtons}
//           </div>
//         </div>
//       </div>
//       <div className="relative max-h-[600px] m-auto w-full z-10">
//         <LazyLoadImage
//           src="/assets/header-3.jpg"
//           alt="image 3"
//           className="max-h-[600px] w-full object-cover"
//           onLoad={() => setIsLoaded(true)}
//         />
//         <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
//           <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
//             <Typography
//               variant="h1"
//               color="white"
//               className="mb-4 text-3xl md:text-4xl lg:text-5xl"
//             >
//               Headphones
//             </Typography>
//             <Typography
//               variant="lead"
//               color="white"
//               className="mb-8 xs:mb-4 text-1xl opacity-80"
//             >
//               It is not so much for its beauty that the forest makes a claim
//               upon men&apos;s hearts, as for that subtle something, that quality
//               of air that emanation from old trees, that so wonderfully changes
//               and renews a weary spirit.
//             </Typography>
//             {isLoaded && <>{renderButtons}</>}
//           </div>
//         </div>
//       </div>
//     </Carousel>
//   );
// }
