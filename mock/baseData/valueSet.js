import Mock from 'mockjs'

const List = []
const count = 5

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    code: '@word(3, 5)',
    desc: '@csentence(5, 15)',
    remark: '@csentence(3, 25)',
    create_time: '@datetime'
  }))
}

export default [
  // 获取值集数据列表
  {
    url: '/baseData/valueSet/list',
    type: 'get',
    response: config => {
      const { code, desc, page = 1, limit = 10 } = config.body
      const mockList = List.filter(item => {
        if (code && item.code !== code) return false
        if (desc && item.desc.indexOf(desc) < 0) return false
        return true
      })
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  // 新增数据
  {
    url: '/baseData/valueSet/add',
    type: 'post',
    response: config => {
      const { code, desc, remark, create_time } = config.body
      List.push({
        id: 10000,
        code,
        desc,
        create_time,
        remark
      })
      return {
        code: 20000,
        data: {
          total: List.length,
          items: List
        }
      }
    }
  },

  // 修改数据
  {
    url: '/baseData/valueSet/update',
    type: 'put',
    response: config => {
      const { id, code, desc, remark, create_time } = config.body
      const temp = { id, code, desc, remark, create_time }
      for (const item of List) {
        if (item.id === id) {
          const index = List.indexOf(item)
          List.splice(index, 1, temp)
        }
      }
      return {
        code: 20000,
        data: {
          total: List.length,
          items: List
        }
      }
    }
  },

  // 删除数据
  {
    url: '/baseData/valueSet/delete',
    type: 'delete',
    response: config => {
      const { id } = config.body
      for (const item of List) {
        if (item.id === id) {
          const index = List.indexOf(item)
          List.splice(index, 1)
        }
      }
      return {
        code: 20000,
        data: {
          total: List.length,
          items: List
        }
      }
    }
  }

]
