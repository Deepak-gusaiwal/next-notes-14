import { NextResponse } from "next/server";
export const POST = async (req) => {
  try {
    const response = NextResponse.json({
      msg: "you have been logged out",
      success: true
    });
    response.cookies.set("authToken", "", {
      secure: true, // Only send over HTTPS connections
      maxAge: 3600, // Set cookie expiration time in seconds (1 hour)
      // httpOnly: true, // Prevent access from client-side JavaScript
      // sameSite: "strict", // Prevent Cross-Site Request Forgery attacks
      //path: "/", // Set cookie path
    });
    return response;
  } catch (error) {
    return NextResponse.json({
      msg: error.message,
      success: false,
      result: null,
    });
  }
};
