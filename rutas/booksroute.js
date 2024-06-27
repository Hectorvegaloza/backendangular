import { Router } from "express";
import BookDriver from "../controladores/bookDriver.js";

const booksRoute = Router();

booksRoute.post('/', BookDriver.createBook);
booksRoute.get('/:id', BookDriver.findBook);
booksRoute.get('/', BookDriver.findBooks);
booksRoute.put('/:id', BookDriver.updateBook);                  
booksRoute.delete('/:id', BookDriver.deleteBook);

export default booksRoute;