import * as yup from 'yup'

export const forgotSchema = yup.object().shape({
    email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
})