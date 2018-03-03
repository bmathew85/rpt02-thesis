import React from 'react'
import { Link } from 'react-router-dom'
import HomePageHeader from "./HomePageHeader.jsx";
import { Button, Image } from "semantic-ui-react";

const Home = () => (
	<div >
		<HomePageHeader  />

    <div className="ui masthead masthead-main segment ">

      <div className="ui fluid image">
        <a className="ui right corner label">
          <i className="facebook icon"></i>
        </a>
        <Image src="https://static.pexels.com/photos/17840/pexels-photo.jpg" />
        <div className="ui middle aligned centered stackable grid container">
          <div style={{position: 'absolute', bottom: 0, top: 55, width: 'auto', height: 'auto' }} >
            <div className="row">
              <div className="ten center aligned wide column">
                <h1 className="ui header" id="tagline">
                  <h1>To Be the Best, You Have to Beat the Best</h1>
                  <div className="sub header small">
                  Start competing today!

                  </div>

                  <div className="item" style={{position: 'absolute', bottom: 30, width: '100%', height: 'auto' }}>
                    <Link to="/signupform">

                      <Button className="ui button huge green" role="button">
                      Sign up
                      </Button>
                    </Link><br /><br />
                    Setup an account in seconds
                  </div>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section className="mgb-alternating">
      <div className="ui container">
      <div className="ui section divider">
          </div>
          <div className="ui middle aligned equal width stackable grid">
            <div className="column">
              <img className="mgb-alternating-media ui image" src="http://perec.columbia.edu/files/content/Boxing%203.jpg" />
            </div>
            <div className="column">
              <h3 className="ui header">Compete with friends and locals
                <span className="sub header">Login with Facebook to start competing with your friends. Or find locals who have similar goals that want to compete!
                </span>
              </h3>
              <a className="ui big primary fluid button" href="/signupform">

                Try it

              </a>
            </div>
          </div>
          <div className="ui section divider">
          </div>
          <div className="ui middle aligned equal width stackable mobile vertically reversed grid ">
            <div className="column">
              <h3 className="ui header">
                Bragging Rights
                  <span className="sub header">
                    Earn trophies when you win against your friends. Show em who's boss by winning multiple trophies and claiming your spot at the top.
                  </span>
              </h3>
              <a className="ui big primary fluid button" href="/trophies">
                Earn Trophies
              </a>
            </div>
            <div className="nine wide computer ten wide tablet column">
              <img  src="http://balleralert.com/wp-content/uploads/2017/01/fitness-768x340.jpg" />
            </div>
          </div>
      </div>
    </section>

    <footer className="ui inverted vertical segment">
      <div className="ui container">
        <div className="ui equal width stackable grid">
          <div className="column">
            <h4 className="ui inverted header">Compete today
            </h4>
            <p>Set goals for yourself and compete with friends who may have similar goals!
            </p>
          </div>
        <div className="column">
          <h4 className="ui inverted header">
            Get Fit
          </h4>
          <div className="ui inverted list">
            <div className="item">
              Run a marathon
            </div>
            <div className="item">
              Lift more
            </div>
          </div>
        </div>
        <div className="column">
          <h4 className="ui header">
            Make Friends
          </h4>
          <div className="ui inverted list">
            <div className="item">Help each other get better
            </div>
            <div className="item">Find locals that want to compete
            </div>
          </div>
        </div>
        <div className="column">
          <h4 className="ui inverted header">
            Have Fun
          </h4>
          <div className="ui inverted list">
            <div className="item">We're all trying to get better. Compete and have fun along the way.
            </div>

          </div>
        </div>
        </div>
        <div className="ui equal width stackable grid">
          <div className="eight wide column">
            Copyright ©2018 BCM Inc.
          </div>
          <div className="column">
            <div className="ui equal width grid">
              <div className="column">
                <div className="ui small inverted horizontal divided link list">
                <a className="item" href="https://www.hackreactor.com" target="_blank" rel="noopener noreferrer">
                Hack Reactor</a>
                <a className="item" href="fake@fake.com">Contact Us
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>




  </div>


);

export default Home
