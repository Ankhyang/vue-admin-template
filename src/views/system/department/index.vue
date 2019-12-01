<template>
  <div class="app-container">
    <el-container direction="vertical">
      <el-header>
        <el-button-group class="commonbtn">
          <el-button type="primary" size="medium" @click="handleCreateFirst">新增一级</el-button>
          <el-button type="primary" size="medium" @click="handleCreateSec">新增二级</el-button>
        </el-button-group>
      </el-header>
      <el-container>
        <el-aside width="30%" class="commonBg">
          <el-tree :data="firstLevelList" :props="defaultProps" node-key="id"></el-tree>
        </el-aside>
        <el-main class="commonBg">
          <el-table :data="tableData" stripe style="width:100%">
            <el-table-column prop="dept_code" label="部门编码"></el-table-column>
            <el-table-column prop="dept_name" label="部门名称"></el-table-column>
            <el-table-column prop="parent" label="父级"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" size="small" :rules="rules" :model="temp" label-width="80px" style="width:60%; margin: 0 auto">
        <el-form-item label="部门编码" prop="dept_code">
          <el-input v-model="temp.dept_code"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="dept_name">
          <el-input v-model="temp.dept_name"></el-input>
        </el-form-item>
        <el-form-item v-show="!firstLevelVisible" label="父级部门" prop="parent">
          <select-tree v-model="temp.parent" :options="options" :props="defaultTreeProps"></select-tree>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="temp.remark" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" size="small" @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" size="small" @click="saveData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import { getFirstLevelList, addFirstLevel, addSecLevel } from '@/api/system/department'
import SelectTree from '@/components/SelectTree'
export default {
  components: {
    SelectTree
  },
  data() {
    return {
      firstLevelList: [],
      tableData: [],
      defaultProps: {
        label: 'label',
        children: 'children',
        isLeaf: false
      },
      defaultTreeProps: {
        parent: 'parent',
        value: 'id',
        label: 'label',
        children: 'children'
      },
      options: [],
      rules: {
        dept_code: [{ required: true, message: '编码必填', trigger: 'blur' }],
        dept_name: [{ required: true, message: '描述必填', trigger: 'blur' }]
      },
      dialogFormVisible: false,
      firstLevelVisible: true,
      dialogStatus: '',
      temp: {
        id: '',
        dept_name: '',
        dept_code: '',
        parent: '',
        remark: ''
      },
      resetTemp() {
        this.temp = {
          id: '',
          dept_name: '',
          dept_code: '',
          parent: '',
          remark: ''
        }
      },
      textMap: {
        createFirst: '新增一级部门',
        editFirst: '修改一级部门',
        createSec: '新增二级部门',
        editSec: '修改二级部门'
      }
    }
  },
  created() {
    this.fetchFirstLevelList()
  },
  methods: {
    fetchFirstLevelList() {
      getFirstLevelList().then(response => {
        const tempList = response.data
        this.firstLevelList = []
        for (const i in tempList) {
          const { id, parent, dept_name, children } = tempList[i]
          this.firstLevelList.push({
            'id': id.toString(),
            'label': dept_name,
            parent,
            children
          })
        }
      })
    },
    getSecTableList() {
      getFirstLevelList().then(response => {
        const tempList = response.data
        this.tableData = [];
        for (const i in tempList) {
          const {children, dept_name} = tempList[i]
          for(const j in children) {
            this.tableData.push({
              dept_name: children[j].dept_name,
              dept_code: children[j].dept_code,
              remark: children[j].remark,
              parent_name: tempList[i].dept_name
            })
          }
        }
      })
    },
    handleCreateFirst() {
      this.resetTemp()
      this.dialogStatus = 'createFirst' // 创建一级部门
      this.dialogFormVisible = true
      this.firstLevelVisible = true // 一级新增
    },
    handleCreateSec() {
      this.resetTemp()
      this.options = this.firstLevelList // 加载下拉树数据
      this.dialogFormVisible = true
      this.firstLevelVisible = false
      this.dialogStatus = 'createSec' // 二级新增
    },
    saveData() {
      const type = this.dialogStatus
      switch (type) {
        case 'createFirst': // 一级部门保存
          this.$refs['dataForm'].validate(valid => {
            if (valid) {
              addFirstLevel(this.temp).then(response => {
                this.dialogFormVisible = false
                this.fetchFirstLevelList()
                this.$notify({
                  title: '新增一级部门成功',
                  type: 'success',
                  duration: 2000
                })
              })
            }
          })
          break
        case 'createSec': // 二级部门保存
          this.$refs['dataForm'].validate(valid => {
            if (valid) {
              addSecLevel(this.temp).then(response => {
                this.dialogFormVisible = false
                this.fetchFirstLevelList()
                this.$notify({
                  title: '新增二级部门成功',
                  type: 'success',
                  duration: 2000
                })
              })
            }
          })
          break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  html,body,#app,.el-container,app-container{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
      /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
  }
  .el-header{
    height: 45px !important;
    padding: 0 5px 0 0;
  }
  .commonbtn{
    margin-top 5px;
    float: right;
    clear: right;
  }
  .commonBg{
    border: 1px solid rgb(242, 242, 242);
    border-radius: 5px;
    margin 5px;
  }

</style>

