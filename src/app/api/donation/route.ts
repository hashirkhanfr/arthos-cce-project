import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { validateDonation } from "@/utils/validators";

export async function GET() {
  await connectDB();
  const donations = await Donation.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(donations);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { valid, errors } = validateDonation(body);
  if (!valid) {
    return NextResponse.json(
      { message: "Validation failed", errors },
      { status: 400 }
    );
  }

  await connectDB();
  const donation = await Donation.create({ ...body, status: "pending" });
  return NextResponse.json(
    { message: "Donation recorded successfully", id: donation._id },
    { status: 201 }
  );
}
