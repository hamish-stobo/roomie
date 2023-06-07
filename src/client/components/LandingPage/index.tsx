import '../../styles/styles'
import Footer from '../Footer'
import Login from './Login'

const LandingPage = (): JSX.Element => (
    <div className="pageWrapper">
        <h1 className="Logo Header lowercase">rOOmie</h1>
        <Login />
        <Footer />
    </div>
)

export default LandingPage
