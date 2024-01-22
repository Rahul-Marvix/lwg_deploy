"use client"
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { adminAxiosInstance } from '@/utils/axiosUtils';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  // Add additional validation for other fields if needed
});

export default function AddProductTypeForm() {
  const router = useRouter();

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      const response = await adminAxiosInstance.post('create-product-type', values);
      if (response.data.success) {
        console.log(response, 'hello');
        toast.success('Added successfully');
        router.push('/admin/producttype');
      }
    } catch (error) {
      console.log(error);
      toast.error('Internal server error. Please try again later.');
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="grid lg:grid-cols-1 gap-10">
            <div className="lg:col-span-1 w-full">
              <div className="flex bg-white flex-col py-3 px-4 mt-5 rounded-md shadow-sm">
                <div className="flex flex-col b">
                  <label htmlFor="name">Name</label>
                  <Field
                    id="name"
                    name="name"
                    className={`border border-black mt-1 rounded-md`}
                    type="text"
                    placeholder="Name"
                  />
                  <ErrorMessage name="name" component="p" className="text-xs text-red-600" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center my-5">
            <button type="submit" className="py-1 px-4 rounded-md bg-green-700 text-white">
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
