import * as yup from "yup"


const updateUserSchema = yup.object().shape({
    name: yup.string().optional(),
    email: yup.string().email().optional(),
    password: yup.string().optional(),
    isAdm: yup.boolean().default(false).optional()
})

export default updateUserSchema