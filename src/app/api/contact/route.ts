import { NextRequest, NextResponse } from 'next/server';
import { MailService } from '@/lib/MailServices'; // Adjust path if needed
import { z } from 'zod';

// Define the expected request body schema
const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  type: z.string().min(1, 'Project type is required'),
  details: z.string().min(1, 'Details are required'),
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Validate incoming data
    const validatedData = ContactFormSchema.parse(formData);

    const mailService = new MailService(); // Uses default webhook URL

    // Construct email content
    const subject = `Nouvelle demande de devis: ${validatedData.type}`;
    const content = `
      Nom: ${validatedData.name}
      Email: ${validatedData.email}
      Type de projet: ${validatedData.type}
      Détails: ${validatedData.details}
    `;
    // Define the recipient email address from environment variable
    const recipientEmail = process.env.CONTACT_MAIL;

    if (!recipientEmail) {
      console.error('Error: CONTACT_MAIL environment variable is not set.');
      return NextResponse.json({ message: 'Server configuration error: Recipient email not set.' }, { status: 500 });
    }

    // Send the email using the service (assuming 'fr' as default lang)
    await mailService.sendMail('fr', recipientEmail, subject, content);

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);

    // Handle Zod validation errors specifically
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
    }

    // Handle MailService errors or other errors
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    // Use the specific error message from MailService if available, otherwise generic
    const status = errorMessage.startsWith('Mail sending failed') || errorMessage.includes('HTTP error') ? 502 : 500; // Bad Gateway for upstream issues

    return NextResponse.json({ message: `Failed to send email: ${errorMessage}` }, { status });
  }
}
