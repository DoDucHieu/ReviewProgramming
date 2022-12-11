import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import img from '../images/background.jpg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalCustom from 'src/components/ModalCustom'
import MarkdownEdit from './MarkdownEdit'

const listNews = [
  {
    img: img,
    title: 'Công nghệ đa phương tiện',
    description: 'Chia sẻ cách sử dụng adobe premiere',
  },
  {
    img: img,
    title: 'Công nghệ đa phương tiện',
    description: 'Chia sẻ cách sử dụng adobe premiere',
  },
  {
    img: img,
    title: 'Công nghệ đa phương tiện',
    description: 'Chia sẻ cách sử dụng adobe premiere',
  },
  {
    img: img,
    title: 'Công nghệ đa phương tiện',
    description: 'Chia sẻ cách sử dụng adobe premiere',
  },
  {
    img: img,
    title: 'Công nghệ đa phương tiện',
    description: 'Chia sẻ cách sử dụng adobe premiere',
  },
  {
    img: img,
    title: 'Công nghệ đa phương tiện',
    description: 'Chia sẻ cách sử dụng adobe premiere',
  },
  {
    img: img,
    title: 'Công nghệ đa phương tiện',
    description: 'Chia sẻ cách sử dụng adobe premiere',
  },
  {
    img: img,
    title: 'Công nghệ đa phương tiện',
    description: 'Chia sẻ cách sử dụng adobe premiere',
  },
]

const NewsPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const navigate = useNavigate()
  const handleCloseModal = () => {
    setIsOpenModal(false)
  }
  return (
    <>
      {/* <MdEditor
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
      <Button style={{ width: 120 }}>Save</Button> */}
      <ModalCustom children={<MarkdownEdit />} open={isOpenModal} width={1400} onClose={handleCloseModal} />
      <div className="button" style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
        <Button
          variant="contained"
          onClick={() => {
            setIsOpenModal(true)
          }}
        >
          Thêm bài đăng
        </Button>
      </div>
      <h2 style={{ marginBottom: 16 }}>Danh sách các bài đăng về lập trình</h2>
      <div className="listNews" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {listNews.map((item, index) => {
          return (
            <Card
              sx={{ width: 350, margin: 2 }}
              onClick={() => {
                navigate(`${index}`)
              }}
            >
              <CardActionArea>
                <CardMedia component="img" height="140" image={item?.img} alt="green iguana" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item?.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item?.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )
        })}
      </div>
    </>
  )
}

export default NewsPage
