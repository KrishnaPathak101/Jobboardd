const { mongoose } = require("mongoose");

const organizationSchema = new mongoose.Schema({
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
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

// Delete existing model to apply schema changes during development
if (mongoose.models.Organization) {
    delete mongoose.models.Organization;
}

// Define the model
const Organization = mongoose.model('Organization', organizationSchema);

export default Organization;
