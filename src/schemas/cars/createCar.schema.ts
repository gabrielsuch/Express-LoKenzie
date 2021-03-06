import * as yup from "yup";

const createCarSchema = yup.object().shape({
  plate: yup.string().required(),
  year: yup.number().required(),
  color: yup.string().required(),
  brand: yup.string().required(),
  isAvailable: yup.boolean().optional(),
  group: yup.string().optional(),
  stockedAt: yup.string().required(),
});

export default createCarSchema;
