<template>
  <div class="app-container">
    <div class="filter-container">
      <span>编码：</span><el-input v-model="listQuery.code" size="small" style="width:200px"></el-input>
      <span>&emsp;描述：</span><el-input v-model="listQuery.desc" size="small" style="width:200px"></el-input>
      <el-button icon="el-icon-search" type="primary" size="small" @click="handleFilter">查询</el-button>
      <el-button icon="el-icon-plus" type="primary" size="small" @click="handleCreate">新增</el-button>
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
      <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="80px" size="small" style="width:60%; margin: 0 auto">
        <el-form-item label="编码" prop="code">
          <el-input v-model="temp.code"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="temp.desc"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="temp.remark" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="create_time">
          <el-date-picker v-model="temp.create_time" type="datetime" style="width:100%"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="warning" @click="dialogFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="dialogStatus === 'create'? createData():editData()">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="pvVisible"
      width="20%"
    >
      <p>确定删除该行数据吗？</p>
      <div class="dialog-footer">
        <el-button size="small" type="warning" @click="pvVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="confirmDelete()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import { getList, addData, updateData, deleteData } from '@/api/baseData/valueSet'
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
      },
      pvVisible: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改值集',
        create: '新增值集'
      },
      temp: {
        code: '',
        desc: '',
        create_time: new Date(),
        remark: ''
      },
      rules: {
        code: [{ required: true, message: '编码必填', trigger: 'blur' }],
        desc: [{ required: true, message: '描述必填', trigger: 'blur' }]
      },
      resetTemp() {
        this.temp = {
          id: '',
          code: '',
          desc: '',
          create_time: new Date(),
          remark: ''
        }
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
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    handleCreate() {
      this.resetTemp() // 重置表单
      this.dialogFormVisible = true // 对话框可见
      this.dialogStatus = 'create' // 新增标识
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate() // 移除表单项的校验结果
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024
          addData(this.temp).then(() => {
            this.dialogFormVisible = false
            this.fetchData()
            this.$notify({
              title: '提示',
              message: '新增成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleEdit(row) {
      this.temp = Object.assign({}, row)
      this.dialogFormVisible = true // 对话框可见
      this.dialogStatus = 'update' // 修改标识
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    editData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateData(this.temp).then(() => {
            this.dialogFormVisible = false
            this.fetchData()
            this.$notify({
              title: '提示',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.temp = Object.assign({}, row)
      this.pvVisible = true
    },
    confirmDelete() {
      deleteData(this.temp).then(() => {
        this.pvVisible = false
        this.fetchData()
        this.$notify({
          title: '提示',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .filter-container{
    font-size: 15px;
    color : #606266;
    font-weight : bold;
    margin: 10px 5px;
  }
  .dialog-footer{
    margin : 0 auto;
    text-align: center
  }
  .el-button+.el-button {
    margin-left: 0px;
}
</style>
