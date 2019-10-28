import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/baseData/valueSet/list',
    type: 'get',
    params
  })
}
