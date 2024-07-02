import React from "react";

export default function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();

  const handleIntersection = React.useCallback(
    (entries) => {
      entries.forEach((entry) => {
        setVisible(entry.isIntersecting);
      });
    },
    [setVisible]
  );

  React.useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0.5],
      rootMargin: "0px",
    });

    const { current } = domRef;
    observer.observe(current);

    return () => {
      observer.unobserve(current);
    };
  }, [handleIntersection]);

  return (
    <div
      className={`fade-in-section ${
        isVisible
          ? "animate-fade-right animate-once animate-duration-300 animate-delay-[600ms]"
          : ""
      }`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}
