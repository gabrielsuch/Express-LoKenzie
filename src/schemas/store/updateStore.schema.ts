import * as yup from "yup"

const updateStoreSchema = yup.object().shape({
    address: yup.string().optional(),
    quantity: yup.number().optional(),
})

export default updateStoreSchema