import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Delete existing model to apply schema changes during development
if (mongoose.models?.User) {
    delete mongoose.models?.User;
}

// Define the model
const User = mongoose.model('User', userSchema);

export default User;
