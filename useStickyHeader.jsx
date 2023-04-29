import { useState, useEffect } from "react"
import throttle from "lodash.throttle"

export const useStickyHeader = (scrollFromTop) => {
  const [isVisible, setIsVisible] = useState(() => false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.pageYOffset > scrollFromTop) {
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

  return isVisible
}