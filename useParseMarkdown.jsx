import frontMatter from "front-matter"
import { useCallback, useEffect } from "react"
import { useState } from "react"

export const useParseMarkdown = (mdFilePath) => {
  const [content, setContent] = useState(() => "")
  const [frontmatter, setFrontmatter] = useState(() => "")

  const fetchMarkdown = useCallback(async () => {
    try {
      const response = await fetch(mdFilePath)
      const markdownContent = await response.text()
      const { attributes, body } = frontMatter(markdownContent)
      setFrontmatter(attributes) // markdown frontMatter
      setContent(body) // markdown content
    } catch (err) {
      console.log(err, "error parsing markdown")
    }
  }, [mdFilePath])

  useEffect(() => {
    fetchMarkdown()
  }, [fetchMarkdown])

  return {
    content,
    frontmatter,
  }
}

// usage
// ** Note: If you are using Vite 
// markdown imports are allowed from `public` dir only 
// so put your markdown files in under `markdown` folder in `public` dir in case of Vite
// but in case of CRA you can import from anywhere in your app

// here we have used `markdown-to-jsx` library to render markdown but you are open to use any markdown rendering library

// const mdFilePath = "/markdown/markdown.md" // vite import markdown
// const { content, frontmatter } = useParseMarkdown(mdFilePath)
// ...
// <p>{frontmatter?.title}</p> // assuming you have `title` in your markdown frontmatter
// <Markdown> 
//   {content}
// </Markdown>