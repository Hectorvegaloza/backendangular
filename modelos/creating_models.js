import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const payment_schema= new mongoose.Schema(
    {
        card_number: {type: Number, required: true},
        cvc: {type: Number, required: true},
        expiration_date: {type: Date, required: true},
        email_address: {type: String},
    }
)

console.log("version mongoose es :",mongoose.version);

export default model ("Payment", payment_schema);