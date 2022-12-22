import React, { ReactElement, ReactNode } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import { END_POINT_IMG } from 'src/const'
import video from 'src/video/video.mp4'

interface IComponentProps {
  videoURL: string
}

export default function VideoLesson({ videoURL }: IComponentProps) {
  const navigator = useNavigate()

  return (
    <div>
      <ManipulatedVideo source={videoURL} navigator={navigator} />
    </div>
  )
}

interface IVideoProps {
  source: string
  navigator: NavigateFunction
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
          className="absolute top-0 left-0 w-full h-[80vh]"
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
      </div>
    )
  }
}
