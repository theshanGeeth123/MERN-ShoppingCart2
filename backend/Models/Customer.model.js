import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age:{
        type: Number,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }

});

const Customer = mongoose.model("CustomerModel", customerSchema);

export default Customer;