import mongoose from "mongoose";

const Cuadrar = mongoose.model('cuadrar',{

    totalDinero: { type: Number, required: true, minlength: 3 },
    totalBilletes: {type: String, required: true, minlength: 3},
    totalMonedas: {type: String, required: true, minlength: 3},
    fecha : {type: String, require:true, minlength:3}
})

export { Cuadrar }