import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import bodyParser from 'body-parser'
import expressLogging from 'express-logging'
import logger from 'logops'
import { StaticRouter } from 'react-router-dom'

import Root from '../client/Root.jsx'
import {
  GoalsModel,
  CompetitionsModel,
  CategoriesModel
} from '../database/index.js'

// import GoalsModel from '../database/models/goals'
// import CompetitionsModel from '../database/models/competitions.js'
const db = require('../database/index.js')

const app = express()

app.use(expressLogging(logger))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const emptyObj = []

const getDefaultPictures = () => {
  CategoriesModel.find({}, (err, data) => {
    defaultPicsInDb: data[0].competitions_pictures
    if (err) {
      console.log(err)
    } else {
      console.log('default images coming back', defaultPicsInDb)
    }
  })
}

console.log("checking my mofo function return", getDefaultPictures.defaultPicsInDb)

app.get('/api/test', (req, res) => {
  CategoriesModel.find({}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send(data)
    }
  })
})

app.get('/api/goal', (req, res) => {
  GoalsModel.find({}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send(data)
    }
  })
})

app.get('/api/getcompetitions', (req, res) => {
  CompetitionsModel.find({}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send(data)
    }
  })
})

app.post('/api/competitions', (req, res) => {
  const competitionBody = req.body
  console.log('from the server side post body competitions', competitionBody)
  const competitionsModelInstance = new CompetitionsModel({
    competitions_name: competitionBody.comptetionName,
    competitions_category: competitionBody.competitionCategory,
    competitions_start_date: competitionBody.competitionStart,
    competitions_end_date: competitionBody.competitionEnd
  })
  competitionsModelInstance.save((err) => {
    if (err) {
      console.log('competitions not saved', err)
    } else {
      //find the categor in category model save it to a variable
      CompetitionsModel.find({}, function (error, data) {
        if (error) {
          console.log(error)
        } else {
          data
          //declare empty array to hold the data passed in the send func below
          //iterate through data[i]
          //if data.[i].competitions_category ===
          //then pull data from the category model from line 70
          //loop through data
          //if competitionBody.competitionCategory === the key of of the loop from db

          console.log('all my data from db to server', data)
          res.status(201).json(data)
        }
      })
    }
  })
})

app.post('/api/goal', function (req, res) {
  const goalTitle = req.body.goal
  const goalTarget = req.body.target
  const goalCategory = req.body.category
  console.log(goalCategory)

  const goalModelInstance = new GoalsModel({
    goals_name: goalTitle,
    target: goalTarget,
    category: goalCategory
  })

  goalModelInstance.save(function (err) {
    if (err) {
      console.log(err)
    } else {
      res.sendStatus(201)
    }
  })
})

app.get('*', (req, res) => {
  const context = {}
  const application = renderToString(<StaticRouter location={req.url} context={context} ><Root /></StaticRouter>)

  const html = `<!doctype html>
    <html class="no-js" lang="">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Compete.ly</title>
        <meta name="description" content="">
        <meta name="viewport"
        content="width=device-width,  initial-scale=1">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css">
      </head>
      <body>
        <div id="root">${application}</div>
        <script src="http://localhost:3001/client.js"></script>
      </body>
    </html>`
  res.send(html)
})

export default app
