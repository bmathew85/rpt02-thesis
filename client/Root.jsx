
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './src/components/Home.jsx'
import UserHome from './src/components/UserHome.jsx'
import Friends from './src/components/Friends.jsx'
import CompetitionsFullPage from "./src/components/CompetitionsFullPage.jsx";
import CompetitionsPopUp from "./src/components/CompetitionsPopUp.jsx";
import Trophies from './src/components/Trophies.jsx'
import SignupForm from './src/components/SignupForm.jsx'
import LoginForm from './src/components/LoginForm.jsx'
// import SignupForm from '../views/register.handlebars';
import HomePageHeader from "./src/components/HomePageHeader.jsx"
import NotFound from './src/components/NotFound.jsx'
import Goal from './src/components/Goal.jsx'
import CheckIn from './src/components/CheckIn.jsx'

const Root = () => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route path="/userhome" component={UserHome} />
		<Route path="/login" component={LoginForm} />
		<Route path="/friends" component={Friends} />
		<Route path="/competitionsfullpage" component={CompetitionsFullPage} />
		<Route path="/competitionspopup" component={CompetitionsPopUp} />
		<Route path="/trophies" component={Trophies} />
		<Route path="/signupform" component={SignupForm} />
		<Route path="/homepageheader" component={HomePageHeader} />
    <Route path="/goals" component={Goal} />
    <Route path="/goal/:id" component={CheckIn} />
    <Route component={NotFound} />
  </Switch>
)

export default Root
