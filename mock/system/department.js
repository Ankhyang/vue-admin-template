import Mock from 'mockjs'

const List = []
const count = 3

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'dept_code|1': ['PURCHASE', 'FINANCIAL', 'PERSONNEL'],
    dept_name: '@csentence(2, 5)',
    parent_id: '%root%',
    remark: '@csentence(0, 15)',
    deleted: false,
    create_time: '@datetime',
    create_by: '@name',
    update_time: '@datetime',
    update_by: '@name'
  }))
}

export default [
  // 获取一级菜单数据
  {
    url: '/system/department/getFirstLevelList',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: List
      }
    }
  },
  // 新增一级菜单
  {
    url: '/system/department/addFirstLevel',
    type: 'post',
    response: config => {
      const { dept_code, dept_name } = config.body
      List.push({
        id: '@increment',
        dept_code,
        dept_name,
        parent_id: '%root%',
        remark: '@csentence(0, 15)',
        deleted: false,
        create_time: '@now',
        create_by: '@name',
        update_time: '@now',
        update_by: '@name'
      })
      return {
        code: 20000,
        data: List
      }
    }
  }
]
