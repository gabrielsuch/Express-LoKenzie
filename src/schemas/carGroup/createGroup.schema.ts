import * as yup from "yup";

const createGroupSchema = yup.object().shape({
  description: yup.string().required(),
  price: yup.number().required(),
});

export default createGroupSchema;
