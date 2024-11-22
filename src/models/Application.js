import { mongoose } from "mongoose";

const applicationSchema = new mongoose.Schema({
   
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    coverLetter: {
        type: String,
        required: true,
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    jobPoster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

if (mongoose.models?.Application) {
    delete mongoose.models?.Application;
}

const Application = mongoose.model('Application', applicationSchema);
export default Application;

