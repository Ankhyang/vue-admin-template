import request from '@/utils/request'
// 获取一级部门数据
export function getFirstLevelList() {
  return request({
    url: 'system/department/getFirstLevelList',
    method: 'get'
  })
}
// 新增一级部门
export function addFirstLevel(data) {
  return request({
    url: 'system/department/addFirstLevel',
    method: 'post',
    data
  })
}
// 新增二级部门
export function addSecLevel(data) {
  return request({
    url: 'system/department/addSecLevel',
    type: 'post',
    data
  })
}
