import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import CompetitionsPopUp from './CompetitionsPopUp.jsx'
import CompetitionsFullPage  from './CompetitionsPopUp.jsx'

class SideMenu extends Component {
  handleItemClick (name) {
    this.setState({ activeItem: name });
  }
  render (props) {
    console.log("is sidemenu component?", this.props.isHidden)
    const { activeItem } = this.state || {}
    return (
      <Menu style={{ width: 290 }} vertical>
        <Menu.Item>
          <Menu.Header>History</Menu.Header>
          <Menu.Menu>
            {this.props.accomplishments.map(goal => (
              <Menu.Item
                as={Link}
                to={`/goal/${goal._id}`}
                name={goal.goals_name}
                active={activeItem === goal}
                onClick={this.handleItemClick}
              >
                {goal.goals_name}
              </Menu.Item>
            ))}
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <CompetitionsPopUp
            goals={this.props.goals}
            competitionsHandleClick={this.props.competitionsHandleClick}
            isHidden={this.props.isHidden}
            Data={this.props.Data}
          />
        </Menu.Item>
      </Menu>
    );
  }
}

export default SideMenu
