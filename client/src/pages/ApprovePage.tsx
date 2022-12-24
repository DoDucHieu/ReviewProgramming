import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import newsApi from 'src/apis/newsApi'
import videoAPIs from 'src/apis/videoAPI'
import logoImg from 'src/images/video logo.jpg'
import ClonesLoader from 'src/components/Loader/ClonesLoader'
import { IVideo } from 'src/interfaces/video'
import { NewsType } from 'src/types'
import img from '../images/background.jpg'

const ApprovePage = () => {
  const navigate = useNavigate()
  const [listNews, setListNews] = useState<NewsType[]>([])
  const [isFetchingVideo, setIsFetchingVideo] = useState(false)
  const [videoList, setVideoList] = useState<IVideo[]>([])

  useEffect(() => {
    handleGetAllWaitingNews()
    fetchVideos()
  }, [])

  const handleGetAllWaitingNews = async () => {
    try {
      const res = await newsApi.getAllWaiting({})
      setListNews(res?.data?.data)
    } catch (error) {
      console.log('err:', error)
    }
  }

  const fetchVideos = async () => {
    setIsFetchingVideo(true)
    try {
      const response = await videoAPIs.getWaiting()

      setVideoList(response.data.data)
    } catch (error) {
      console.log('Error: ', error)
      toast.error('Có lỗi xảy ra, không thể lấy danh sách video')
    } finally {
      setIsFetchingVideo(false)
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
          {listNews && listNews.length > 0 ? (
            listNews.map((item, index) => {
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
          ) : (
            <h3 style={{ color: 'red' }}>Không có bài đăng nào cần phê duyệt</h3>
          )}
        </div>
        <div className="approve_videos" style={{ width: '50%' }}>
          <h3 style={{ marginBottom: 24 }}>Video</h3>
          {isFetchingVideo ? (
            <div className="flex h-96 w-full justify-center items-center">
              <ClonesLoader className="w-20 h-20" />
            </div>
          ) : (
            <ul className="flex px-12 flex-wrap justify-center list-none gap-5">
              {videoList.length < 1 ? (
                <h3 style={{ color: 'red' }}>Không có video nào cần phê duyệt</h3>
              ) : (
                videoList.map((video, i) => (
                  <li key={i}>
                    <Link
                      to={`/videos/${video.id}?video_url=${video.url_video}`}
                      className="block no-underline text-blue-500 thick-hover-animation"
                    >
                      <img src={logoImg} alt="" className="w-80 h-80 object-fill" />
                      <span className="block w-fit mx-auto">{video.title}</span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
export default ApprovePage
