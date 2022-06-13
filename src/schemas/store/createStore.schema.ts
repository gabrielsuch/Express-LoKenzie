import * as yup from "yup"


const createStoreSchema = yup.object().shape({
    address: yup.string().required(),
    quantity: yup.number().required(),
})


export default createStoreSchema
