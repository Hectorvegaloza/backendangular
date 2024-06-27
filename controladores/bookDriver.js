import multer from "multer";
import booksModel from "../modelos/booksModel.js";
import fs from "fs-extra";

const BookDriver = {
    createBook: async (solicitud, respuesta) => {
        try {
            const storage = multer.diskStorage({
                destination: 'pictures',
                filename: (req, file, cb) => {
                    cb(null, file.originalname);
                },
            });

            const carga = multer({ storage: storage }).single('Picture');
            carga(solicitud, respuesta, async (error) => {
                console.log('Request body:', solicitud.body);
                console.log('Request file:', solicitud.file);

                if (error) {
                    return respuesta.json({
                        resultado: 'failed',
                        mensaje: 'something went wrong',
                        datos: null,
                    });
                }

                if (!solicitud.file) {
                    return respuesta.json({
                        resultado: 'failed',
                        mensaje: 'File not provided',
                        datos: null,
                    });
                }

                const newBook = new booksModel({
                    Title: solicitud.body.Title,
                    Author: solicitud.body.Author,
                    Price: solicitud.body.Price,
                    Currency: solicitud.body.Currency,
                    Available: solicitud.body.Available,
                    Items: solicitud.body.Items,
                    Picture: solicitud.file.filename,
                });

                try {
                    const bookCreated = await newBook.save();
                    return respuesta.json({
                        resultado: 'successful',
                        mensaje: 'book created',
                        datos: bookCreated,
                    });
                } catch (saveError) {
                    console.error('Error saving book:', saveError);
                    return respuesta.json({
                        resultado: 'failed',
                        mensaje: 'Error saving book',
                        datos: saveError,
                    });
                }
            });
        } catch (error) {
            console.error('Error in createBook:', error);
            return respuesta.json({
                resultado: 'failed',
                mensaje: 'something went wrong',
                datos: error,
            });
        }
    },
         findBook: async (solicitud, respuesta) => {
            try {
                const bookFound = await booksModel.findById(solicitud.params.id) 
                if (bookFound.id) {
                    respuesta.json({
                        resultado: "successful",
                        mensaje: "book found",
                        datos: bookFound,
                    });
                }
            } catch (error) {
                respuesta.json({
                    resultado: "failed",
                    mensaje: "something went wrong",
                    datos: error,
                });
        }
    },

        findBooks: async (solicitud, respuesta) => {
            try {
            const listBooks = await booksModel.find();
            console.log("books found:", listBooks)
            respuesta.json({
                resultado: "successful",
                mensaje: "Books found",
                datos: listBooks
            });
            } catch (error) {
            respuesta.json({
                resultado: "failed",
                mensaje: "something went wrong",
                datos: error
            });
            }
        },
        updateBook: async (solicitud, respuesta) => {
            try {
                const bookUpdated = await booksModel.findByIdAndUpdate(
                    solicitud.params.id,
                    solicitud.body //file is also needed?
                );
                if(bookUpdated._id) {
                    respuesta.json({
                        resultado: 'successful',
                        mensaje: 'Book updated',
                        datos: bookUpdated
                    });
                }
            }catch (error) {
                respuesta.json({
                    resultado: "failed",
                    mensaje: 'something went wrong',
                    datos: error,
                });
            }
        },
        deleteBook: async (solicitud, respuesta) => {
            try {
            const bookDeleted = await booksModel.findByIdAndDelete(solicitud.params.id)
            if (bookDeleted._id) {
                await fs.unlink('pictures/' + bookDeleted.Picture)
                respuesta.json({
                resultado: "successful",
                mensaje: "book deleted",
                datos: bookDeleted
                });
            }          
            } catch (error) {
            respuesta.json({
            resultado: "failed",
            mensaje: "something went wrong",
            datos: error
            });
            }
        }
    }

export default BookDriver;