const express = require('express')
const app = express()
const User = require('./Models/users')
const bcrypt = require('bcrypt')
const fs = require('fs')
const port = 2000
const mongoose = require('mongoose')
const { error } = require('console')
const connstring = 'mongodb+srv://amankwaajrcoudjoe:JxFvRz23Ju0uCT5b@cluster0.yzljveb.mongodb.net/'
mongoose.connect(connstring, {useNewUrlParser: true, useUnifiedTopology: true})
.then(client => {
    console.log('Connection established Successfully')
})
.catch(error => {
    console.error('Connection to Mongodb has failed')
})

app.use(express.json())



app.post('/users', async (rq, res) => {
    const newUser = req.body
    try{
        const newUserData = await User.create(newUser)
        res.status(201).json(newUserData)
    }
    catch(error)
    {
        res.status(500).json({error: 'error occured'})
    }
})

//Create a secure account
const saltRound = 10
app.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, saltRound)
    .then(hash => {
        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(result => {
           res.status(201).json({message: 'User saved successfuly', result:result})
        })
        .catch(error => {
            res.status(500).json({error: 'Failed '})
        })
    })
    .catch(err => {
        res.status(500).json({error: 'Failed to hash'})
    })
})


//Read from MongoDB
app.get('/users', (req, res)=>{
    Task.find()
    .then((newUser) => {
        res.json({
            message: "User found",
            newUser: newUser
        })
    })
})




//Delete from MongoDB with ID
app.delete('./users/:id', (req, res) => {
    Task.deleteOne({ id: req.params.id})
    .then((result) => {
        res.status (200).json({message: 'Task removed successfully'})
    })
})





console.log("Helo World!!!")

module.exports = app