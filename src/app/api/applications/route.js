import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/db/db';
import Application from '@/models/Application';

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { fullName, email, coverLetter, jobId, applicant, jobPoster } = body;

    // If only jobPoster is provided, fetch all related applications
    if (jobPoster && !fullName && !email && !coverLetter && !jobId && !applicant) {
      const applications = await Application.find({ jobPoster })
        .populate('jobId') // Populate Job details
        .populate('applicant', 'fullName email') // Populate Applicant details
        .populate('jobPoster', 'fullName email'); // Populate Job Poster details

      return NextResponse.json({ applications }, { status: 200 });
    }

    // Validate required fields for saving an application
    if (!fullName || !email || !coverLetter || !jobId) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Save the application
    const application = new Application({
      fullName,
      email,
      coverLetter,
      jobId,
      applicant,
      jobPoster,
    });

    const savedApplication = await application.save();

    // Fetch and populate the saved application
    const populatedApplication = await Application.findById(savedApplication._id)
      .populate('jobId') // Populate Job details
      .populate('applicant', 'fullName email') // Populate Applicant details
      .populate('jobPoster', 'fullName email'); // Populate Job Poster details

    return NextResponse.json(populatedApplication, { status: 201 });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
