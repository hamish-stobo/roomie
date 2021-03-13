import React from 'react'
import { Route, Switch } from "react-router-dom"
import LandingPage from '../../LandingPage'
import Layout from '../Layout'
import Listings from '../../Listings'
import Register from '../../Register'

const Router = () => (
    <>
        <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/register" component={Register} />
            <Layout>
                {/* <Route path="/logout" component={LogOut} /> */}
                
                <Route path="/listings" component={Listings} />
                {/* <Route path="/listing" component={ListingDetails} /> */}
                {/* <Route path="/profile" component={Profile} /> */}
            </Layout>
        </Switch>
    </>
)

export default Router
