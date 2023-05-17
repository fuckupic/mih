import axios from 'axios'

interface EmailData {
  name: string
  email: string
  mobility: string
  note: string
  date: string
}

const sendEmail = async (emailData: EmailData) => {
  return axios({
    method: 'post',
    url: '/api/sendEmail',
    data: emailData,
  })
}

export default sendEmail
