<template>
  <div class="app-container">
    <div class="filter-container">
      编码：<el-input v-model="listQuery.code" size="small" style="width:200px"></el-input>
      &emsp;描述：<el-input v-model="listQuery.desc" size="small" style="width:200px"></el-input>
    </div>
    <el-table
      :data="list"
      style="width:100%"
      :header-cell-style="{height: '18px',background:'#eef1f6',color:'#606266'}"
      :row-style="{height: '13px'}"
      :cell-style="{padding: '5px 0'}"
      border
      stripe
    >
      <el-table-column prop="id" label="序号"></el-table-column>
      <el-table-column prop="code" label="编码"></el-table-column>
      <el-table-column prop="desc" label="描述" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
  </div>
</template>

<script type="text/javascript">
import { getList } from '@/api/baseData/valueSet'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        code: undefined,
        desc: undefined
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .filter-container{
    margin 10px 5px;
  }
</style>
