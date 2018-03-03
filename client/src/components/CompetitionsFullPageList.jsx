import React from 'react'
import { Header, Image, Grid, Progress, Divider } from 'semantic-ui-react'
import CompetitionsFriendsRank from './CompetitionsFriendsRank.jsx'
import moment from 'moment'

const CompetitionsFullPageList = ({ CompetitionsFp }) => {
  console.log('competitions fullpage list', CompetitionsFp)
  return (<div>
    <Grid columns={3} divided>
      <Grid.Row>
        <Grid columns={2} padded>
          <Grid.Column>
            <Image src={CompetitionsFp.competitions_pictures} />
            <Header as="h5">{CompetitionsFp.competitions_category}</Header>
          </Grid.Column>
          <Grid.Column>
            <Header size="large">{CompetitionsFp.competitions_name}</Header>
          </Grid.Column>
        </Grid>
        <Grid.Column>
          <Header size="large">Started On</Header>
          {moment(CompetitionsFp.competitions_start_date).format('MMMM DD YYYY')}
          <Header size="large">Ends On</Header>
          {moment(CompetitionsFp.competitions_end_date).format('MMMM DD YYYY')}
          <Progress percent={CompetitionsFp.progress} progress />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Divider />
  </div>
  )
}

export default CompetitionsFullPageList
