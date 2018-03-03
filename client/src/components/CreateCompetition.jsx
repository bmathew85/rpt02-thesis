import React from 'react'
import {Redirect} from 'react-router-dom'
import { Header, Modal, Statistic, Form, Popup } from 'semantic-ui-react'
import DefaultCompeteCategories from '../../DefaultCompeteCategories.js'
import moment from 'moment'
import InputMoment from 'input-moment'

const CreateCompetition = ({
  isHidden,
  userId,
  compName,
  compCat,
  compStart,
  compEnd,
  handleCompName,
  handleCompCat,
  handleCompStartSave,
  compStartClick,
  handleCompEndSave,
  compEndClick,
  handleStartChange,
  handleEndChange,
  competitionsSubmit
}) => {
  return (
    <Modal
      dimmer={false}
      trigger={
        <Statistic>
          <Statistic.Value text>
            <i className="plus icon" />
          </Statistic.Value>
          <Statistic.Label>Create Competition</Statistic.Label>
        </Statistic>
      }
      closeIcon
    >
      <Header className="plus icon" content="Create a Competition" />
      <Modal.Content>{console.log('fron props in create competition component', compName, compCat, compStart, compEnd, compStartClick, compEndClick, 'ishidden', isHidden)}
        <Form
          onSubmit={competitionsSubmit.bind(null, compName, compCat, compStart, compEnd, isHidden, userId)}
        >
          <Form.Group widths="equal">
            <Form.Input
              fluid
              type="text"
              onChange={handleCompName}
              label="Competition Name"
              placeholder="Competition Name"
            />
            <Form.Dropdown
              fluid
              type="text"
              label="Choose Category"
              selection
              options={DefaultCompeteCategories}
              placeholder="Category"
              onChange={handleCompCat}
            />
            <Popup
              on="click"
              trigger={
                <Form.Input
                  type="text"
                  value={compStart.format('MMMM DD YYYY')}
                  readOnly
                  fluid
                  label="Choose Start Date"
                  placeholder="Start Date"
                />
              }
              content={
                <InputMoment
                  moment={compStart}
                  onChange={handleStartChange}
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
                  value={compEnd.format('MMMM DD YYYY')}
                  readOnly
                  fluid
                  label="Choose End Date"
                  placeholder="End Date"
                />
              }
              content={
                <InputMoment
                  moment={compEnd}
                  onChange={handleEndChange}
                  minStep={5}
                />
              }
              position="top left"
            />
          </Form.Group>
          <Form.Button
            color="green"
            content="Add Competition"
            type="submit"
          />
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default CreateCompetition
