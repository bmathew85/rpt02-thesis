import React, { Component } from 'react'
import { Table, Modal, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class GoalTable extends Component {
  constructor () {
    super()
    this.renderGoalName = this.renderGoalName.bind(this)
    this.renderWeightGoalTarget = this.renderWeightGoalTarget.bind(this)
    this.renderCardioGoalTarget = this.renderCardioGoalTarget.bind(this)
    this.renderGoalTarget = this.renderGoalTarget.bind(this)
  }

  renderGoalName (goal) {
    return (
      <Link to={{
        pathname: `/goal/${goal._id}`,
        state: { goal }
      }}
      >
        {goal.goals_name}
      </Link>
    )
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
        <Link to={{
          pathname: `/goal/${goal._id}`,
          state: { goal }
        }}
        >
          {this.renderWeightGoalTarget(goal)}
        </Link>
      )
    } else if (goal.category === 'Cardio') {
      return (
        <Link to={{
          pathname: `/goal/${goal._id}`,
          state: { goal }
        }}
        >
          {this.renderCardioGoalTarget(goal)}
        </Link>
      )
    } else if (goal.category === 'Habit') {
      return (
        <Link to={{
          pathname: `/goal/${goal._id}`,
          state: { goal }
        }}
        >
          {goal.daysTarget} days
        </Link>
      )
    }
  }

  render () {
    const { goals, handleRemoveGoal } = this.props
    return (
      <div>
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell rowSpan="2">Goal</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">Target</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">Category</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">Start Date</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">End Date</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">Notes</Table.HeaderCell>
              <Table.HeaderCell>Remove</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {goals.map(goal => (
              <Table.Row key={goal._id}>
                <Table.Cell>
                  {this.renderGoalName(goal)}
                </Table.Cell>
                <Table.Cell textAlign="left">
                  {this.renderGoalTarget(goal)}
                </Table.Cell>
                <Table.Cell>
                  <Link to={{
                    pathname: `/goal/${goal._id}`,
                    state: { goal }
                  }}
                  >
                    {goal.category}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={{
                    pathname: `/goal/${goal._id}`,
                    state: { goal }
                  }}
                  >
                    {goal.start_date ? goal.start_date.slice(0, 10) : ''}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={{
                    pathname: `/goal/${goal._id}`,
                    state: { goal }
                  }}
                  >
                    {goal.end_date ? goal.end_date.slice(0, 10) : ''}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={{
                    pathname: `/goal/${goal._id}`,
                    state: { goal }
                  }}
                  >
                    {goal.notes}
                  </Link>
                </Table.Cell>
                <td><input type="button" onClick={() => { this.props.show('large', goal._id) }} value="&times;" /></td>
                <Modal
                  open={this.props.openConfirm}
                  onClose={this.props.closeCancel}
                >
                  <Modal.Header>
                    Delete Your Goal
                  </Modal.Header>
                  <Modal.Content>
                    <div>Are you sure you want to delete your goal?</div>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button onClick={() => { this.props.closeCancel() }} color="red" inverted>
                      <Icon name="remove" /> No
                    </Button>
                    <Button onClick={() => { this.props.closeConfirm() }} color="green" inverted>
                      <Icon name="checkmark" /> Yes
                    </Button>
                  </Modal.Actions>
                </Modal>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <br /><br /><br />
      </div>
    )
  }
}

export default GoalTable
