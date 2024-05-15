import { useEffect, useState } from "react"
import { getLangDir } from "rtl-detect"

// *** Use one of the hooks

// *** using `franc` library ***
import { franc } from "franc"
import langs from "langs"

// handle cases here
const francToIso639_2 = {
  arb: "ara", // arabic
  prs: "fas" // persian
}

export const useDetectLang = (str) => {
  const [localeLang, setLocaleLang] = useState(() => null)

  useEffect(() => {
    try {
      // get iso639_2 code of the locale text
      let detectLang = franc(str)

      // in some cases franc might return a different iso639_2 code 
      // so we have to convert that to appropriate iso639_2 code 
      // see codes here https://www.loc.gov/standards/iso639-2/php/code_list.php
      // handle cases in francToIso639_2 object
      let iso639_2 = francToIso639_2[detectLang] || detectLang

      // get lang info from iso639_2 code
      let iso639_1 = langs.where("2T", iso639_2)

      // get lang direction
      let langDir = getLangDir(iso639_1[1])

      // add langDir to iso639_1 object
      iso639_1.langDir = langDir

      setLocaleLang(iso639_1)
    } catch (err) {
      console.log("unable to detect text language")
    }
  }, [str])

  return { localeLang }
}

// *** using `languagedetect` library ***
import LanguageDetect from "languagedetect"

export const useDetectLang = (str) => {
  const [localeLang, setLocaleLang] = useState(() => "")
  const [langDir, setLangDir] = useState(() => "")
  const lngDetector = new LanguageDetect()

  useEffect(() => {
    try {
      // get iso639_2 code of the locale text
      // see lang codes here https://www.loc.gov/standards/iso639-2/php/code_list.php
      lngDetector.setLanguageType("iso2")
      let detectLang = lngDetector.detect(str, 1)
      let textLang = detectLang[0][0]

      // get lang direction
      let langDir = getLangDir(textLang)

      setLocaleLang(textLang)
      setLangDir(langDir)
    } catch (err) { }
  }, [str])

  return { localeLang, langDir }
};

// usage 
// *** hook usage ***
// const text = "Direction can be described in relative terms that compare the position of something to another object, such as up, down, in, out, left, right, forward, backward, or sideways."
// const { localeLang } = useDetectLang(text)
// console.log(localeLang)
// *** LocaleProvider component ***
// const LocaleProvider = ({ content }) => {
//   const { localeLang, langDir } = useDetectLang(content)
//   return (
//     <p
//       data-locale-lang={localeLang ? localeLang : null}
//       data-lang-dir={langDir ? langDir : null}
//     >
//       {content}
//     </p>
//   )
// }
