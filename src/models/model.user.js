import mongoose, { model } from "mongoose";

//mongoose.connect('mongodb+srv://andres_mgDB:150193vasquezFV04@andrescluster.wkcwf.mongodb.net/arena-app?retryWrites=true&w=majority')

const User = mongoose.model('User', {

    username: { type: String, required: true, minlength: 3 },
    password: { type: String, required: true, minlength: 3 },

})

export { User } 