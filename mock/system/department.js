import Mock from 'mockjs'

const List = []
const count = 3

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'code|1': ['PURCHASE', 'FINANCIAL', 'PERSONNEL'],
    'desc': '@csentence(5, 15)',
    'deleted': 'false',
    create_time: '@datetime'
  }))
}

export default [
  {
    url: '/department/getList',
    type: 'get',
    response: config => {
      return {
        code: 2000,
        data: List
      }
    }
  },
  {
    url: '/department/add',
    type: 'post',
    response: config => {
      const { code, desc } = config.body
      List.push({
        id: '@increment',
        code,
        desc,
        'deleted': 'false',
        create_time: '@now'
      })
      return {
        code: 2000,
        data: List
      }
    }
  }
]
