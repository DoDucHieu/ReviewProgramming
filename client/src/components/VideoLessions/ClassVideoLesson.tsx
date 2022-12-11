import React, { ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import video from 'src/video/video.mp4'

export default function VideoLesson() {
  const { videoID } = useParams()
  console.log('Video id: ', videoID)

  return (
    <div>
      <ManipulatedVideo source={video} />
    </div>
  )
}

interface IVideoProps {
  source: string
}
interface IVideoState {}

class ManipulatedVideo extends React.Component<IVideoProps, IVideoState> {
  bufferCanvasRef: React.RefObject<HTMLCanvasElement>
  bufferCanvasContext?: CanvasRenderingContext2D | null
  displayCanvasRef: React.RefObject<HTMLCanvasElement>
  displayCanvasContext?: CanvasRenderingContext2D | null
  videoContainerRef: React.RefObject<HTMLDivElement>

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

  render(): ReactNode {
    return (
      <div ref={this.videoContainerRef} className="relative">
        <video src={this.props.source} controls className="absolute top-0 left-0 w-full h-[80vh]"></video>
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
      </div>
    )
  }
}
