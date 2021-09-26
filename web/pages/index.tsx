import type { NextPage } from 'next'
import Header from '../src/components/Header'
import InstallAppPage from '../src/components/welcomePage/InstallAppPage'
import WelcomePage from '../src/components/welcomePage/WelcomePage'

const Home: NextPage = () => {

  return (
    <div>
      <Header name="Welcome" />
      <WelcomePage /> 
      <InstallAppPage />
    </div>
  )
}

export default Home