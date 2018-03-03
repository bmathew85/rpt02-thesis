import React, { Component } from 'react'
import { Modal, Button, Icon } from 'semantic-ui-react'
import moment from 'moment'
import axios from 'axios'

// Components
import MenuBar from './MenuBar.jsx'
import GoalTable from './GoalTable.jsx'
import AddGoal from './AddGoal.jsx'

class Goal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userId: null,
      goal: '',
      goalIDtoDelete: '',
      category: '',
      weightTarget: '',
      repTarget: '',
      minTarget: '',
      secsTarget: '',
      daysTarget: '',
      size: '',
      sizeConfirm: '',
      startDate: moment(),
      endDate: moment(),
      notes: '',
      complete: false,
      accomplishments: [],
      goals: [],
      open: false,
      openConfirm: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
    this.handleDropDownChange = this.handleDropDownChange.bind(this)
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this)
    this.handleRemoveGoal = this.handleRemoveGoal.bind(this)
    this.checkGoalComplete = this.checkGoalComplete.bind(this)
    this.closeCancel = this.closeCancel.bind(this)
    this.closeConfirm = this.closeConfirm.bind(this)
    // this.fetchGoals = this.fetchGoals.bind(this)
    this.close = this.close.bind(this)
    this.showConfirmDeleteModal = this.showConfirmDeleteModal.bind(this)
    this.show = this.show.bind(this)
  }

  componentDidMount () {
    this.fetchGoalsCompetitionsUserId()
  }

  handleChange (e, { name, value }) {
    this.setState({
      [name]: value
    })
  }

  handleDropDownChange (e, { value }) {
    this.setState({
      category: value
    })
  }

  handleStartDateChange (date) {
    this.setState({
      startDate: date
    })
  }

  handleEndDateChange (date) {
    this.setState({
      endDate: date
    })
  }

  handleTextAreaChange (e, { value }) {
    this.setState({
      notes: value
    })
  }

  handleSubmit () {
    const {
      goal,
      weightTarget,
      repTarget,
      minTarget,
      secsTarget,
      daysTarget,
      category,
      startDate,
      endDate,
      notes,
      complete,
      userId
    } = this.state

    axios
      .post('/api/goal', {
        goal,
        weightTarget,
        repTarget,
        minTarget,
        secsTarget,
        daysTarget,
        category,
        startDate,
        endDate,
        notes,
        complete,
        userId
      })
      .then((response) => {
        this.fetchGoalsCompetitionsUserId()
      })
      .catch((error) => {
        console.log(error)
      })

    this.close()

    this.setState({
      goal: '',
      weightTarget: '',
      repTarget: '',
      minTarget: '',
      secsTarget: '',
      daysTarget: '',
      category: '',
      notes: '',
      startDate: moment(),
      endDate: moment()
    })
  }

  handleRemoveGoal (id) {
    axios
      .delete(`/api/goal/${id}`)
      .then((response) => {
        this.fetchGoalsCompetitionsUserId()
      }, () => { this.checkGoalComplete() })
      .catch((error) => {
        console.log(error)
      })
  }

  checkGoalComplete () {
    const { goals } = this.state
    for (let i = 0; i < goals.length; i += 1) {
      if (goals[i].complete) {
        console.log('this goal is complete: ', goals[i])
      }
    }
  }

  // fetchGoals () {
  //   axios
  //     .get('/api/goal')
  //     .then((response) => {
  //       this.setState({
  //         goals: response.data
  //       })
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  fetchGoalsCompetitionsUserId() {
		axios
			.get("/api/getGoalsCompetitionsUserId")
			.then(response => {
				this.setState({
          userId: response.data[0],
          goals: response.data[2]
				})
				console.log("goals api call cox", response)
			})
			.catch(error => {
				console.log(error)
			})
	}

  showConfirmDeleteModal (size, id) {
    this.setState({
      sizeConfirm: size,
      openConfirm: true,
      goalIDtoDelete: id
    })
  }

  show (size) {
    this.setState({
      size,
      open: true
    })
  }

  closeCancel () {
    this.setState({
      openConfirm: false
    })
  }

  closeConfirm () {
    const { goalIDtoDelete } = this.state
    this.handleRemoveGoal(goalIDtoDelete)
    this.setState({
      openConfirm: false
    })
  }

  close () {
    this.setState({
      open: false
    })
  }

  render () {
    return (
      <div>

        <br />

        <AddGoal
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handleDropDownChange={this.handleDropDownChange}
          handleStartDateChange={this.handleStartDateChange}
          handleEndDateChange={this.handleEndDateChange}
          handleTextAreaChange={this.handleTextAreaChange}
          goal={this.state.goal}
          weightTarget={this.state.weightTarget}
          repTarget={this.state.repTarget}
          minTarget={this.state.minTarget}
          secsTarget={this.state.secsTarget}
          daysTarget={this.state.daysTarget}
          category={this.state.category}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          notes={this.state.notes}
          complete={this.state.complete}
          close={this.close}
          open={this.state.open}
          show={this.show}
          size={this.state.size}
        />

        <br /><br />

        <GoalTable
          goals={this.state.goals}
          handleRemoveGoal={this.handleRemoveGoal}
          handleTableCellClick={this.handleTableCellClick}
          renderModal={this.renderModal}
          openConfirm={this.state.openConfirm}
          closeCancel={this.closeCancel}
          closeConfirm={this.closeConfirm}
          show={this.showConfirmDeleteModal}
          size={this.state.sizeConfirm}
        />

      </div>
    )
  }
}

export default Goal
