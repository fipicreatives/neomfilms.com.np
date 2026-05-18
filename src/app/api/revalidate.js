import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        revalidateTag("globals");

        const res = NextResponse.json({
            success: true,
            message: "Cache cleared successfully!",
        });

        // Allow Django admin domain
        res.headers.set("Access-Control-Allow-Origin", "https://plumbous-jan-perforable.ngrok-free.dev");
        res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.headers.set("Access-Control-Allow-Headers", "Content-Type");

        return res;
    } catch (error) {
        const res = NextResponse.json(
            { success: false, message: "Error: Failed to purge cache." },
            { status: 500 }
        );
        res.headers.set("Access-Control-Allow-Origin", "https://plumbous-jan-perforable.ngrok-free.dev");
        return res;
    }
}