import mongoose from "mongoose";

mongoose.connect('mongodb+srv://andres_mgDB:150193vasquezFV04@andrescluster.wkcwf.mongodb.net/arena-app?retryWrites=true&w=majority')

const Saldo = mongoose.model('Inventario', {
    saldo:{type:Number, require:true}
})


export { Saldo }
