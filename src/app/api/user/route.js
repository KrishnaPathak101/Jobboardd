import User from "@/models/User";
import { connectToDatabase } from "@/db/db";

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const { name, email, id } = data;

    if (!name || !email) {
      return new Response("Name and email must be provided", { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Return the existing user's data
      return new Response(JSON.stringify(existingUser), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    // Create and save a new user if no existing user is found
    const userData = new User({ name, email, id });
    await userData.save();
    return new Response(JSON.stringify(userData), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error saving user:", error);
    return new Response("Failed to save user", { status: 500 });
  }
}
