import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

// Components
import GoalForm from './GoalForm.jsx'

const AddGoal = props => (
  <div>
    <Button primary circular icon="plus icon" onClick={() => { props.show('large') }} />

    <Modal open={props.open} onClose={props.close}>
      <Modal.Header>
            Create Your Goal
      </Modal.Header>
      <Modal.Content>
        <GoalForm
          close={props.close}
          goals={props.goals}
          handleSubmit={props.handleSubmit}
          handleChange={props.handleChange}
          handleStartDate={props.handleStartDateChange}
          handleEndDate={props.handleEndDateChange}
          handleDropDownChange={props.handleDropDownChange}
          handleTextArea={props.handleTextAreaChange}
          goal={props.goal}
          target={props.target}
          category={props.category}
          startDate={props.startDate}
          endDate={props.endDate}
          notes={props.notes}
        />
      </Modal.Content>
    </Modal>
  </div>
)

export default AddGoal
