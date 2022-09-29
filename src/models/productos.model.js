import mongoose from "mongoose";

const Producto = mongoose.model('Producto', {

    nombre: { type: String, require: true, minlength: 3 },
    precio: {type: Number, require:true},
    existencia: {type: Number, require:true}

})

export { Producto }