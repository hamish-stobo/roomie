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

const Router = () => (
    <>
        <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/register" component={Register} />
            <Layout>
                {/* <Route path="/logout" component={LogOut} /> */}
                
                <Route path="/listings" component={Listings} />
                <Route path="/addlisting" component={AddListing} />
                <Route path="/profile/:user_id" component={Profile} />
                <Route path="/editprofile" component={EditProfile} />
                <Route path="/editlisting/:listing_id" component={EditListing} />
                <Route path="/deleteprofile" component={DeleteProfile} />
                <Route path="/deletelisting/:listing_id" component={DeleteListing} />
            </Layout>
        </Switch>
    </>
)

export default Router
