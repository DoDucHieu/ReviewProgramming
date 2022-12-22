import './ClonesLoader.css'

interface IComponentProps {
  className?: string
}

const ClonesLoader = ({ className = '' }: IComponentProps) => {
  return <div className={`clone-loader ${className}`}></div>
}

export default ClonesLoader
