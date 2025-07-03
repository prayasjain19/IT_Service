// app/api/services/route.ts
import { NextResponse } from 'next/server';
import { ServiceUseCase } from '@/core/usecases/ServiceUsecase';
import { CreateServiceDTO } from '@/core/dtos/Service.dto';
import { PrismaServiceRepository } from '@/core/repositories/ServiceRepository';

const serviceUsecase = new ServiceUseCase(new PrismaServiceRepository());

export async function GET() {
    try {
        const services = await serviceUsecase.getAll();
        return NextResponse.json(services, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching services:', error);
        return NextResponse.json({ error: 'Failed to fetch services', details: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data: CreateServiceDTO = await req.json();
        const newService = await serviceUsecase.create(data);
        return NextResponse.json(newService, { status: 201 });
    } catch (error: any) {
        console.error('Error creating service:', error);
        const statusCode = error.message.includes('required') ? 400 : 500;
        return NextResponse.json({ error: 'Failed to create service', details: error.message }, { status: statusCode });
    }
}