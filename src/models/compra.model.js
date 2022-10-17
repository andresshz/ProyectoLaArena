import mongoose from "mongoose";

const Compra = mongoose.model('Compra', {
    nombreCompra: { type: String, required: true, minlength: 3 },
    total: { type: Number, required: true, minlength: 3 },
    fecha: { type: String, require:true}
})

export { Compra }