import express from 'express';

import mongoose from 'mongoose';

import {loginValidation, postCreateValidation, registerValidation} from './validations.js';

import checkAuth from './utils/checkAuth.js';

import * as UserController from './controlers/UserController.js';
import * as PostController from './controlers/PostController.js';

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.vnrtjli.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => console.log('DB OK'))
.catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/login',loginValidation, UserController.login);
app.get('/auth/me',checkAuth, UserController.getMe);
app.post('/auth/register', registerValidation, UserController.register);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts',checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id',checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, PostController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK');
});