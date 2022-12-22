import { Link, useNavigate } from 'react-router-dom'
import ListOutstandingClass from '../components/OutstandingClass'
import Schedule from '../components/Schedule'
import img from 'src/images/background.jpg'

import BannerSlider from '../components/SomethingInHomePage/BannerSlider'
import VideosPage from './VideosPage'
import logoImg from 'src/images/video logo.jpg'
import { useEffect, useState } from 'react'
import newsApi from 'src/apis/newsApi'
import { NewsType } from 'src/types'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { flexbox } from '@mui/system'

export default function HomePage() {
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
  return (
    <>
      <BannerSlider />
      <ListOutstandingClass />
      {/* <Schedule /> */}
      <div className="">
        <h2
          style={{
            marginBottom: '12px',
            padding: '0 48px',
          }}
        >
          Video lập trình
        </h2>
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            justifyContent: 'flex-start',
            padding: '0 48px',
          }}
          className=""
        >
          {new Array(10).fill('').map((_, i) => (
            <li
              style={{
                backgroundColor: '#000',
                border: '1px solid #ccc',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
              key={i}
            >
              <Link to={`/videos/${i}`} className="block no-underline text-blue-500 thick-hover-animation">
                <img src={logoImg} alt="" className="w-80 h-80 object-fill" />
                <span className="block w-fit mx-auto">Tiếng anh công nghệ thông tin {i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          marginBottom: '12px',
          padding: '0 48px',
        }}
        className="px-12"
      >
        <h2 style={{ margin: '16px 0', textAlign: 'left' }}>Danh sách các bài đăng về lập trình</h2>
        <div className="listNews" style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
          {listNews &&
            listNews.map((item, index) => {
              return (
                <Card
                  sx={{ width: 320, margin: 2 }}
                  onClick={() => {
                    navigate(`news/${item?.id}`)
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
            })}
        </div>
      </div>
    </>
  )
}
