import request from '@/utils/request'

export function getFirstLevelList() {
  return request({
    url: 'system/department/getFirstLevelList',
    method: 'get'
  })
}

export function addFirstLevel(data) {
  return request({
    url: 'system/department/addFirstLevel',
    method: 'put',
    data
  })
}
