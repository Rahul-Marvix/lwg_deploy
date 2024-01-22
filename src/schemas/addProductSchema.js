import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Title is required"),
  salePrice: Yup.number().min(0, "Sale Price must be greater than or equal to 0"),

  stockItems: Yup.number().required("Stock is required"),
  productBoost: Yup.string(),
  metaPrice: Yup.number(),
  status: Yup.string().required("Status is required").oneOf(["active", "draft"], "Invalid Status"),
  productCategory: Yup.string().required("Product Category is required"),
  category: Yup.string().required("Category is required"),
  location: Yup.string().required("Location is required"),
  // brand: Yup.string().required("Brand is required"),
  tagsArray: Yup.array().of(Yup.string()),
});

export default validationSchema;
