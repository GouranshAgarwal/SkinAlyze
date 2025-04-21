import { NextResponse } from "next/server";


export class ApiResponse {
    static success(data: any = {}, message: string = "Request successful", status: number = 200) {
        return NextResponse.json(
            { success: true, message, data },
            { status }
        );
    }

    static error(message: string = "Something went wrong", status: number = 500, data: any = {}) {
        return NextResponse.json(
            { success: false, message, data },
            { status }
        );
    }

    static unauthorized(message: string = "Unauthorized") {
        return this.error(message, 401);
    }

    static forbidden(message: string = "Forbidden") {
        return this.error(message, 403);
    }

    static notFound(message: string = "Resource not found") {
        return this.error(message, 404);
    }
    static badRequest(message: string = "Bad Request") {
        return this.error(message, 400);
    }
}
