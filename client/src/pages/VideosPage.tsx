import { Link } from 'react-router-dom'
import logoImg from 'src/images/video logo.jpg'

export default function VideosPage() {
  return (
    <div>
      <ul className="flex px-12 flex-wrap justify-center list-none gap-5">
        {new Array(10).fill('').map((_, i) => (
          <li key={i}>
            <Link to={`/videos/${i}`} className="block no-underline text-blue-500 thick-hover-animation">
              <img src={logoImg} alt="" className="w-80 h-80 object-fill" />
              <span className="block w-fit mx-auto">Tiếng anh công nghệ thông tin {i + 1}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
