import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import bodyParser from 'body-parser'
import expressLogging from 'express-logging'
import logger from 'logops'
import { StaticRouter } from 'react-router-dom'
import fs from 'fs'
import multer from 'multer'

// import App from '../client/src/components/App.jsx'

import Root from '../client/Root.jsx'
import {
  GoalsModel,
  CheckInModel,
  CompetitionsModel,
  CategoriesModel
} from '../database/index.js'
import path from 'path';
import cookieParser from 'cookie-parser'
import expressValidator from 'express-validator';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';

// import GoalsModel from '../database/models/goals'
// import CompetitionsModel from '../database/models/competitions.js'
const db = require('../database/index.js')
// const routes = require('../routes/index');
// const users = require('../routes/users');

import usersRouter from '../routes/users';
// import Goal from '../client/src/components/Goal';


//Init App
const app = express();

//BodyParser Middlewar
app.use(expressLogging(logger));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

//View Engine
// app.set('views', path.join(__dirname, 'views'));
// app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
// app.set('view engine', 'handlebars');

//Set Public Folder
// app.use(express.static(path.join(__dirname, 'public')));

//Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}))

// Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Validator

// app.use(expressValidator({
//   errorFormatter: function(param, msg, value){
//     var namespace = param.split('.')
//     , root = namespace.shift()
//     , formParam = root;

//     while(namespace.length) {
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return{
//       param : formParam,
//       msg : msg,
//       value : value
//     };
//   }
// }))

// Connect Flash
// app.use(flash())

// Global Vars
// app.use(function (req, res, next) {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   res.locals.user = req.user || null;
//   next();
// });

app.use('/users' , usersRouter)
// app.use('/', Root);
// app.use('/users', (req, res) => {
//   res.send('Hello homeboy g money')
// });

const emptyObj = []

app.get('/api/goal', (req, res) => {
  GoalsModel.find({}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send(data)
    }
  })
})

// app.use(multer({ dest: './uploads/',
//  rename: function (fieldname, filename) {
//    return filename;
//  },
// }))

// app.post('/api/photo',function(req,res){
//  var newProfilePic = new userSchema()
//  newProfilePic.img.data = fs.readFileSync(req.files.userPhoto.path)
//  newProfilePic.img.contentType = 'image/png'
//  newProfilePic.save();
// })
// if (err) {
//       console.log(err)
//     } else {
//       const competitionsModelInstance = new CompetitionsModel({
//         competitions_name: competitionBody.comptetionName,
//         competitions_category: competitionBody.competitionCategory,
//         competitions_start_date: competitionBody.competitionStart,
//         competitions_end_date: competitionBody.competitionEnd,
//         competitions_pictures: matchingCategory
//       })


app.get('/api/getcompetitions', (req, res) => {
  CompetitionsModel.find({}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send(data)
    }
  })
})

/*function that has to map into login and/or registers user id*/
app.get("/api/getGoalsCompetitionsUserId", (req, res, next) => {
  let dataCompUserGoals = []
  let userIdInDB = "5a989cc204ac7563fae85f68"

  dataCompUserGoals.push(userIdInDB)

  CompetitionsModel.find({ competitions_user: userIdInDB })
    .then(function(data) {
    dataCompUserGoals.push(data)
    return GoalsModel.find({goals_user: userIdInDB})
   })
   .then(function(data) {
     dataCompUserGoals.push(data)
     res.send(dataCompUserGoals)
   })
  .catch(function(err) {
    console.log(err, 'this is the promise error')
    res.send(err)
  })


  // , (err, data) => {
	// 	if (err) {
	// 		console.log(err)
	// 	} else {
  //     //
  //     console.log('newest data from sercer', data)
  //     dataCompUserGoals.push(data)
	// 	}
  // }).
  // res.send(dataCompUserGoals)
})

app.get('/api/checkin/:id', (req, res) => {
  CheckInModel.find({ goal: req.params.id }, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send(data)
    }
  })
})

