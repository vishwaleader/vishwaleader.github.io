"use server";

import { getAdminDb } from "@/lib/firebaseAdmin";

export async function getTestimonials() {
  try {
    const adminDb = getAdminDb();
    const snapshot = await adminDb
      .collection("testimonials")
      .orderBy("createdAt", "desc")
      .limit(6)
      .get();
      
    const testimonials = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "Anonymous",
        content: data.content || "",
        title: data.title || "",
        company: data.company || "",
        image: data.image || "",
        photoURL: data.photoURL || "",
        rating: data.rating || 5,
        createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
      };
    });
    
    return { success: true, data: testimonials };
  } catch (error: any) {
    console.error("Error fetching testimonials on server:", error);
    return { success: false, error: error.message };
  }
}
