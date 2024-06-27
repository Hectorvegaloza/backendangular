import { Schema, model } from "mongoose";

const bookSchema= new Schema(
    {
        Title: {type: String, required: true},
        Author: {type: String, required: true},
        Price: {type: Number, required: true},
        Currency: {type: String},
        Available: {type: Boolean, required: true},
        Items: {type: Number, required: true},
        Picture: {type: String, required: true}
    }, {versionKey: false, timestamps: true})

export default model ('books', bookSchema);