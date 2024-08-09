import '@fortawesome/fontawesome-free/css/all.min.css';
import Hero from '../Hero/Hero'
import Courses from '../Courses/courses'
import Thrd from './3rd/Thrd'
import Frth from './Frth/Frth'
import Parent from '../lastpart/Parent';

export default function Home() {
  return (
    <>
      <Hero />
      <Courses />
      <Thrd />
      <Frth />
      <Parent />
    </>
  )
}