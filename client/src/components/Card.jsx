import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'

const CardComponent = () => (
  <div>
    <Card>
      <Image src="https://react.semantic-ui.com/assets/images/avatar/large/matthew.png" />
      <Card.Content>
        <Card.Header>
          Manny
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
  </div>
)

export default CardComponent
