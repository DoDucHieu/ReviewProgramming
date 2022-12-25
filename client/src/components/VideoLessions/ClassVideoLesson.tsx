import { Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { type NavigateFunction, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import videoAPIs from 'src/apis/videoAPI'
import { END_POINT_IMG } from 'src/const'
import { AuthContext } from 'src/contexts/authContext/AuthContext'

interface IComponentProps {
  videoURL: string
}

export default function VideoLesson({ videoURL }: IComponentProps) {
  const navigator = useNavigate()
  const { user } = useContext(AuthContext)
  const params = useParams()
  const [isApproved, setIsApproved] = useState(false)
  const [queries, setQueries] = useSearchParams()

  const isAdmin = user?.role_id === 'r1'

  const approveVideoHandler = async () => {
    try {
      const response = await videoAPIs.approveVideo(params.id || '')
      console.log('Approved:', response)
      setIsApproved(true)
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  useEffect(() => {
    const isApproved = queries.get('approved')
    if (isApproved) {
      setIsApproved(true)
    }
  }, [])

  return (
    <div>
      <ManipulatedVideo
        isApproved={isApproved}
        isAdmin={isAdmin}
        source={videoURL}
        navigator={navigator}
        onApproveVideo={approveVideoHandler}
      />
    </div>
  )
}

interface IVideoProps {
  source: string
  isAdmin: boolean
  isApproved: boolean
  navigator: NavigateFunction
  onApproveVideo: () => Promise<void>
}
interface IVideoState {}

class ManipulatedVideo extends React.Component<IVideoProps, IVideoState> {
  bufferCanvasRef: React.RefObject<HTMLCanvasElement>
  bufferCanvasContext?: CanvasRenderingContext2D | null
  displayCanvasRef: React.RefObject<HTMLCanvasElement>
  displayCanvasContext?: CanvasRenderingContext2D | null
  videoContainerRef: React.RefObject<HTMLDivElement>
  isFailedToLoadVideo = false

  constructor(prop: IVideoProps) {
    super(prop)

    this.bufferCanvasRef = React.createRef<HTMLCanvasElement>()
    this.displayCanvasRef = React.createRef<HTMLCanvasElement>()
    this.videoContainerRef = React.createRef<HTMLDivElement>()
  }

  componentDidMount(): void {
    if (!this.bufferCanvasRef.current || !this.displayCanvasRef.current || !this.videoContainerRef.current) {
      return
    }

    this.bufferCanvasContext = this.bufferCanvasRef.current.getContext('2d')
    this.displayCanvasContext = this.displayCanvasRef.current.getContext('2d')

    this.displayCanvasRef.current.height = window.innerHeight * 0.8
    this.displayCanvasRef.current.width = this.videoContainerRef.current.getBoundingClientRect().width
    this.bufferCanvasRef.current.height = window.innerHeight * 0.8
    this.bufferCanvasRef.current.width = this.videoContainerRef.current.getBoundingClientRect().width
  }

  videoLoadFailedHandler = () => {
    this.isFailedToLoadVideo = true
  }

  render(): any {
    return (
      <div ref={this.videoContainerRef} className="relative">
        <video
          src={`${END_POINT_IMG}/${this.props.source}`}
          controls
          onError={this.videoLoadFailedHandler}
          className=" top-0 left-0 w-full h-[80vh]"
        ></video>
        <canvas
          ref={this.bufferCanvasRef}
          width="500"
          height="500"
          className="hidden absolute top-0 left-0  w-full h-[80vh]"
        ></canvas>
        <canvas
          ref={this.displayCanvasRef}
          width="500"
          height="500"
          className="hidden absolute top-0 left-0  w-full h-[80vh]"
        ></canvas>

        <div
          style={{
            display: this.isFailedToLoadVideo ? 'flex' : 'none',
          }}
          className="absolute top-0 left-0 w-full h-[80vh] flex justify-center items-center bg-white"
        >
          <p>Video không khả dụng</p>
        </div>

        {this.props.isAdmin && !this.props.isApproved && (
          <div className="flex mt-5">
            <Button onClick={this.props.onApproveVideo}>Phê Duyệt</Button>
          </div>
        )}
      </div>
    )
  }
}
