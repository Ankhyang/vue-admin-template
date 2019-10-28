import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/baseData/valueSet',
    type: 'get',
    params
  })
}
