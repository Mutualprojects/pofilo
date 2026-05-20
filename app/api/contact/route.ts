import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

// Create a Sanity client configured for write operations
const client = createClient({
  projectId: "6q773bw1", // Matches your existing sanity.ts setup
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false, // Turn off CDN for mutations
  token: process.env.SANITY_API_TOKEN, // Add this to your .env.local file
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, mobile, message } = body;

    // Validate the incoming data
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields (name, email, message)' }, { status: 400 });
    }

    // Save the submission to Sanity as a 'contact' document
    const newContact = await client.create({
      _type: 'contact',
      name,
      email,
      mobile,
      message,
      submittedAt: new Date().toISOString(), // Programmatically set as API bypasses Studio initialValue
      read: false, // Default to unread
    });

    console.log('Successfully saved to Sanity with ID:', newContact._id);

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully! Balaji will get back to you soon.' 
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Failed to process contact request' }, { status: 500 });
  }
}

