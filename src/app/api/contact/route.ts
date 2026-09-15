import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request body
    const validatedData = contactSchema.parse(body);

    // Check if database is configured (for local development)
    if (!process.env.DATABASE_URL) {
      console.warn("⚠️ DATABASE_URL is missing. Skipping database save for local development. Message will still be sent to WhatsApp.");
      return NextResponse.json(
        { message: "Success (Simulated)", data: validatedData },
        { status: 201 }
      );
    }

    // Save to database using Prisma (when deployed to Vercel)
    const message = await prisma.message.create({
      data: validatedData,
    });

    return NextResponse.json(
      { message: "Success", data: message },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.issues },
        { status: 400 }
      );
    }

    console.error("Contact API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
