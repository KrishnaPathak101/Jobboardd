import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/db/db';
import Application from '@/models/Application';

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { fullName, email, coverLetter, jobId, userId } = body;

    // Validate required fields
    if (!fullName || !email || !coverLetter || !jobId || !userId) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Save the application using matching schema field names
    const application = new Application({
      fullName,
      email, // matches schema
      coverLetter, // matches schema
      jobId,
      userId,
    });

    await application.save();

    return NextResponse.json({ message: 'Application submitted successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
