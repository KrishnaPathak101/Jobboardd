import { connectToDatabase } from "@/db/db";
import Job from "@/models/Job";

export async function POST(req) {
  try {
    await connectToDatabase();

    const data = await req.json();
    const { jobTitle, jobDescription, jobLocation, jobSalary, orgId, userId } = data;

    // If only userId is provided, fetch jobs for that userId
    if (userId && !jobTitle && !jobDescription && !jobLocation && !jobSalary && !orgId) {
      const jobs = await Job.find({ userId });
      return new Response(JSON.stringify(jobs), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // If job details are provided, create a new job
    if (jobTitle && jobDescription && jobLocation && jobSalary && orgId && userId) {
      const jobData = new Job({
        title: jobTitle,
        description: jobDescription,
        location: jobLocation,
        salary: jobSalary,
        organizationId: orgId,
        userId,
      });

      await jobData.save();

      return new Response(JSON.stringify(jobData), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }

    // If neither condition is met, return a bad request response
    return new Response("Invalid input data", { status: 400 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Failed to process request", { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDatabase();
    
    const jobs = await Job.find();

    return new Response(JSON.stringify(jobs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Failed to process request", { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const { id } = data;
    const job = await Job.findByIdAndDelete(id);
    return new Response(JSON.stringify(job), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete job", {status: 500});
  }
}