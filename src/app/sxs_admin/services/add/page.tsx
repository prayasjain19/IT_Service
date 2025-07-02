'use client';
import { ServiceDTO } from '@/core/dtos/Service.dto';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { use } from 'react'
import { useState } from 'react'

const AddServicePage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const serviceId = searchParams.get('id'); // Get ID from query param for editing

    const [formData, setFormData] = useState<Partial<ServiceDTO>>({
        title:'',
        description:''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);



    return (
        <div>AddServicePage</div>
    )
}

export default AddServicePage