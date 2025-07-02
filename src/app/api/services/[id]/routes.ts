// app/api/services/[id]/route.ts
import { NextResponse } from 'next/server';
import { ServiceUseCase } from '@/core/usecases/ServiceUsecase';
import {UpdateServiceDTO } from '@/core/dtos/Service.dto';
import { PrismaServiceRepository } from '@/core/repositories/ServiceRepository';

const serviceUsecase = new ServiceUseCase(new PrismaServiceRepository);

interface Params {
  id: string;
}

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid service ID' }, { status: 400 });
    }
    const service = await serviceUsecase.getById(id);
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json(service, { status: 200 });
  } catch (error: any) {
    console.error(`Error fetching service with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch service', details: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Params }) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid service ID' }, { status: 400 });
    }
    const data: UpdateServiceDTO = await req.json();
    const updatedService = await serviceUsecase.update(id, data);
    return NextResponse.json(updatedService, { status: 200 });
  } catch (error: any) {
    console.error(`Error updating service with ID ${params.id}:`, error);
    const statusCode = error.message.includes('not found') ? 404 : 500;
    return NextResponse.json({ error: 'Failed to update service', details: error.message }, { status: statusCode });
  }
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid service ID' }, { status: 400 });
    }
    await serviceUsecase.delete(id);
    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error: any) {
    console.error(`Error deleting service with ID ${params.id}:`, error);
    const statusCode = error.message.includes('not found') ? 404 : 500;
    return NextResponse.json({ error: 'Failed to delete service', details: error.message }, { status: statusCode });
  }
}