import { Route, Switch } from 'react-router-dom'
import Login from '../../Login'
import UnauthenticatedLayout from '../Layouts/UnauthenticatedLayout'
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout'
import Listings from '../../Listings'
import Register from '../../Register'
import Profile from '../../Profile'
import AddListing from '../../AddListing'
import EditProfile from '../../EditProfile'
import EditListing from '../../EditListing'
import DeleteProfile from '../../DeleteProfile'
import DeleteListing from '../../DeleteListing'
import ProtectedRoute from '../Auth/ProtectedRoute'
import Logout from '../../Logout'
import Popup from '../../Popup'
import { ProvideAuth } from '../Auth'

const Router = () => (
    <ProvideAuth>
        <Popup />
        <Switch>
            <UnauthenticatedLayout>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </UnauthenticatedLayout>
            <AuthenticatedLayout>
                <Switch>
                    <ProtectedRoute path="/listings" component={Listings} />
                    <ProtectedRoute path="/addlisting" component={AddListing} />
                    <ProtectedRoute
                        path="/profile/:user_id"
                        component={Profile}
                    />
                    <ProtectedRoute
                        path="/editprofile"
                        component={EditProfile}
                    />
                    <ProtectedRoute
                        path="/editlisting/:listing_id"
                        component={EditListing}
                    />
                    <ProtectedRoute
                        path="/deleteprofile"
                        component={DeleteProfile}
                    />
                    <ProtectedRoute
                        path="/deletelisting/:listing_id"
                        component={DeleteListing}
                    />
                    <ProtectedRoute path="/logout" component={Logout} />
                    <Route component={NotFound} />
                </Switch>
            </AuthenticatedLayout>
            <Route component={NotFound} />
        </Switch>
    </ProvideAuth>
)

const NotFound = () => (
    <div>
        <h1>Oops!</h1>
        <p>The page you were looking for does not exist.</p>
    </div>
)

export default Router
