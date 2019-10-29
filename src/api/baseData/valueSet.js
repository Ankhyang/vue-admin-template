import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/baseData/valueSet/list',
    type: 'get',
    query
  })
}

export function add(data) {
  return request({
    url: '/baseData/valueSet/add',
    type: 'post',
    data
  })
}
