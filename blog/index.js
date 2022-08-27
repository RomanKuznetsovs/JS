import express from 'express';

import mongoose from 'mongoose';

import {registerValidation} from './validations/auth.js';

import checkAuth from './utils/checkAuth.js';

import * as UserController from './controlers/UserController.js';

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.vnrtjli.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => console.log('DB OK'))
.catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/login', UserController.login);

app.get('/auth/me',checkAuth, UserController.getMe);

app.post('/auth/register', registerValidation, UserController.register);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK');
});