import MarkdownIt from 'markdown-it'
import img from '../images/background.jpg'
import { useState } from 'react'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { Box, Button, Card, IconButton, TextField } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'

import { listNews } from './NewsPage'

const mdParser = new MarkdownIt()

const MarkdownEdit = () => {
  const [contentMarkdown, setContentMarkdown] = useState()
  const [contentHTML, setContentHTML] = useState()
  const handleEditorChange = ({ html, text }: any) => {
    setContentHTML(html)
    setContentMarkdown(text)
  }
  console.log('CHECK', contentHTML)
  return (
    <>
      <Card>
        <Box mt={2}>
          <TextField required id="outlined-required" label="Tiêu đề" defaultValue="Title" />
          <Button variant="contained" component="label" style={{ marginLeft: 16 }}>
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          <IconButton color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
        </Box>
        <Box mt={2} mb={2}>
          <TextField required id="outlined-required" label="Mô tả" defaultValue="Title" />
        </Box>

        <MdEditor
          className="markdown"
          style={{ height: '700px' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
          value={contentMarkdown}
        />
      </Card>
    </>
  )
}

export default MarkdownEdit
