import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Volunteer from "@/models/Volunteer";
import { validateVolunteer } from "@/utils/validators";

export async function GET() {
  await connectDB();
  const volunteers = await Volunteer.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(volunteers);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { valid, errors } = validateVolunteer(body);
  if (!valid) {
    return NextResponse.json(
      { message: "Validation failed", errors },
      { status: 400 }
    );
  }

  await connectDB();

  const existing = await Volunteer.findOne({ email: body.email });
  if (existing) {
    return NextResponse.json(
      { message: "This email is already registered as a volunteer." },
      { status: 409 }
    );
  }

  const volunteer = await Volunteer.create(body);
  return NextResponse.json(
    { message: "Volunteer registered successfully", id: volunteer._id },
    { status: 201 }
  );
}
