import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  country: Yup.string().required('Country is required'),
  address: Yup.string().required('Address is required'),
  postalCode: Yup.number().required('Postcode is required'),
  number: Yup.number().required('Phone is required'),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().required("Image is required"), // Adjust as needed
});

export default validationSchema;
