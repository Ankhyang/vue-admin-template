import Mock from 'mockjs'

const List = []
const count = 3

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'dept_code|1': ['PURCHASE', 'FINANCIAL', 'PERSONNEL'],
    dept_name: '@csentence(2, 5)',
    parent: '%root%',
    remark: '@csentence(0, 15)',
    deleted: false,
    create_time: '@datetime',
    create_by: '@name',
    update_time: '@datetime',
    update_by: '@name'
  }))
}

export default [
  // 获取一级部门数据
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
  // 新增一级部门
  {
    url: '/system/department/addFirstLevel',
    type: 'post',
    response: config => {
      const { dept_code, dept_name, remark } = config.body
      List.push({
        id: '@increment',
        dept_code,
        dept_name,
        parent: '%root%',
        remark,
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
  },
  // 新增二级部门
  {
    url: '/system/department/addSecLevel',
    type: 'post',
    response: config => {
      const { dept_code, dept_name, parent, remark } = config.body
      for (const i in List) {
        if (List[i].id + '' === parent) {
          List[i].children.push({
            id: '@increment',
            dept_code,
            dept_name,
            parent,
            remark,
            deleted: false,
            create_time: '@now',
            create_by: '@name',
            update_time: '@now',
            update_by: '@name'
          })
        }
      }
      return {
        code: 20000,
        data: List
      }
    }
  }
]
