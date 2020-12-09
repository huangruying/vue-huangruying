import axios from '@/utils/myAxios'
const agent_list = params => {
    return axios({
      method: 'get',
      url: '/api/my/agent_list',
      params: params
    })
}

const pwd_dls_login = data => {
  return axios({
    method: 'post',
    url: '/api/login/pwd_dls_login',
    data: data
  })
}

const sendSms = data => {
  return axios({
    method: 'post',
    url: '/api/verify/sendSms',
    data: data
  })
}

const agent_register = data => {
  return axios({
    method: 'post',
    url: '/api/login/agent_register',
    data: data
  })
}

const agent_money = params => {
  return axios({
    method: 'get',
    url: '/api/my/agent_money',
    params: params
  })
}

const agent_withdraw = params => {
  return axios({
    method: 'post',
    url: '/api/my/agent_withdraw',
    data: params
  })
}

const withdraw_list = params => {
  return axios({
    method: 'get',
    url: '/api/my/withdraw_list',
    params: params
  })
}

const earning_list = params => {
  return axios({
    method: 'get',
    url: '/api/my/earning_list',
    params: params
  })
}

export default {
  agent_list,
  pwd_dls_login,
  sendSms,
  agent_register,
  agent_money,
  agent_withdraw,
  withdraw_list,
  earning_list
} 
