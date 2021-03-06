const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const newName = process.argv[3]

const newNumber = process.argv[4]

const url =
  `mongodb+srv://Erkki:${password}@cluster0-asfdb.mongodb.net/person-app?retryWrites=true`


mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length<4) {
    console.log('phonebook:')
    Person 
    .find({})
    .then(persons=> {
        persons.forEach(name => {
            console.log(name.name, name.number)
        })
        mongoose.connection.close()
    })
   
} else {

const person = new Person({
    name: newName,
    number: newNumber
  })
  
  person.save().then(response => {
    console.log(`added ${newName} number ${newNumber} to phonebook `);
    mongoose.connection.close();
  })
}



