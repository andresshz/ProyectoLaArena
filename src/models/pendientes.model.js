import mongoose from "mongoose";


const Pendientes = mongoose.model('pendientes', {
    nombre: { type: String, required: true, minlength: 3 },
    descripcion: { type: String, required: true, minlength: 3 },
    total: { type: Number, required: true, minlength: 3 },
    fecha: { type: String, require:true}
})

export { Pendientes }