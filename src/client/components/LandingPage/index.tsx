import '../../styles/styles'
import Footer from '../Footer'
import Login from './Login'

const LandingPage = (): JSX.Element => (
    <div className="flex flex-col items-center justify-center xl:items-start h-screen w-screen pb-12 bg-white sm:bg-gradient-to-r sm:from-purpScurp sm:to-d33pPurple sm:animate-gradient-x">
        <Login />
        <Footer />
    </div>
)

export default LandingPage
