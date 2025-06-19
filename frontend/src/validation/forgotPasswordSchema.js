import * as yup from 'yup'

export const forgotSchema = yup.object().shape({
    email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
})

export const resetSchema = yup.object().shape({
    newPassword: yup.string().min(6, 'Mínimo 6 caracteres').required('Senha é obrigatória'),
    confirmNewPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'As senhas não coincidem')
        .required('Confirmação obrigatória'),
})