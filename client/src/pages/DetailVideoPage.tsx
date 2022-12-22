import { useSearchParams } from 'react-router-dom'
import VideoLesson from 'src/components/VideoLessions/ClassVideoLesson'

const DetailVideoPage = () => {
  const [queries] = useSearchParams()

  const videoURL = (queries.get('video_url') as string) || ''

  return (
    <div>
      <VideoLesson videoURL={videoURL} />
    </div>
  )
}
export default DetailVideoPage
