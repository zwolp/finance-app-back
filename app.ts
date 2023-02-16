import * as express from 'express';
import { FinancialData } from './libs/finance';
import { PersonalData } from './libs/personal';
import { User } from './types/user';

const app = express();
//app.use(express.json());

const marian: User = {
  personal: new PersonalData('Marian', 'Paździoch', 'Sprzedawca majtek'),
  finance: new FinancialData(1880, 730, 320)
}
const john: User = {
  personal: new PersonalData('John', 'Travolta', 'postman'),
  finance: new FinancialData(3100, 1800, 22)
}

app.get('/', (req, res) => {
  res.send(`Porównanie rocznych oszczędności: ${marian.personal.name} ${marian.finance.annualSavings} oraz ${john.personal.name} ${john.finance.annualSavings}`)
})

app.listen(3000)