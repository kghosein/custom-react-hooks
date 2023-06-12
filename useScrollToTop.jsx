export const useScrollToTop = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return scrollToTop // this will return scrollToTop function
}

// usage
// const scrollToTop = useScrollToTop()
// <button onClick={scrollToTop} value="button" type="button" /> 