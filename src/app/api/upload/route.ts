import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { image, folder } = await request.json();

    if (!image) {
      return NextResponse.json({ success: false, error: "No image data provided" }, { status:400 });
    }

    // Upload to Cloudinary
    // Note: cloudinary.uploader.upload supports base64 strings directly
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: folder || "arthos",
      resource_type: "auto",
    });

    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    });
  } catch (error: any) {
    console.error("Upload API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
