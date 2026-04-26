import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BookDonation from "@/models/BookDonation";

export async function GET() {
  await connectDB();
  const donations = await BookDonation.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(donations);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const required = ["donorName", "email", "phone", "address", "condition"];
  const missing = required.filter((k) => !body[k]);

  if (missing.length > 0) {
    return NextResponse.json(
      { message: "Missing required fields", errors: Object.fromEntries(missing.map((k) => [k, "This field is required"])) },
      { status: 400 }
    );
  }

  await connectDB();
  const donation = await BookDonation.create(body);
  return NextResponse.json(
    { message: "Book donation submitted successfully", id: donation._id },
    { status: 201 }
  );
}
