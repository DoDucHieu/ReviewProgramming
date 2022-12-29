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
import { IVideo } from 'src/interfaces/video'
import videoAPIs from 'src/apis/videoAPI'
import { toast } from 'react-toastify'

export default function HomePage() {
  const baseUrl = 'http://localhost:8000'
  const navigate = useNavigate()
  const [listNews, setListNews] = useState<NewsType[]>([])
  const [videoList, setVideoList] = useState<IVideo[]>([])
  const [isFetchingVideo, setIsFetchingVideo] = useState(false)

  useEffect(() => {
    handleGetAllNews()
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    setIsFetchingVideo(true)
    try {
      const response = await videoAPIs.getAll()

      setVideoList(response.data.data)
    } catch (error) {
      console.log('Error: ', error)
      toast.error('Có lỗi xảy ra, không thể lấy danh sách video')
    } finally {
      setIsFetchingVideo(false)
    }
  }

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
      <div
        style={{
          marginBottom: '12px',
          padding: '0 48px',
        }}
        className="px-12"
      >
        <h2
          style={{
            marginBottom: '24px',
            marginTop: '24px',
            padding: '0 18px',
          }}
        >
          Danh sách bài đăng lập trình
        </h2>
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
      </div>
      <div className="">
        <h2
          style={{
            marginBottom: '24px',
            marginTop: '24px',
            padding: '0 64px',
          }}
        >
          Danh sách video lập trình
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
          {videoList?.map((video, i) => (
            <li
              style={{
                backgroundColor: '#000',
                border: '1px solid #ccc',
                borderRadius: '4px',
                overflow: 'hidden',
                marginLeft: 8,
              }}
              key={i}
            >
              <Link
                to={`/videos/${video.id}?video_url=${video.url_video}`}
                className="block no-underline text-blue-500 thick-hover-animation"
              >
                <img src={logoImg} alt="" style={{ objectFit: 'cover', width: 320, height: 320 }} />
                <span className="block w-fit mx-auto">{video.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
