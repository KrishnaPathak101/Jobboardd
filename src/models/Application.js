import { mongoose } from "mongoose";

const applicationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    jobId: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: { // Updated field name
        type: String,
        required: true,
    },
    coverLetter: { // Updated field name
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Delete existing model to apply schema changes during development
if (mongoose.models?.Application) {
    delete mongoose.models?.Application;
}

// Define the model and export it
const Application = mongoose.model('Application', applicationSchema);
export default Application;
