
import { PrismaNavbarRepository } from "@/core/repositories/NavbarRepository";
import { NavbarUsecase } from "@/core/usecases/NavbarUsecase";
import { NextResponse, NextRequest } from "next/server";
import { Navbar as NavbarEntity } from "@/core/entities/Navbar.entity";

// Initialize the Usecase with its repository dependency outside of the handler
const navbarUseCase = new NavbarUsecase(new PrismaNavbarRepository());


// Your GET function (as corrected previously)
export async function GET() {
    try {
        const data = await navbarUseCase.getAll();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error fetching navbar items:', error);
        return NextResponse.json({ message: 'Failed to fetch data', error: error.message }, { status: 500 });
    }
}


// POST function to create a new header item with a try...catch block
export async function POST(request: NextRequest) {
    // ⚠️ WARNING: This endpoint is not secured and can be accessed by anyone.
    // Implement authentication and authorization (e.g., check for an admin role)
    // before using this in production.

    try {
        // 1. Get the data from the request body.
        // It's crucial to 'await' this since request.json() is an async operation.
        const { title, href } = await request.json();

        // 2. Perform basic validation before calling the use case.
        if (!title || title.trim() === "" || !href || href.trim() === "") {
            // Return a 400 Bad Request error if validation fails.
            return NextResponse.json({ message: "Title and link are required." }, { status: 400 });
        }

        // 3. Call the use case's create method to handle the business logic and data storage.
        // You must 'await' this call as the use case method is asynchronous.
        const newNavbarItem: NavbarEntity = await navbarUseCase.create({ title, href });

        // 4. Return a successful response with the created item and a 201 Created status.
        return NextResponse.json(newNavbarItem, { status: 201 });

    } catch (error: any) {
        // 5. If any error occurs in the 'try' block, the code jumps here.
        console.error("Error creating navbar item:", error);

        // You can check for specific error types and return appropriate status codes.
        // For example, a validation error from the use case.
        if (error.message.includes("already exists")) {
            return NextResponse.json({ message: error.message }, { status: 409 }); // 409 Conflict
        }
        if (error.message.includes("required")) {
            return NextResponse.json({ message: error.message }, { status: 400 }); // 400 Bad Request
        }

        // 6. For all other unhandled errors, return a generic 500 Internal Server Error.
        return NextResponse.json({ message: "Internal server error occurred.", error: error.message }, { status: 500 });
    }
}