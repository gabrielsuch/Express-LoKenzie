import * as yup from "yup";

const updateGroupSchema = yup.object().shape({
  description: yup.string().optional(),
  price: yup.number().optional(),
});

export default updateGroupSchema;
