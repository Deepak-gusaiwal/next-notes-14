import { NextResponse } from "next/server";
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const pathName = request.nextUrl.pathname;
  const checkRoute = (path) => {
    return pathName.startsWith(path);
  };
  const token = request.cookies.get("authToken")?.value;
  //for login and singup api calling
  if (checkRoute("/api/users/login") || checkRoute("/api/users")) {
    return;
  }

  if (checkRoute("/login") || checkRoute("/signup")) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/:path*", "/notes", "/", "/login", "/signup"],
};
