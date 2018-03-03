import React, { Component } from 'react'
import { Card, Icon, Image, Button, Form, Menu, Input, Grid, Header } from 'semantic-ui-react'

import CompetitionsPopUp from './CompetitionsPopUp.jsx'
import axios from 'axios'

// Components
import MenuBar from './MenuBar.jsx'
import SideMenu from './SideMenu.jsx'

const ROOT_URL = 'http://localhost:3000'

class Trophies extends Component {
  constructor (props) {
    super(props)

    this.state = {
      goalTitle: '',
      goalDesc: '',
      goals: []
    }
    this.handleGoalTitleChange = this.handleGoalTitleChange.bind(this)
    this.hanldeGoalDescChange = this.hanldeGoalDescChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.fetchGoals()
  }

  handleGoalTitleChange (e) {
    this.setState({
      goalTitle: e.target.value
    })
  }

  hanldeGoalDescChange (e) {
    this.setState({
      goalDesc: e.target.value
    })
  }

  handleItemClick (name) {
    this.setState({ activeItem: name })
  }

  handleSubmit (e) {
    e.preventDefault()

    const copyOfGoals = [...this.state.goals]
    copyOfGoals.push(this.state.goalTitle)

    axios.post(ROOT_URL + '/api/goal', {
      goal: this.state.goalTitle
    })
      .then((response) => {
        this.fetchGoals()
      })
      .catch((error) => {
        console.log(error)
      })

    this.setState({
      goals: copyOfGoals,
      goalTitle: ''
    })
  }

  fetchGoals () {
    axios.get(ROOT_URL + '/api/goal')
      .then((response) => {
        this.setState({
          goals: response.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    const { activeItem } = this.state || {}
    return (
      <div>
      <MenuBar />

      <Grid centered divided="vertically" columns={2}>


        <Grid.Column textAlign="center">
          <Card>
            <Image src="https://react.semantic-ui.com/assets/images/avatar/large/matthew.png" />
            <Card.Content>
              <Card.Header>
                Manny's Trophy Page
              </Card.Header>
              <Card.Meta>
                <span className="date">
                  Joined in 2018
                </span>
              </Card.Meta>
              <Card.Description>
                Manny is some dude living in the Bay.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                22 Friends
              </a>
            </Card.Content>
          </Card>
        <SideMenu
          goals={this.state.goals}
        />

        <br /><br />

        <form onSubmit={this.handleSubmit} style={{ width: 290 }} ref="commentForm" className="ui form">
          <div className="field">
            <label>Goal Title</label>
            <input
              type="text"
              value={this.state.goalTitle}
              onChange={this.handleGoalTitleChange}
              placeholder="Enter your goal here..."
            />
          </div>
          <div className="field">
            <label>Goal Description</label>
            <textarea
              placeholder="Describe your goal..."
              rows="4"
              value={this.state.goalDesc}
              onChange={this.hanldeGoalDescChange}
            />
          </div>
          <button type="submit" className="ui button">Submit</button>
        </form>

        </Grid.Column>


      <Grid.Column>
        <Grid.Row>
          <Grid.Column>
              <Card>
              <div className="ui tiny image" >
                <Image src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Twemoji2_1f3c6.svg" title="First Place" size='small' />
              </div>
              <div class="content">
                <div className="header">Get Huge</div>
                <div className="meta">First Place</div>
              </div>
              </Card>
          </Grid.Column>

          <Grid.Column>
            <Card>
            <div className="ui tiny image" >
              <Image src="https://laurenswrittenword.files.wordpress.com/2013/11/bigstock-silver-trophy-vector-13932809.jpg" title="Second Place" size='small' />
            </div>
            <div className="content">
              <div className="header">You Can Do It</div>
              <div className="meta">Second Place</div>
            </div>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card>
            <div className="ui tiny image" >
              <Image src="https://cdn3.iconfinder.com/data/icons/smileys-people-smiley-essential/48/v-59-256.png" title="No Place" size='small' />
            </div>
            <div className="content">
              <div className="header">Lose Weight</div>
              <div className="meta">Didn't Place</div>
            </div>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card>
            <div className="ui tiny image" >
              <Image src="https://cdn3.iconfinder.com/data/icons/smileys-people-smiley-essential/48/v-59-256.png" title="No Place" size='small' />
            </div>
            <div className="content">
              <div className="header">Beat the Lake Run</div>
              <div className="meta">Didn't Place</div>
            </div>
            </Card>
          </Grid.Column>
          </Grid.Row>

        </Grid.Column>
      </Grid>
      </div>
    )
  }
}

export default Trophies
