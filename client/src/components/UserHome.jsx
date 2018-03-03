import React, { Component } from 'react'
import { Card, Icon, Image, Grid } from 'semantic-ui-react'
import axios from 'axios'
import moment from 'moment'
import InputMoment from 'input-moment'

import CompetitionsFullPage from './CompetitionsFullPage.jsx'
// Components
import MenuBar from './MenuBar.jsx'
import SideMenu from './SideMenu.jsx'
import Goal from './Goal.jsx'
import Accomplishments from './Accomplishments.jsx'

class UserHome extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: null,
      competitionData: [],
      goals: [],
      accomplishments: [],
			isHidden: true,
			compName: "",
			compCat: "",
			compStart: moment(),
			compStartClick: false,
			compEnd: moment(),
			compEndClick: true
		}
		this.competitionsHandleClick = this.competitionsHandleClick.bind(this);
		this.handleCompName = this.handleCompName.bind(this);
		this.handleCompCat = this.handleCompCat.bind(this);
		this.competitionsSubmit = this.competitionsSubmit.bind(this);
		this.handleStartChange = this.handleStartChange.bind(this);
		this.handleEndChange = this.handleEndChange.bind(this);
    this.handleAccomplishments = this.handleAccomplishments.bind(this)
		this.handleCompStartSave = this.handleCompStartSave.bind(this);
		this.handleCompEndSave = this.handleCompEndSave.bind(this);
	}
	componentDidMount() {
		this.fetchGoalsCompetitionsUserId()
	}

	handleItemClick(name) {
		this.setState({ activeItem: name });
	}

	competitionsHandleClick(isHidden) {
		this.setState({
			isHidden: !isHidden
		});
	}

	handleCompName(compName) {
		console.log(compName);
		this.setState({
			compName: compName.target.value
		});
	}

	handleCompCat(e, compCat) {
		this.setState({
			compCat: compCat.value
		});
	}

	handleStartChange(m) {
		console.log("handle startchange in userhome m coming back", m);
		this.setState({
			compStart: m // date:  moment(selectedDate).format('DD/MM/YYYY')
		});
	}

	handleEndChange(m) {
		console.log("end change in userhome", m);
		this.setState({
			compEnd: m
		});
	}

	handleCompStartSave() {
		console.log("saving clicking changes components start date");
		this.setState({
			compStartSaveClick: true
		});
	}

	handleCompEndSave(falsey) {
		console.log("saving clicking changes components end date");
		this.setState({
			compEndClick: !falsey
		});
	}

	// fetchGoals() {
	// 	axios
	// 		.get("/api/goal")
	// 		.then(response => {
	// 			this.setState({
	// 				goals: response.data
	// 			});
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 		});
	// }

	fetchGoalsCompetitionsUserId() {
		axios
			.get("/api/getGoalsCompetitionsUserId")
			.then(response => {
				this.setState({
          userId: response.data[0],
          competitionData: response.data[1],
          goals: response.data[2]
				}, () => { this.handleAccomplishments() })
				console.log("data from the db in user home", response)
			})
			.catch(error => {
				console.log(error)
			});
	}

  handleAccomplishments () {
    const { goals, accomplishments } = this.state

    const copyOfAccomplishments = accomplishments.slice()

    for (let i = 0; i < goals.length; i += 1) {
      if (goals[i].complete) {
        copyOfAccomplishments.push(goals[i])
      }
    }

    this.setState({ accomplishments: copyOfAccomplishments })
  }

  competitionsSubmit(
    compsName,
    compsCat,
    compsStart,
    compsEnd,
    hiddenUserPage
  ) {
    if (compsCat === 'Build Muscle') {
      compsCat = 'Build_Muscle';
    } else if (compsCat === 'Lose Weight') {
      compsCat = 'Lose_Weight'
    } else {
      compsCat = compsCat
    }
    console.log(
      "what im submitting in the user component",
      compsName,
      compsCat,
      compsStart,
      compsEnd,
      hiddenUserPage
    )
    this.setState({
      isHidden: !hiddenUserPage,
      compStart: moment(),
      compEnd: moment(),
      compStartClick: false,
      compEndClick: false,
      userId: null
    })
    axios
      .post("/api/competitions", {
        comptetionName: compsName,
        competitionCategory: compsCat,
        competitionStart: compsStart,
        competitionEnd: compsEnd,
        competitionPic: "",
        userIdComp: userIdComp
      })
      .then(response => {
        console.log("in userHome file data back from server", response.data);
        this.setState({
          competitionData: response.data
        })
      })
      .catch(error => {
        console.log("this is the error after a post submit request", error);
      })
  }

  render(props) {
    console.log('ishidden value on start of app', this.state.isHidden)
    const { activeItem } = this.state || {}
    if (this.state.isHidden) {
      return (
        <div>
          <MenuBar
            isHidden={this.state.isHidden}
            competitionsHandleClick={this.competitionsHandleClick}
          />
          <Grid>
            <Grid.Column width={5}>
              <h1>Bio</h1>
              <Grid.Row style={{ width: 290 }}>
                <Card>
                  <Image src="https://react.semantic-ui.com/assets/images/avatar/large/matthew.png" />
                  <Card.Content>
                    <Card.Header>Manny</Card.Header>
                    <Card.Meta>
                      <span className="date">Joined in 2018</span>
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
              </Grid.Row>

              <br />

              <Grid.Row style={{ width: 290 }}>
                <SideMenu
                  Data={this.state.competitionData}
                  goals={this.state.goals}
                  accomplishments={this.state.accomplishments}
                  competitionsHandleClick={this.competitionsHandleClick}
                  isHidden={this.state.isHidden}
                  // {...props}
                />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={7}>
              <h1 style={{ textAlign: 'center' }}>Goals</h1>
              <Grid.Row>
                <Goal />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={3}>
              <h1 style={{ textAlign: 'right' }}>Accomplishments</h1>
              <Accomplishments
                accomplishments={this.state.accomplishments}
              />
            </Grid.Column>
          </Grid>
        </div>
      )
    }
    return (
      <CompetitionsFullPage
        Data={this.state.competitionData}
        userId={this.state.userId}
        isHidden={this.state.isHidden}
        compName={this.state.compName}
        compCat={this.state.compCat}
        compStart={this.state.compStart}
        compEnd={this.state.compEnd}
        handleCompName={this.handleCompName}
        handleCompCat={this.handleCompCat}
        handleCompStartSave={this.handleCompStartSave} // this 1
        compStartClick={this.state.compStartClick} // this 1
        handleCompEndSave={this.handleCompEndSave} // this 1
        compEndClick={this.state.compEndClick} // this 1
        handleStartChange={this.handleStartChange}
        handleEndChange={this.handleEndChange}
        competitionsSubmit={this.competitionsSubmit}
      />
    )
  }
}

export default UserHome
