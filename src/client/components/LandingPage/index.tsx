import '../../styles/styles'
import Footer from '../Footer'
import Login from './Login'

const LandingPage = (): JSX.Element => (
    <div className="flex flex-col items-center justify-center h-screen w-screen pb-12">
        <h1 className="Logo text-purpScurp text-7xl pb-8">roomie</h1>
        <Login />
        <Footer />
    </div>
)

export default LandingPage
