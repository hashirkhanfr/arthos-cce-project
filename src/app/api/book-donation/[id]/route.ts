import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BookDonation from "@/models/BookDonation";
import { auth } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const body = await request.json();

  await connectDB();
  const updated = await BookDonation.findByIdAndUpdate(id, body, { new: true });

  if (!updated) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  await connectDB();
  const deleted = await BookDonation.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted successfully" });
}
