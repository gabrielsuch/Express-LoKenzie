import * as yup from "yup"

// LEMBRAR DE REMOVER A CHAVE isAdm do CREATE USER

const createUserSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    isAdm: yup.boolean().default(false).optional()
})


export default createUserSchema
