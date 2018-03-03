import React, { Component } from 'react'
import { Form, Button, Dropdown, TextArea, Icon, Header, Modal, Statistic, Popup } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import InputMoment from 'input-moment'
// import 'react-datepicker/dist/react-datepicker.css'

// data
import categoryData from '../data/categories'

class GoalForm extends Component {
  constructor (props) {
    super(props)

    this.state = { categories: categoryData }
    this.renderTargets = this.renderTargets.bind(this)
  }

  renderTargets () {
    const { category } = this.props
    if (category === 'Strength') {
      return (
        <Form.Group>
          <Form.Input
            width="3"
            fluid
            label="Weight"
            name="weightTarget"
            value={this.props.weightTarget}
            onChange={this.props.handleChange}
          />
          <Form.Input
            width="3"
            fluid
            label="Reps"
            name="repTarget"
            value={this.props.repTarget}
            onChange={this.props.handleChange}
          />
        </Form.Group>
      )
    } else if (category === 'Cardio') {
      return (
        <Form.Group>
          <Form.Input
            width="3"
            fluid
            label="Minutes"
            name="minTarget"
            value={this.props.minTarget}
            onChange={this.props.handleChange}
          />
          <Form.Input
            width="3"
            fluid
            label="Seconds"
            name="secsTarget"
            value={this.props.secsTarget}
            onChange={this.props.handleChange}
          />
        </Form.Group>
      )
    } else if (category === 'Habit') {
      return (
        <Form.Group>
          <Form.Input
            width="3"
            fluid
            label="Days"
            name="daysTarget"
            value={this.props.daysTarget}
            onChange={this.props.handleChange}
            placeholder="(e.g. 30 days)"
          />
        </Form.Group>
      )
    }
  }

  render () {
    return (
      <div>
        <Form onSubmit={this.props.handleSubmit}>
          {/* Input Fields */}
          <Form.Group inline>
            <Form.Input
              width="3"
              fluid
              label="Goal"
              name="goal"
              value={this.props.goal}
              onChange={this.props.handleChange}
              placeholder="(e.g. lose 10lbs.)"
            />
          </Form.Group>

          {/* Dropdown */}
          <Form.Group>
            <Dropdown
              onChange={this.props.handleDropDownChange}
              selection
              value={this.props.category}
              label="Categories"
              options={this.state.categories}
              placeholder="Categories"
            />
          </Form.Group>

          {/* Target Inputs */}
          {this.renderTargets()}

          {/* Dates */}
          <Form.Group inline>
            {/* <Icon name="calendar" color="blue" size="large" /> */}
            <Popup
              on="click"
              trigger={
                <Form.Input
                  type="text"
                  value={this.props.startDate.format('MMMM DD YYYY')}
                  readOnly
                  fluid
                  label="Choose Start Date"
                  placeholder="Start Date"
                />
              }
              content={
                <InputMoment
                  moment={this.props.startDate}
                  onChange={this.props.handleStartDate}
                  minStep={5}
                />
              }
              position="bottom center"
            />
            <Popup
              on="click"
              trigger={
                <Form.Input
                  type="text"
                  value={this.props.endDate.format('MMMM DD YYYY')}
                  readOnly
                  fluid
                  label="Choose End Date"
                  placeholder="End Date"
                />
              }
              content={
                <InputMoment
                  moment={this.props.endDate}
                  onChange={this.props.handleEndDate}
                  minStep={5}
                />
              }
              position="top left"
            />
          </Form.Group>
          {/* Notes */}
          <TextArea
            width="6"
            label="Notes"
            value={this.props.notes}
            onChange={this.props.handleTextArea}
            placeholder="Additional info here..."
          />

          {/* Submit */}
          <Button primary>Add +</Button>
          <Button secondary onClick={() => { this.props.close() }}>Cancel</Button>
        </Form>

      </div>
    )
  }
}

export default GoalForm
