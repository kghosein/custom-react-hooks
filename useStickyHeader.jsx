import { useState, useEffect } from "react"
import throttle from "lodash.throttle"

export const useStickyHeader = (scrollFromTop) => {
  const [isVisible, setIsVisible] = useState(() => false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > scrollFromTop) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }, 200)

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return { isVisible } // isVisible will return boolean value
}

// usage
// const { isVisible } = useStickyHeader(100) // 100 is threshold 