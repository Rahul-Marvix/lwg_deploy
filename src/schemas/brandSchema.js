import * as Yup from "yup";

const BrandSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().required("Image is required"), // Adjust as needed
});

export default BrandSchema;
