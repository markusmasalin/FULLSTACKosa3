const express = require('express')
const app = express()

app.use(express.static('build'))


const bodyParser = require('body-parser')

const morgan = require('morgan')

morgan.token('data', function (req) { return JSON.stringify(req.body) })

app.use(bodyParser.json())


app.use(morgan(' :method :url :res[content-length] - :response-time ms :data' ))

const cors = require('cors')

app.use(cors())


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
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
    })

app.get('/info', (req, res) => {
    res.send('<p>Phonebook has info for ' + persons.length + ' people </p>' + Date())
    })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
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

app.post('/api/persons', (request, response) => {
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
    

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
      }
    
      persons = persons.concat(person)
      
        response.json(person)
      })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})