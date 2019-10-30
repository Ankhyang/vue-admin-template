import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/baseData/valueSet/list',
    method: 'get',
    query
  })
}

export function addData(data) {
  return request({
    url: '/baseData/valueSet/add',
    method: 'post',
    data
  })
}

export function updateData(data) {
  return request({
    url: '/baseData/valueSet/update',
    method: 'put',
    data
  })
}

export function deleteData(data) {
  return request({
    url: '/baseData/valueSet/delete',
    method: 'delete',
    data
  })
}

