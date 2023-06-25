import '../../styles/styles'
import Footer from '../Footer'
import Login from './Login'
import { Link } from 'react-router-dom'

const LandingPage = (): JSX.Element => (
    <div className="flex flex-col items-center justify-center h-screen w-screen pb-12 gap-y-24 sm:bg-gradient-to-r sm:from-purpScurp sm:to-d33pPurple sm:animate-gradient-x">
        <div className="px-6 py-12 rounded-lg sm:shadow-lg w-11/12 max-w-sm bg-veryLightGray">
            <h1 className="Logo text-purpScurp text-5xl mb-16">roomie</h1>
            <Login />
            <Link
                className="inline-block border-2 border-purpScurp text-purpScurp shadow p-3 rounded cursor-pointer w-full mx-0 hover:bg-purpScurp hover:text-veryLightGray mt-3"
                to="/register"
            >
                Sign Up
            </Link>
        </div>
        <Footer />
    </div>
)

export default LandingPage
