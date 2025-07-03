import { NextResponse } from "next/server";
import { PrismaNavbarRepository } from "@/core/repositories/NavbarRepository";
import { NavbarUsecase } from "@/core/usecases/NavbarUsecase";

const navbarCase = new NavbarUsecase(new PrismaNavbarRepository());
interface Params {
  id: string;
}
export async function DELETE(req: Request, { params }: { params: Params }) {
    try {
        const id = parseInt(params.id, 10);
        if (isNaN(id)) {
          return NextResponse.json({ error: 'Invalid service ID' }, { status: 400 });
        }
        await navbarCase.delete(id);
        return new NextResponse(null, { status: 204 }); // No Content
      } catch (error: any) {
        console.error(`Error deleting service with ID ${params.id}:`, error);
        const statusCode = error.message.includes('not found') ? 404 : 500;
        return NextResponse.json({ error: 'Failed to delete service', details: error.message }, { status: statusCode });
      }
}