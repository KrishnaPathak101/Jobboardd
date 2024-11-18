import { connectToDatabase } from "@/db/db";
import Organization from "@/models/organization";
import User from "@/models/User";

export async function POST(req) {
    try {
        // Connect to the database
        await connectToDatabase();

        // Get data from request body
        const data = await req.json();
        const { orgName, orgEmail, userId } = data;

        // Validate required fields
        if (!userId) {
            return new Response("Name and email must be provided", { status: 400 });
        }

        // Check if the organization already exists
        const existingOrg = await Organization.find({ UserId: userId });
        if (existingOrg) {
            return new Response(
                JSON.stringify({  existingOrg }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Create a new organization
        const orgData = new Organization({ name: orgName, email: orgEmail, UserId : userId });
        await orgData.save();

        // Return success response with the created organization data
        return new Response(JSON.stringify(orgData), { status: 201 });

    } catch (error) {
        console.error(error);

        // Return a response in case of error
        return new Response(JSON.stringify({ message: 'Server error', error: error.message }), { status: 500 });
    }
}

export async function GET(req) {
    try {
        // Connect to the database
        await connectToDatabase();
        
        const data = await req.json();
        const {userId} = data;
        // Fetch all organizations
        const organizations = await Organization.find({userId});

        // Return success response with the fetched organizations
        return new Response(JSON.stringify(organizations), { status: 200, headers: { "Content-Type": "application/json" } });
        
    } catch (error) {
        console.error(error);

        // Return a response in case of error
      
        return new Response(JSON.stringify({ message: 'Server error', error: error.message }), { status: 500 });
    }
}