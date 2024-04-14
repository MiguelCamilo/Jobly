"use client";

import * as z from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CreateJobSchema } from '@/lib/schemas/validation';

import { Form } from '@/components/ui/form';

const NewJobForm = () => {
    const { watch, ...form } = useForm<z.infer<typeof CreateJobSchema>>({
        resolver: zodResolver(CreateJobSchema),
        defaultValues: {
            title: "",
            type: "",
            companyName: "",
            // companyLogoUrl: ,
            description: "",
            salary: "",
        }
    })

    const onJobPostSubmit = (values: z.infer<typeof CreateJobSchema>) => {
        alert(JSON.stringify(values, null, 2))
    }
  return (
    <main className="m-auto my-10 max-w-3xl space-y-10">
      <div className='space-y-5 text-center'>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Create a job posting!
        </h1>
        <p className="text-muted-foreground">
          Please fill out the form below to create a new job posting.
        </p>
      </div>

      <div className='space-y-6 border rounded-lg p-4'>
        <div>
            <h2 className='font-semibold'>Job details</h2>
            <p className='text-muted-foreground'>
                Provided a job description and details
            </p>
        </div>

        <Form {...form} watch={watch}>
            <form onSubmit={form.handleSubmit(onJobPostSubmit)} className='space-y-4' noValidate>
                <button type='button'>
                    Test
                </button>
            </form>
        </Form>
      </div>
    </main>
  );
};

export default NewJobForm;
