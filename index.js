const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')


const Person = require('./models/person')

app.use(bodyParser.json())

const cors = require('cors')

app.use(cors())

app.use(express.static('build'))

const morgan = require('morgan')

morgan.token('data', function (req) { return JSON.stringify(req.body) })

app.use(morgan(' :method :url :res[content-length] - :response-time ms :data' ))


let persons = [

      { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
    ]

app.post('/api/persons', (request, response, next) => {
        const body = request.body
        
        const alreadyInPhonebook = persons.find(person => person.name === body.name)  
       
        if (!body.name) {
            return response.status(400).json({ 
            error: 'name missing' 
            })
        } 
        if (!body.number) {
            return response.status(401).json({ 
            error: 'number missing' 
            })
        }
        if (alreadyInPhonebook){
            return response.status(400).json({ 
                error: 'name must be unique' 
                })
        }
    
        const person = new Person({
            name: body.name,
            number: body.number,
            id: generateId()
        })
          
        person
            .save()
            .then(savedPerson => savedPerson.toJSON())
            .then(savedAndFormattedPerson => {
                response.json(savedAndFormattedPerson)
            })
            .catch(error => next(error))
    })

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    });
});

app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
        res.send('<p>Phonebook has info for ' + persons.length + ' people </p>' + Date())
    })
   // res.send('<p>Phonebook has info for ' + persons.length + ' people </p>' + Date())
 })

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person.toJSON())
            } else {
                response.status(404).end()
            }
    })
    .catch(error => next(error))
})
    

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.floor(Math.random() * Math.floor(1000000))
        : 0
    const findId = persons.find(person => person.id === maxId)
    if (!findId){
        console.log(maxId)
        return maxId
        } else {
            generateId()
        }

    }    



app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person)
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'Cast Error' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message})
    }

    next(error)

}

app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})