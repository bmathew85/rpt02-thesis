import React, { Component } from 'react'
import { Menu, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class MenuBar extends Component {
  handleItemClick (name) {
    this.setState({ activeItem: name })
  }

  render (props) {
    const { activeItem } = this.state || {}
    return (
      <div>
        <Menu secondary>
          <Menu.Item
            as={Link}
            to="/userhome"
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/goals"
            name="goals"
            active={activeItem === 'goals'}
            onClick={this.handleItemClick}
          />
          <Menu.Item name="messages" active={activeItem === 'messages'} onClick={this.handleItemClick} />
          <Menu.Item name="friends" active={activeItem === 'friends'} onClick={this.handleItemClick} />
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
            <Link to="/">
              <button type="submit" className="ui button">Logout</button>
            </Link>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default MenuBar
