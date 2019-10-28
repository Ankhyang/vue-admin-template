import Mock from 'mockjs'

const data = Mock.mock({
  'items|5': [{
    id: '@id',
    code: '@word(3, 5)',
    desc: '@title(3, 5)'
  }]
})

export default [
  {
    url: '/baseData/valueSet/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
