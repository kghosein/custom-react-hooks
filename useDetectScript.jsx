// this hooks is to detect your matching script as you type
// it will match script from first character instance only (provided its a valid language letter)

import { useState, useEffect } from "react"

// handle cases here for different scripts here, use their regex
const cases = [
  "^[\u0600-\u06FF\u0698\u067E\u0686\u06AF]+$" // abjad script
]

export const useDetectScript = (str) => {
  const [isMatchingScript, setIsMatchingScript] = useState(() => null)

  useEffect(() => {
    if (str.length > 0) {
      // get first character if its an alphabet or letter from any language
      const firstChar = Array.from(str).find(char => char.trim() && isNaN(char) && /\p{Letter}/u.test(char)) || ""

      if (firstChar) {
        const isMatch = cases.some(pattern => new RegExp(pattern).test(firstChar))
        setIsMatchingScript(isMatch)
      } else {
        setIsMatchingScript(false)
      }
    } else {
      setIsMatchingScript(false)
    }
  }, [str])

  return { isMatchingScript }
}

// usage
// for example you have an input field and you want to know if you are typing language that uses abjad script
// const [fieldContent, setFieldContent] = useState(() => "") // considering `fieldContent` will have your realtime input field values
// const [isAbjadScript, setIsAbjadScript] = useState(() => null)
// const { isMatchingScript: abjadScript } = useDetectScript(fieldContent)

// useEffect(() => {
//   if (fieldContent) {
//     setIsAbjadScript(abjadScript)
//   }
// }, [fieldContent, abjadScript])