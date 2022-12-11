import { Button } from '@mui/material'
import MarkdownIt from 'markdown-it'
import { useState } from 'react'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
const mdParser = new MarkdownIt()

const NewsPage = () => {
  const [contentMarkdown, setContentMarkdown] = useState()
  const [contentHTML, setContentHTML] = useState()

  const handleEditorChange = ({ html, text }: any) => {
    setContentHTML(html)
    setContentMarkdown(text)
    console.log(contentMarkdown)
  }
  return (
    <>
      <MdEditor
        className="markdown"
        style={{ height: '700px' }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
        value={contentMarkdown}
      />
      <div
        className="doctor_specialty"
        dangerouslySetInnerHTML={contentHTML ? { __html: contentHTML } : undefined}
      ></div>
      <Button style={{ width: 120 }}>Save</Button>
    </>
  )
}

export default NewsPage
