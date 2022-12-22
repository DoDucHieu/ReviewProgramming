import { Link } from 'react-router-dom'

import BackToTheHomepageImg from 'src/images/backToTheHomepage.webp'
import Delorean from 'src/images/Delorean.webp'

import './NotFound.css'

export default function NotFound() {
  return (
    <section className="notFound">
      <div className="img">
        <img src={BackToTheHomepageImg} alt="Back to the Homepage" />
        <img src={Delorean} alt="El Delorean, El Doc y Marti McFly" />
      </div>
      <div className="text">
        <h1>404</h1>
        <h2>PAGE NOT FOUND</h2>
        <h3>BACK TO HOME?</h3>
        <Link to="/" className="yes">
          YES
        </Link>
        <Link to="#">No</Link>
      </div>
    </section>
  )
}
