import MarkdownIt from 'markdown-it'
import img from '../images/background.jpg'
import { useState } from 'react'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { Box, Button, Card, IconButton, TextField } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import newsApi from 'src/apis/newsApi'
import { NewsType } from 'src/types'

const mdParser = new MarkdownIt()

const AddNew = () => {
  const user = JSON.parse(localStorage.getItem('USER') || {})
  const [title, setTitle] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [contentMarkdown, setContentMarkdown] = useState('')
  const [contentHTML, setContentHTML] = useState('')
  const handleEditorChange = ({ html, text }: any) => {
    setContentHTML(html)
    setContentMarkdown(text)
  }

  const handleCreateNews = async () => {
    try {
      const data: NewsType = {
        title: title,
        desc: desc,
        img_url: 'loz',
        html: contentHTML,
        content: contentMarkdown,
        user_id: user.user_id,
      }
      console.log('data: ', data)
      const res = await newsApi.create(data)
    } catch (error) {
      console.log('err:  ', error)
    }
  }
  return (
    <>
      <div className="new-infor" style={{ display: 'flex' }}>
        <div className="new_infor-left">
          <Box mt={2}>
            <TextField
              required
              id="outlined-required"
              label="Tiêu đề"
              sx={{ width: 700, marginRight: 4 }}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
          </Box>
          <Box mt={2} mb={2}>
            <TextField
              required
              id="outlined-required"
              label="Mô tả"
              sx={{ width: 700 }}
              onChange={(e) => {
                setDesc(e.target.value)
              }}
            />
          </Box>
        </div>
        <div className="new_infor-right">
          <Button variant="contained" component="label" style={{ marginLeft: 16 }}>
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          <IconButton color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
        </div>
      </div>
      <MdEditor
        className="markdown"
        style={{ height: '650px' }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
        value={contentMarkdown}
      />
      <div className="button" style={{ marginTop: 12 }}>
        <Button variant="contained" sx={{ width: 120 }} onClick={handleCreateNews}>
          Save
        </Button>
        <Button variant="outlined" sx={{ width: 120, marginLeft: 2 }} onClick={() => {}}>
          Cancel
        </Button>
      </div>
    </>
  )
}

export default AddNew
