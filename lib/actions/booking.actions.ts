"use server";

import Booking from "@/database/booking.model";
import connectDB from "@/lib/mongodb";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectDB();

    // تحقق من البيانات الأساسية
    if (!eventId) throw new Error("Event ID is required");
    if (!email) throw new Error("Email is required");

    // حاول إنشاء الحجز
    const booking = await Booking.create({ eventId, slug, email });
    return { success: true, booking };
  } catch (e: any) {
    // سجل سبب الفشل بالتفصيل
    console.error("Booking creation failed:", e.message);

    return {
      success: false,
      error: e.message,
    };
  }
};
