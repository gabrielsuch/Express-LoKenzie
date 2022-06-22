import * as yup from "yup";

const updateCarSchema = yup.object().shape({
  plate: yup.string().optional(),
  year: yup.number().optional(),
  color: yup.string().optional(),
  brand: yup.string().optional(),
  isAvaliable: yup.boolean().optional(),
  group: yup.string().optional(),
  stockedAt: yup.string().optional(),
});

export default updateCarSchema;
