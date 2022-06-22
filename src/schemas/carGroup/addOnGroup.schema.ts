import * as yup from "yup";

const addOnGroupSchema = yup.object().shape({
  cars: yup.array().of(yup.string()).required(),
});

export default addOnGroupSchema;
