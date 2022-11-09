import mongoose from "mongoose";


const Saldo = mongoose.model('Inventario', {
    saldo:{type:Number, require:true},
    fecha: {type: String, require:true}
})


export { Saldo }
