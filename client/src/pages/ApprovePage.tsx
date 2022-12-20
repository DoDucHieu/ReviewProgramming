import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import newsApi from 'src/apis/newsApi'
import { NewsType } from 'src/types'
import img from '../images/background.jpg'

const ApprovePage = () => {
  const navigate = useNavigate()
  const [listNews, setListNews] = useState<NewsType[]>([])

  useEffect(() => {
    handleGetAllWaitingNews()
  }, [])

  const handleGetAllWaitingNews = async () => {
    try {
      const res = await newsApi.getAllWaiting({})
      setListNews(res?.data?.data)
    } catch (error) {
      console.log('err:', error)
    }
  }

  const handleGetAllWaitingVideos = async () => {
    try {
    } catch (error) {
      console.log('err:', error)
    }
  }

  return (
    <>
      <div className="approve" style={{ display: 'flex' }}>
        <div className="approve_news" style={{ width: '50%' }}>
          <h3 style={{ marginBottom: 24 }}>Bài đăng</h3>
          {listNews && listNews.length > 0
            ? listNews.map((item, index) => {
                return (
                  <Card
                    sx={{ width: 350, margin: 2 }}
                    onClick={() => {
                      navigate(`/news/${item?.id}`)
                    }}
                  >
                    <CardActionArea>
                      <CardMedia component="img" height="140" image={img} alt="green iguana" />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item?.desc}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )
              })
            : 'Không có bài đăng nào cần phê duyệt'}
        </div>
        <div className="approve_videos" style={{ width: '50%' }}>
          <h3 style={{ marginBottom: 24 }}>Video</h3>
        </div>
      </div>
    </>
  )
}
export default ApprovePage
