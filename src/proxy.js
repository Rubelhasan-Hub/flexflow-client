import { NextResponse } from 'next/server';
import { auth } from "./lib/auth";

export async function proxy(request) {
    const { pathname } = request.nextUrl;

    const isForumDetailsPage = pathname.startsWith('/forum/') && pathname.split('/').length === 3;

    if (isForumDetailsPage) {
        const session = await auth.api.getSession({
            headers: request.headers
        });

        if (!session) {
            return NextResponse.redirect(new URL('/signin', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/forum/:path*'],
};