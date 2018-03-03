import React, { Component } from 'react'
import { Table, Checkbox, Icon, Modal, Button, Header } from 'semantic-ui-react'
import axios from 'axios'
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory'
import moment from 'moment'

// Components
import MenuBar from './MenuBar.jsx'
import AddCheckIn from './AddCheckIn.jsx'

class CheckIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      checked: false,
      today: new Date().toDateString(),
      goal: this.props.location.state.goal,
      goalId: this.props.match.params.id,
      checkins: [],
      date: new Date().toDateString(),
      weight: '',
      reps: '',
      sets: '',
      min: '',
      secs: '',
      goalTime: '',
      size: '',
      open: false
    }
    this.toggle = this.toggle.bind(this)
    this.show = this.show.bind(this)
    this.close = this.close.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchCheckIns = this.fetchCheckIns.bind(this)
    this.handleRemoveCheckIn = this.handleRemoveCheckIn.bind(this)
    this.handleCardioGoal = this.handleCardioGoal.bind(this)
    this.handleCompletedGoal = this.handleCompletedGoal.bind(this)
    this.handleGoalUpdate = this.handleGoalUpdate.bind(this)
    this.renderWeightGoalTarget = this.renderWeightGoalTarget.bind(this)
    this.renderCardioGoalTarget = this.renderCardioGoalTarget.bind(this)
    this.renderGoalTarget = this.renderGoalTarget.bind(this)
    this.renderCompleteMessage = this.renderCompleteMessage.bind(this)
    this.renderIcon = this.renderIcon.bind(this)
    this.renderVictoryChart = this.renderVictoryChart.bind(this)
    this.renderHeaderRow = this.renderHeaderRow.bind(this)
    this.renderTableRow = this.renderTableRow.bind(this)
  }

  componentDidMount () {
    this.fetchCheckIns()
    this.handleCardioGoal()
  }

  toggle () {
    const { checked } = this.state

    this.setState({
      checked: !checked
    })
  }

  show (size) {
    this.setState({
      size,
      open: true
    })
  }

  close () {
    this.setState({
      open: false
    })
  }

  handleChange (e, { name, value }) {
    this.setState({
      [name]: value
    })
  }

  handleSubmit () {
    const {
      goalId,
      date,
      weight,
      reps,
      sets,
      min,
      secs
    } = this.state

    axios
      .post('/api/checkin/', {
        goalId,
        date,
        weight,
        reps,
        sets,
        min,
        secs
      })
      .then((response) => {
        this.fetchCheckIns()
      })
      .catch((error) => {
        console.log(error)
      })

    this.close()

    this.setState({
      date,
      weight: '',
      reps: '',
      sets: '',
      min: '',
      secs: ''
    })
  }

  fetchCheckIns () {
    const { goalId } = this.state
    axios
      .get(`/api/checkin/${goalId}`)
      .then((response) => {
        this.setState({
          checkins: response.data
        }, () => { this.handleCompletedGoal() })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleRemoveCheckIn (id) {
    axios
      .delete(`/api/checkin/${id}`)
      .then((response) => {
        this.fetchCheckIns()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleCardioGoal () {
    const { goal, goalTime } = this.state

    if (goal.category === 'Cardio') {
      console.log('handling cardio goal')
      if (goal.min) {
        if (goal.secs) {
          this.setState({ goalTime: `${goal.min}.${goal.secs}` })
        } else {
          this.setState({ goalTime: `${goal.min} + 00` })
        }
      }
    }
  }

  handleCompletedGoal () {
    const { goal, checkins } = this.state

    const newGoalState = Object.assign({}, goal)

    if (goal.category === 'Strength') {
      if (goal.weightTarget && goal.repTarget) {
        for (let i = 0; i < checkins.length; i += 1) {
          if (checkins[i].weight >= goal.weightTarget && checkins[i].reps >= goal.repTarget) {
            newGoalState.complete = true
          }
        }
      } else if (goal.weightTarget && goal.repTarget === null) {
        for (let i = 0; i < checkins.length; i += 1) {
          if (checkins[i].weight >= goal.weightTarget) {
            newGoalState.complete = true
          }
        }
      } else if (goal.weightTarget === null && goal.repTarget) {
        for (let i = 0; i < checkins.length; i += 1) {
          if (checkins[i].reps >= goal.repTarget) {
            newGoalState.complete = true
          }
        }
      }
    } else if (goal.category === 'Cardio') {
      if (goal.minTarget && goal.secsTarget) {
        for (let i = 0; i < checkins.length; i += 1) {
          if (checkins[i].min <= goal.minTarget && checkins[i].secs <= goal.secsTarget) {
            newGoalState.complete = true
          }
        }
      } else if (goal.minTarget === null && goal.secsTarget) {
        for (let i = 0; i < checkins.length; i += 1) {
          if (checkins[i].secs <= goal.secsTarget) {
            newGoalState.complete = true
          }
        }
      } else if (goal.minTarget && goal.secsTarget === null) {
        for (let i = 0; i < checkins.length; i += 1) {
          if (checkins[i].min <= goal.minTarget) {
            newGoalState.complete = true
          }
        }
      }
    } else if (goal.category === 'Habit') {
      for (let i = 0; i < checkins.length; i += 1) {
        if (checkins[i].days) {
          if (checkins[i].days >= goal.target) {
            newGoalState.complete = true
          }
        }
      }
    }

    this.setState({
      goal: newGoalState
    }, () => { this.handleGoalUpdate() })
  }

  handleGoalUpdate () {
    const { goal, goalId } = this.state
    if (goal.complete) {
      axios
        .patch(`/api/goal/${goalId}`, {
          complete: goal.complete
        })
        .then((response) => {
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  renderWeightGoalTarget (goal) {
    if (goal.weightTarget && goal.repTarget) {
      return (
        `${goal.weightTarget} lbs. ${goal.repTarget} reps`
      )
    } else if (goal.weightTarget && goal.repTarget === null) {
      return (
        `${goal.weightTarget} lbs.`
      )
    } else if (goal.weightTarget === null && goal.repTarget) {
      return (
        `${goal.repTarget} reps`
      )
    }
  }

  renderCardioGoalTarget (goal) {
    if (goal.minTarget && goal.secsTarget) {
      return (
        `${goal.minTarget}:${goal.secsTarget}`
      )
    } else if (goal.minTarget === null && goal.secsTarget) {
      return (
        `00:${goal.secsTarget}`
      )
    } else if (goal.minTarget && goal.secsTarget === null) {
      return (
        `${goal.minTarget}:00`
      )
    }
  }

  renderGoalTarget (goal) {
    if (goal.category === 'Strength') {
      return (
        this.renderWeightGoalTarget(goal)
      )
    } else if (goal.category === 'Cardio') {
      return (
        this.renderCardioGoalTarget(goal)
      )
    } else if (goal.category === 'Habit') {
      return (
        `${goal.daysTarget} days`
      )
    }
  }

  renderCompleteMessage () {
    const { goal } = this.state
    if (goal.complete) {
      return (
        <h1 style={{ textAlign: 'center' }}>Congratulations! You've reached your goal!</h1>
      )
    }
  }

  renderIcon () {
    const { checked } = this.state
    if (checked) {
      return (
        <Icon color="green" name="checkmark" size="large" />
      )
    }
  }

  renderVictoryChart () {
    const { goal, checkins } = this.state
    const noCheckins = !Array.isArray(checkins) || !checkins.length

    if (!noCheckins) {
      if (goal.category === 'Cardio') {
        return (
          <VictoryChart
            theme={VictoryTheme.material}
          >
            <VictoryLine
              style={{
                data: { stroke: '#c43a31' },
                parent: { border: '1px solid #ccc' }
              }}
              data={checkins}
              x="date"
              y="min"
            />
          </VictoryChart>
        )
      } else if (goal.category === 'Strength') {
        return (
          <VictoryChart
            theme={VictoryTheme.material}
          >
            <VictoryLine
              style={{
                data: { stroke: '#c43a31' },
                parent: { border: '1px solid #ccc' }
              }}
              data={checkins}
              x="date"
              y="weight"
            />
          </VictoryChart>
        )
      }
    }
  }

  renderHeaderRow() {
    const { goal } = this.state

    if (goal.category === 'Habit') {
      return (
        <Table.Row>
          <Table.HeaderCell rowSpan="2">Date</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Check In</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Remove</Table.HeaderCell>
        </Table.Row>
      )
    } else if (goal.category === 'Cardio') {
      return (
        <Table.Row>
          <Table.HeaderCell rowSpan="2">Date</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Time</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Check In</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Remove</Table.HeaderCell>
        </Table.Row>
      )
    } else if (goal.category === 'Strength') {
      return (
        <Table.Row>
          <Table.HeaderCell rowSpan="2">Date</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Weight</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Reps</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Sets</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Check In</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Remove</Table.HeaderCell>
        </Table.Row>
      )
    }
  }

  renderTableRow () {
    const {
      today,
      goal,
      checkins
    } = this.state

    if (goal.category === 'Habit') {
      return (
        <Table.Body>
          {checkins.map(checkin => (
            <Table.Row key={checkin._id}>
              <Table.Cell>{checkin.date}</Table.Cell>
              <Table.Cell>{this.renderIcon()}</Table.Cell>
              <td><input type="button" onClick={() => { this.handleRemoveCheckIn(checkin._id) }} value="&times;" /></td>
            </Table.Row>
          ))}
        </Table.Body>
      )
    } else if (goal.category === 'Cardio') {
      return (
        <Table.Body>
          {checkins.map(checkin => (
            <Table.Row key={checkin._id}>
              <Table.Cell>{checkin.date}</Table.Cell>
              <Table.Cell>{checkin.secs === null || checkin.secs === 0 ? `${checkin.min}:00` : `${checkin.min}:${checkin.secs}`}</Table.Cell>
              <Table.Cell>{this.renderIcon()}</Table.Cell>
              <td><input type="button" onClick={() => { this.handleRemoveCheckIn(checkin._id) }} value="&times;" /></td>
            </Table.Row>
          ))}
        </Table.Body>
      )
    } else if (goal.category === 'Strength') {
      return (
        <Table.Body>
          {checkins.map(checkin => (
            <Table.Row key={checkin._id}>
              <Table.Cell>{checkin.date}</Table.Cell>
              <Table.Cell>{checkin.weight} lbs.</Table.Cell>
              <Table.Cell>{checkin.reps}</Table.Cell>
              <Table.Cell>{checkin.sets}</Table.Cell>
              <Table.Cell>{this.renderIcon()}</Table.Cell>
              <td><input type="button" onClick={() => { this.handleRemoveCheckIn(checkin._id) }} value="&times;" /></td>
            </Table.Row>
          ))}
        </Table.Body>
      )
    }
  }

  render () {
    const {
      today,
      goal,
      goalId,
      checkins,
      date,
      weight,
      reps,
      sets,
      min,
      secs,
      size,
      open
    } = this.state

    const textStyle = { textAlign: 'center' }

    return (

      <div>
        <MenuBar />

        <br /><br />

        {this.renderCompleteMessage()}

        <h2 style={textStyle}>{today}</h2>

        <h2 style={textStyle}>{goal.goals_name}</h2>

        <h2 style={textStyle}>Target: {this.renderGoalTarget(goal)}</h2>

        {this.renderVictoryChart()}

        <br /><br />

        <AddCheckIn
          goal={goal}
          goalId={goalId}
          date={date}
          weight={weight}
          reps={reps}
          sets={sets}
          min={min}
          secs={secs}
          size={size}
          open={open}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          show={this.show}
          close={this.close}
        />

        <br /><br />

        <Checkbox
          toggle
          label={<label>Click to check in for the day</label>}
          onClick={() => { this.toggle() }}
        />

        <Table>
          <Table.Header>
            {this.renderHeaderRow()}
          </Table.Header>
          {this.renderTableRow()}
        </Table>

      </div>
    )
  }
}

export default CheckIn
