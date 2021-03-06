const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const db = require('knex')({
      client: 'pg',
      connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'test',
        database : 'smartbrain'
      }
});
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) =>{
});

app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', image.handleApiCall);

app.listen(3000, () =>{
   console.log('app is running on port 3000');
});