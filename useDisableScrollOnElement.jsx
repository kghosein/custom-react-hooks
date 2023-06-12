import { useEffect, useRef } from "react"

export const useDisableScrollOnElement = () => {
  const ref = useRef(null)

  useEffect(() => {
    const disableScroll = (e) => {
      e.preventDefault()
    }

    const targetDiv = ref.current

    if (targetDiv) {
      const handleWheel = disableScroll
      const handleTouchMove = disableScroll

      // you can add events here
      targetDiv.addEventListener("wheel", handleWheel, { passive: false })
      targetDiv.addEventListener("touchmove", handleTouchMove, { passive: false })

      return () => {
        targetDiv.removeEventListener("wheel", handleWheel)
        targetDiv.removeEventListener("touchmove", handleTouchMove)
      }
    }
  }, [ref])

  return { ref }
}

// usage
// const { ref } = useDisableScrollOnElement()
// <div ref={ref} />