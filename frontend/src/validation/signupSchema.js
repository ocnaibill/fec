import * as yup from 'yup'
import isValidCPF from '../utils/cpfValidator'

export const signupSchema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
    cpf: yup.string().required('CPF é obrigatório').test('is-valid-cpf', 'CPF inválido', value => isValidCPF(value || '')),
    birthdate: yup.string().required('Data de nascimento é obrigatória'),
    institution: yup.string().required('Instituição é obrigatória'),
    registrationNumber: yup.string().when('institution', {
        is: (val) => val === 'UCB',
        then: (schema) => schema.required('Matrícula é obrigatória'),
        otherwise: (schema) => schema.notRequired(),
    }),
    password: yup.string().min(6, 'Mínimo 6 caracteres').required('Senha é obrigatória'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'As senhas não coincidem')
        .required('Confirmação obrigatória'),
})