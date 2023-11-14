const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())
require('dotenv').config();

// Create a custom Morgan token for logging request body
morgan.token('req-body', (req, res) => JSON.stringify(req.body));

// Use Morgan middleware with the custom token
app.use(morgan(':method :status :response-time ms - :req-body'));

// Your other middleware and route handlers go here
let phonebook=[
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]
app.get("/api/persons",(request,response)=>{
    
    response.status(200).json(phonebook).end()
    
    
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const filteredPersons = phonebook.filter(person => person.id !== id)
    const findPerson=phonebook.find((person)=>person.id == id)
    phonebook=filteredPersons
    if (findPerson){
        response.status(200)
        
    }
    else{
        
        response.send('<h1>deleting a non-existing person</h1>')
    }
    
    
    
})

app.get("/api/info",(request,response)=>{
    
    const length=phonebook.length
    const currentDateTime = new Date().toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' });
    console.log('Current Date and Time:', currentDateTime);
    
    
    
    
    
    response.status(200).send(`<h1> this  phonebook has  ${length} people</h1><br>
<p>the time is ${currentDateTime}</p>


`)});
app.get("/api/persons/:id",(request,response)=>{
    
    const id=parseInt(request.params.id)
    const personFound=phonebook.find((person)=>{
        person.id === id
        
        
    });
    
    if (personFound){
        response.status(200).json(personFound)
        
        
    }
    else{
        
        response.status(404);
        
    }
    
    
})
app.post("/api/persons", (request, response) => {
    let newPerson = request.body;
    newPerson.id =  Math.floor(Math.random() * 100000000000);
    
    // Use push to add the new person to the array
    phonebook.push(newPerson);
    
    response.json(newPerson);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});