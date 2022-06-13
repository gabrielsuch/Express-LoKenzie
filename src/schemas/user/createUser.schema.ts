import * as yup from "yup"


const createUserSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    isAdm: yup.boolean().default(false).optional()
})


export default createUserSchema
