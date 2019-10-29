import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push({
    id: i + 1,
    code: '@word(3, 5)',
    desc: '@csentence(5, 15)',
    create_time: '@datetime("yyyy-MM-dd HH:mm")'
  })
}

export default [
  // 获取值集数据列表
  {
    url: '/baseData/valueSet/list',
    type: 'get',
    response: config => {
      const { code, desc, page = 1, limit = 10 } = config.query
      const mockList = List.filter(item => {
        if (code && code !== item.code) return false
        if (desc && desc !== item.desc) return false
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
      const { code, desc } = config.body
      const length = List.items.length
      List.items.push({
        id: length + 1,
        code,
        desc,
        create_time: '@datetime("yyyy-MM-dd HH:mm")'
      })
      return {
        code: 20000,
        data: {
          total: List.items.length,
          items: List.items
        }
      }
    }
  }

]
