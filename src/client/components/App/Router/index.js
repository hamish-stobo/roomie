import React from 'react'
import { Route, Switch } from "react-router-dom"
import LandingPage from '../../LandingPage'
import Layout from '../Layout'
import Listings from '../../Listings'
import Register from '../../Register'
import Login from '../../Login'

const Router = () => (
    <div>
        <Switch>
            <Route exact path="/"><LandingPage /></Route>
            <Layout>
                <Route path="/login" component={Login} />
                {/* <Route path="/logout" component={LogOut} /> */}
                <Route path="/register" component={Register} />
                <Route path="/listings" component={Listings} />
                {/* <Route path="/listing" component={ListingDetails} /> */}
                {/* <Route path="/profile" component={Profile} /> */}
            </Layout>
        </Switch>
    </div>
)

export default Router
