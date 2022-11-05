import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
mongoose.connect(process.env.MONGODB)

const Cuadrar = mongoose.model('cuadrar',{

    totalDinero: { type: Number, required: true, minlength: 3 },
    totalCantidadDinero: {type: Number, required: true, minlength: 3},

})

export { Cuadrar }