app.post('/api/competitions', (req, res) => {
  const competitionBody = req.body
  let matchingCategory = ''

  CategoriesModel.find({}, (err, defaultPics) => {
    let defaultPicsInDb = defaultPics[0].competitions_pictures
    let userSubbedCategory = competitionBody.competitionCategory

    for (let i = 0; i <= defaultPicsInDb.length -1; i++) {
      if (userSubbedCategory == Object.keys(defaultPicsInDb[i])) {
        matchingCategory = defaultPicsInDb[i][userSubbedCategory]
      }
    }
    if (err) {
      console.log(err)
    } else {
      const competitionsModelInstance = new CompetitionsModel({
				competitions_name: competitionBody.comptetionName,
				competitions_category: competitionBody.competitionCategory,
				competitions_start_date: competitionBody.competitionStart,
				competitions_end_date: competitionBody.competitionEnd,
				competitions_pictures: matchingCategory,
				competitions_user: competitionBody.userIdComp
			});
      competitionsModelInstance.save((err) => {
        if (err) {
          console.log('competitions not saved', err)
        } else {
          CompetitionsModel.find({}, function (err, data) {
            if (err) {
              console.log(err)
            } else {
              console.log('from server file data coming back from DB', data)
              res.status(201).json(data)
            }
          })
        }
      })   //find the categor in category model save it to a variable
    }
  })
})

app.post('/api/goal', (req, res) => {
  const goalTitle = req.body.goal
  const weightTarget = req.body.weightTarget
  const repTarget = req.body.repTarget
  const minTarget = req.body.minTarget
  const secsTarget = req.body.secsTarget
  const daysTarget = req.body.daysTarget
  const goalCategory = req.body.category
  const goalStartDate = req.body.startDate
  const goalEndDate = req.body.endDate
  const goalNotes = req.body.notes
  const goalComplete = req.body.complete
  let userId = req.body.userId

  const goalModelInstance = new GoalsModel({
    goals_name: goalTitle,
    weightTarget,
    repTarget,
    minTarget,
    secsTarget,
    daysTarget,
    category: goalCategory,
    start_date: goalStartDate,
    end_date: goalEndDate,
    notes: goalNotes,
    complete: goalComplete,
    goals_user: userId
  })

  goalModelInstance.save((err) => {
    if (err) {
      console.log(err)
    } else {
      res.sendStatus(201)
    }
  })
})

app.post('/api/checkin', (req, res) => {
  const goalId = req.body.goalId
  const checkInDate = req.body.date
  const checkInWeight = req.body.weight
  const checkInReps = req.body.reps
  const checkInSets = req.body.sets
  const checkInMin = req.body.min
  const checkInSecs = req.body.secs

  const checkIn = new CheckInModel({
    goal: goalId,
    date: checkInDate,
    weight: checkInWeight,
    reps: checkInReps,
    sets: checkInSets,
    min: checkInMin,
    secs: checkInSecs
  })

  checkIn.save((err) => {
    if (err) {
      console.log(err)
    } else {
      res.sendStatus(201)
    }
  })
})

app.post('/api/checkin', (req, res) => {
  const goalId = req.body.goalId
  const checkInDate = req.body.date
  const checkInWeight = req.body.weight
  const checkInReps = req.body.reps
  const checkInSets = req.body.sets
  const checkInMin = req.body.min
  const checkInSecs = req.body.secs

  const checkIn = new CheckInModel({
    goal: goalId,
    date: checkInDate,
    weight: checkInWeight,
    reps: checkInReps,
    sets: checkInSets,
    min: checkInMin,
    secs: checkInSecs
  })

  checkIn.save((err) => {
    if (err) {
      console.log(err)
    } else {
      res.sendStatus(201)
    }
  })
})

app.patch('/api/goal/:id', (req, res) => {
  const complete = req.body.complete

  GoalsModel.update({ _id: req.params.id }, { $set: { complete } }, (err) => {
    if (err) {
      console.log(err)
    } else {
      res.sendStatus(202)
    }
  })
})

app.delete('/api/goal/:id', (req, res) => {
  GoalsModel.remove({ _id: req.params.id }, (err) => {
    if (err) {
      console.log(err)
    } else {
      CheckInModel.remove({ goal: req.params.id }, () => {
        if (err) {
          console.log(err)
        } else {
          res.sendStatus(200)
        }
      })
    }
  })
})

app.delete('/api/checkin/:id', (req, res) => {
  CheckInModel.remove({ _id: req.params.id }, (err) => {
    if (err) {
      console.log(err)
    } else {
      CheckInModel.remove({ goal: req.params.id }, () => {
        if (err) {
          console.log(err)
        } else {
          res.sendStatus(200)
        }
      })
    }
  })
})

app.delete('/api/checkin/:id', (req, res) => {
  CheckInModel.remove({ _id: req.params.id }, (err) => {
    if (err) {
      console.log(err)
    } else {
      res.sendStatus(200)
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
        <link rel="stylesheet" type="text/css" href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
      </head>
      <body>
        <script src="//unpkg.com/moment@2.10.6/min/moment-with-locales.min.js"></script>
        <div id="root">${application}</div>
        <script src="http://localhost:3001/client.js"></script>
      </body>
    </html>`
  res.send(html)
})

export default app
