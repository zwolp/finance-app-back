import * as express from 'express';
import { User } from './types/user';
const app = express();


app.get('/', (req, res) => {
  res.send(`Porównanie rocznych oszczędności:}`)
})

app.listen(3000)