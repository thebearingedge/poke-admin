import * as yup from 'yup'

export default yup.object().shape({
  username: yup.string().label('Username').trim().required(),
  password: yup.string().label('Password').trim().required()
})
