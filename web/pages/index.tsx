import type { NextPage } from 'next'
import Header from '../src/components/Header'
import AboutPage from '../src/components/welcomePage/AboutPage'
import InstallAppPage from '../src/components/welcomePage/InstallAppPage'
import WelcomePage from '../src/components/welcomePage/WelcomePage'

export const KEYFRAMES_DURATION = 500
export const KEYFRAME_DELAY = 100

const Home: NextPage = () => {

  return (
    <div>
      <Header name="Welcome" />
      <WelcomePage />
      <AboutPage />
      <InstallAppPage />
    </div>
  )
}

export default Home