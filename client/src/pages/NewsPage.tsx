import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import img from '../images/background.jpg'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import newsApi from 'src/apis/newsApi'
import { NewsType } from 'src/types'

const baseUrl = 'http://localhost:8000'

const NewsPage = () => {
  const navigate = useNavigate()
  const [listNews, setListNews] = useState<NewsType[]>([])

  useEffect(() => {
    handleGetAllNews()
  }, [])

  const handleGetAllNews = async () => {
    try {
      const res = await newsApi.getAll({})
      setListNews(res?.data?.data)
    } catch (error) {
      console.log('err: ', error)
    }
  }
  console.log('data: ', listNews)

  return (
    <>
      <div className="button" style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
        <Button
          variant="contained"
          onClick={() => {
            navigate('/add-new')
          }}
        >
          Thêm bài đăng
        </Button>
      </div>
      <h2 style={{ marginBottom: 16 }}>Danh sách các bài đăng về lập trình</h2>
      {listNews && listNews.length > 0 ? (
        <div className="listNews" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {listNews &&
            listNews.map((item, index) => {
              return (
                <Card
                  sx={{ width: 350, margin: 2 }}
                  onClick={() => {
                    navigate(`${item?.id}`)
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item?.img_url ? `${baseUrl + '/' + item?.img_url}` : img}
                      alt="green iguana"
                    />
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
            })}
        </div>
      ) : (
        <h3 className="text-red-500 text-center mt-8">Không có bài đăng nào</h3>
      )}
    </>
  )
}

export default NewsPage
