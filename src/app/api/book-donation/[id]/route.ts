import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BookDonation from "@/models/BookDonation";
import { auth } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  await connectDB();
  const updated = await BookDonation.findByIdAndUpdate(id, body, { returnDocument: 'after' });

  if (!updated) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await connectDB();
  const deleted = await BookDonation.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted successfully" });
}
