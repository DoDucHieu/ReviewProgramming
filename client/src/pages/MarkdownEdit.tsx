import MarkdownIt from 'markdown-it'
import img from '../images/background.jpg'
import { useState } from 'react'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { Button } from '@mui/material'
const mdParser = new MarkdownIt()

const MarkdownEdit = () => {
  const [contentMarkdown, setContentMarkdown] = useState()
  const [contentHTML, setContentHTML] = useState()
  const handleEditorChange = ({ html, text }: any) => {
    setContentHTML(html)
    setContentMarkdown(text)
  }
  console.log('CECK', contentHTML)
  return (
    <>
      <MdEditor
        className="markdown"
        style={{ height: '700px' }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
        value={contentMarkdown}
      />
    </>
  )
}

export default MarkdownEdit
