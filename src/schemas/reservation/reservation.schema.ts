import * as yup from "yup";

const reservationSchema = yup.object().shape({
  days: yup.number().required(),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
});

export default reservationSchema;
