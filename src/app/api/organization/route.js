import { connectToDatabase } from "@/db/db";
import Organization from "@/models/organization";

export async function POST(req) {
    try {
        // Connect to the database
        await connectToDatabase();

        // Get data from request body
        const data = await req.json();
        const { orgName, orgEmail, userId } = data;

        // Validate required fields
       

        // Check if the user already has an organization
        if(userId && !orgName && !orgEmail) {
            const existingOrg = await Organization.find({ UserId: userId });
            if (existingOrg) {
                return new Response(JSON.stringify(existingOrg), { status: 200, headers: { "Content-Type": "application/json" } });
            }
        }

        // Check how many organizations the user already has
        const organizationCount = await Organization.countDocuments({ UserId: userId });

        // Restrict to a maximum of 5 organizations per user
        if (organizationCount >= 5) {
            return new Response(
                JSON.stringify({ message: "Maximum limit of 5 organizations reached" }),
                { status: 403, headers: { "Content-Type": "application/json" } }
            );
        }

        // Create a new organization
        const orgData = new Organization({ name: orgName, email: orgEmail, UserId: userId });
        await orgData.save();

        // Return success response with the created organization data
        return new Response(JSON.stringify(orgData), { status: 201 });

    } catch (error) {
        console.error(error);

        // Return a response in case of error
        return new Response(
            JSON.stringify({ message: "Server error", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export async function GET(req) {
    try {
        // Connect to the database
        await connectToDatabase();

        // Parse query parameters
        const url = new URL(req.url);
        const userId = url.searchParams.get("userId");

        if (!userId) {
            return new Response("UserId is required", { status: 400 });
        }

        // Fetch all organizations for the user
        const organizations = await Organization.find({ UserId: userId });

        // Return success response with the fetched organizations
        return new Response(JSON.stringify(organizations), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error(error);

        // Return a response in case of error
        return new Response(
            JSON.stringify({ message: "Server error", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
