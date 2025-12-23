import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

// Type for route params
type RouteContext = {
  params: {
    slug: string;
  };
};

/**
 * GET /api/events/[slug]
 * Fetch a single event by slug
 */
export async function GET(
  _request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  try {
    const { slug } = await params;

    // 1️⃣ Validate slug existence
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { success: false, message: "Slug is required" },
        { status: 400 }
      );
    }

    // 2️⃣ Validate slug format
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid slug format. Use lowercase letters, numbers, and hyphens only",
        },
        { status: 400 }
      );
    }

    // 3️⃣ Connect to database
    await connectDB();

    // 4️⃣ Fetch event
    const event = await Event.findOne({ slug }).lean();

    // 5️⃣ Handle not found
    if (!event) {
      return NextResponse.json(
        { success: false, message: `Event '${slug}' not found` },
        { status: 404 }
      );
    }

    // 6️⃣ Success response
    return NextResponse.json(
      {
        success: true,
        data: event,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/events/[slug] error:", error);

    // Database config error
    if (error instanceof Error && error.message.includes("MONGODB_URI")) {
      return NextResponse.json(
        { success: false, message: "Database configuration error" },
        { status: 500 }
      );
    }

    // Generic error
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch event",
      },
      { status: 500 }
    );
  }
}
