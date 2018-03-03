import React from 'react'
import { Header, Grid } from 'semantic-ui-react'

const CompetitionsList = ({ competitionName }) => {
  return (
    <Grid.Column textAlign="center">
      <Header as="h4">{competitionName.competitions_name}</Header>
      <p>
        <b>{`Ranking: ${competitionName.ranking}`}</b>
        <br />
        {`Progress: ${competitionName.progress}`}
      </p>
    </Grid.Column>
  )
}

export default CompetitionsList
