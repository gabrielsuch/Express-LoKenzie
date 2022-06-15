import * as yup from "yup";

const createCarSchema = yup.object().shape({
  plate: yup.string().required(),
  year: yup.number().required(),
  color: yup.string().required(),
  brand: yup.string().required(),
  isAvaliable: yup.boolean().required(),
});

export default createCarSchema;
