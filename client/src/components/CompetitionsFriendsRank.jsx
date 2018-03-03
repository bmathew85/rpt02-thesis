import React from 'react'
import { Table, Image, Header } from 'semantic-ui-react'

const CompetitionsFriendsRank = () => {
  return(<Table basic="very" celled collapsing>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Leaders</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Header as="h4" image>
            <Image
              src="https://react.semantic-ui.com/assets/images/avatar/small/lena.png"
              rounded
              size="mini"
            />
            <Header.Content>
              Li
              <Header.Subheader>@li</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>1st</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as="h4" image>
            <Image
              src="https://react.semantic-ui.com/assets/images/avatar/small/matthew.png"
              rounded
              size="mini"
            />
            <Header.Content>
              Matt
              <Header.Subheader>@mattander91</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>2nd</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as="h4" image>
            <Image
              src="https://react.semantic-ui.com/assets/images/avatar/small/lindsay.png"
              rounded
              size="mini"
            />
            <Header.Content>
              Ramya
              <Header.Subheader>@ramyatata</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>3rd</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as="h4" image>
            <Image
              src="https://react.semantic-ui.com/assets/images/avatar/small/mark.png"
              rounded
              size="mini"
            />
            <Header.Content>
              Vitor
              <Header.Subheader>@vpereira</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>4th</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
  )
}

export default CompetitionsFriendsRank