import * as express from 'express'
import { Admin } from '../libs/admin'
import { hash } from '../utils/hash';
import { salt } from '../utils/salt';
// import { Product } from '../libs/product';

export const adminRouter = express.Router()
  .post('/login', async (req, res) => {
    const data = await Admin.get(req.body.name);
    if (await data === null) {
      res.json(false)
    } else {
    res.json(hash(req.body.password, salt) === data.password);
    };
  })
  .get('/articles', async (req, res) => {
    const articles = await Admin.getArticles();
    res.json(articles ? articles : []);
  })
  .post('/add-article', async (req, res) => {
    const id = await Admin.addArticle(req.body.title, req.body.description, req.body.date)
    return res.json(id);
  })
  .delete('/article/:id', async (req, res) => {
    const deleted = Admin.deleteArticle(req.params.id)
    res.json(deleted);
  })
  // .post('/add-product', async (req, res) => {
  //   const product = new Product(req.body);
  //   const id = product.add();
  //   res.json(id);
  // })