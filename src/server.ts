import express from 'express';
import router from './routes';

import { Database } from "./repositories/index";
const app = express();

app.use('/get', () => {
    console.log("foi")
    const db = new Database();
    db.get_unic('mail@mail.com');
})

app.use('/', () => {
    console.log("foi")
    const db = new Database();
    db.post_insert('mail@mail.com');
})

app.use(router);
app.listen(8000, ()=> console.log('tô on'));