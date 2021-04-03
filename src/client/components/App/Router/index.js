import React from 'react'
import { Route, Switch } from "react-router-dom"
import LandingPage from '../../LandingPage'
import Layout from '../Layout'
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
import { ProvideAuth } from '../Auth'

const Router = () => (
    <ProvideAuth>
        <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/register" component={Register} />
                <Layout>
                
                    <Switch>
                        <ProtectedRoute path="/listings" component={Listings} />
                        <ProtectedRoute path="/addlisting" component={AddListing} />
                        <ProtectedRoute path="/profile/:user_id" component={Profile} />
                        <ProtectedRoute path="/editprofile" component={EditProfile} />
                        <ProtectedRoute path="/editlisting/:listing_id" component={EditListing} />
                        <ProtectedRoute path="/deleteprofile" component={DeleteProfile} />
                        <ProtectedRoute path="/deletelisting/:listing_id" component={DeleteListing} />
                        <ProtectedRoute path="/logout" component={Logout} />
                        <Route component={NotFound} />
                    </Switch>
                </Layout>
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
