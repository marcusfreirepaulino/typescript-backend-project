import express from 'express';

import { Database } from "./repositories/index";
const app = express();

// app.use('/get', () => {
//     console.log("foi")
//     const db = new Database();
//     db.get_user('mail@mail.com');
// }

app.use('/', () => {
    console.log("foi")
    const db = new Database();
    db.post_memberSquad('mail@mail.com');
})


app.listen(8000, ()=> console.log('tô on'));