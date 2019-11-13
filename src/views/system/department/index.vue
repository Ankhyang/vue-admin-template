<template>
  <div class="app-container">
    <el-container direction="vertical">
      <el-header>
        <el-button-group class="commonbtn">
          <el-button type="primary" size="medium" @click="handleCreateFirst">新增一级</el-button>
          <el-button type="primary" size="medium">新增二级</el-button>
        </el-button-group>
      </el-header>
      <el-container>
        <el-aside width="30%" class="commonBg">
          <el-tree :data="firstLevelList" :props="defaultProps" node-key="id"></el-tree>
        </el-aside>
        <el-main class="commonBg">
          主页
        </el-main>
      </el-container>
    </el-container>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form size="small" :rules="rules" :model="temp" label-width="80px" style="width:60%; margin: 0 auto">
        <el-form-item label="部门编码" prop="dept_code">
          <el-input v-model="temp.dept_code"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="dept_name">
          <el-input v-model="temp.dept_name"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="temp.remark" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" size="small" @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import { getFirstLevelList } from '@/api/system/department'
export default {
  data() {
    return {
      firstLevelList: [],
      defaultProps: {
        label: 'label',
        children: 'children',
        isLeaf: false
      },
      rules: {
        dept_code: [{ required: true, message: '编码必填', trigger: 'blur' }],
        dept_name: [{ required: true, message: '描述必填', trigger: 'blur' }]
      },
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {
        dept_name: '',
        dept_code: '',
        parent_id: '',
        remark: ''
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
        for (const i in tempList) {
          const { id, dept_name } = tempList[i]
          this.firstLevelList.push({
            id,
            'label': dept_name,
            'children': []
          })
        }
      })
    },
    handleCreateFirst() {
      this.dialogStatus = 'createFirst'
      this.dialogFormVisible = true
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
  .dialog-footer{
    margin : 0 auto;
    text-align: center;
  }
  .el-dialog__footer{
    background-color #ececec !imporatnt;
  }
</style>

