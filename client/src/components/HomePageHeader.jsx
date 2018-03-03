import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Image } from "semantic-ui-react";


const HomePageHeader = () => (
	<div>
		<div className="ui attached stackable menu">

			<div className="ui container">
    		<a className="ui small image">
      		<Image src="https://thumb1.shutterstock.com/display_pic_with_logo/165062914/522985843/stock-vector-warrior-fitness-gym-logo-design-template-522985843.jpg" />
    		</a>

    		<a className="item">
      		<i className="grid layout icon"></i> Browse
    		</a>
    		<a className="item">
      		<i className="mail icon"></i> Messages
    		</a>

    		<div className="ui simple dropdown item">
      	 	More
      		<i className="dropdown icon"></i>
		      <div className="menu">
		        <a className="item"><i className="edit icon"></i> Find a Competition</a>
		        <a className="item"><i className="globe icon"></i> About Us</a>
		        <a className="item"><i className="settings icon"></i> Contact </a>
		      </div>
    		</div>
  		</div>

			<div className="item">
				<Link to="/signupform">
					<Button className="ui button" role="button">
						Sign up
					</Button>
				</Link>
			</div>
			<div className="item">
				<Link to="/userhome">
					<Button className="ui button" role="button">
						Log-in
					</Button>
				</Link>
			</div>
		</div>
	</div>
);

export default HomePageHeader
