<template>
  <div class="app-container">
    <el-table :data="list" style="width:100%" border>
      <el-table-column prop="id" label="序号" />
      <el-table-column prop="code" label="编码" />
      <el-table-column prop="desc" label="描述" />
    </el-table>
  </div>
</template>

<script type="text/javascript">
import { getList } from '@/api/baseData/valueSet'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
