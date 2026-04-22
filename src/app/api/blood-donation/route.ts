import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BloodDonor from "@/models/BloodDonor";
import { validateBloodDonor } from "@/utils/validators";

export async function GET() {
  await connectDB();
  const donors = await BloodDonor.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(donors);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { valid, errors } = validateBloodDonor(body);
  if (!valid) {
    return NextResponse.json(
      { message: "Validation failed", errors },
      { status: 400 }
    );
  }

  await connectDB();

  const existing = await BloodDonor.findOne({ email: body.email });
  if (existing) {
    return NextResponse.json(
      { message: "This email is already registered as a blood donor." },
      { status: 409 }
    );
  }

  const donor = await BloodDonor.create(body);
  return NextResponse.json(
    { message: "Blood donor registered successfully", id: donor._id },
    { status: 201 }
  );
}
