<template>
  <div class="app-container tool1">
    <div style="margin-bottom: 15px;">
      <el-button type="primary" size="small" @click="startCalc">查询</el-button>
    </div>
    <div :class="{'panel-collapse':isCollapse}" class="condition-panel">
      <div :class="{'rotato-180':!isCollapse}" class="expand-btn" @click="handleCollapse"><i class="el-icon-caret-bottom"/></div>
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <template v-for="(p,index) in posArr">
          <el-form-item :key="'a'+index" :label="p">
            <!-- 装备 -->
            <el-select v-model="form['eq'+(index+1)]" :placeholder="p" filterable class="select-width" clearable>
              <el-option v-for="e in eqs[index]" :key="e.id" :label="e.name" :value="e.id">
                <div style="width: 500px;display:flex;justify-content:space-between;" >
                  <div style="font-weight:bold;width:200px;">{{ e.name }}</div>
                  <div v-for="(t,index) in getEquipmentDiscribe(e, form['jz'+(index+1)])" :key="t+index" style="width:200px;">
                    {{ t }}
                  </div>
                </div>
              </el-option>
            </el-select>
            <el-checkbox v-model="form['jz'+(index+1)]" class="mr-10">满精铸</el-checkbox>
          </el-form-item>
        </template>
      </el-form>
    </div>
    <div>
      <el-table
        :data="list"
        size="mini"
        border>
        <el-table-column
          prop="tj"
          label="特技"
        />
        <el-table-column
          prop="pos1"
          label="头"
        />
        <el-table-column
          prop="pos2"
          label="胸"
        />
        <el-table-column
          prop="pos3"
          label="肩"
        />
        <el-table-column
          prop="pos4"
          label="手"
        />
        <el-table-column
          prop="pos5"
          label="腿"
        />
        <el-table-column
          prop="horse"
          label="马"
        />
        <el-table-column
          prop="ring"
          label="戒"
        />
        <el-table-column
          prop="title"
          label="称"
        />
        <el-table-column
          prop="sum"
          label="总"
        />
      </el-table>
    </div>
    <div v-if="showList2" style="margin-top:15px;">
      <el-table
        v-if="showList2"
        :data="list2"
        :span-method="tableSpanMethod"
        :row-style="boldRow"
        size="mini"
        border>
        <el-table-column
          prop="tj"
          label="特技"
        />
        <el-table-column
          prop="value"
          label="值"
        />
        <el-table-column
          prop="name"
          label="名称"
        />
        <el-table-column
          prop="desc"
          label="说明"
          min-width="600"
        />
      </el-table>
    </div>
    <el-dialog
      :visible.sync="showImport"
      title="导入"
      width="500"
    >
      <div>
        <el-input v-model="importTxt" :rows="8" type="textarea"/>
      </div>
      <div slot="footer">
        <el-button @click="showImport = false">取 消</el-button>
        <el-button type="primary" @click="doImport">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import clip from '@/utils/clipboard' // use clipboard directly
export default {

  data() {
    return {
      form: {
        eq1: 'rjx-1',
        jz1: true,
        eq2: 'rjx-2',
        jz2: true,
        eq3: 'rjx-3',
        jz3: true,
        eq4: 'rjx-4',
        jz4: true,
        eq5: 'rjx-5',
        jz5: true,
        lh1: '',
        sq11: '',
        sq12: '',
        lh2: '',
        sq21: '',
        sq22: '',
        lh3: '',
        sq31: '',
        sq32: '',
        lh4: '',
        sq41: '',
        sq42: '',
        lh5: '',
        sq51: '',
        sq52: '',
        lv1: 5,
        lv2: 5,
        lv3: 5,
        lv4: 5,
        lv5: 5,
        lv11: 5,
        lv21: 5,
        lv31: 5,
        lv41: 5,
        lv51: 5,
        lv12: 5,
        lv22: 5,
        lv32: 5,
        lv42: 5,
        lv52: 5,
        by1: true,
        by11: true,
        by12: true,
        by2: true,
        by21: true,
        by22: true,
        by3: true,
        by31: true,
        by32: true,
        by4: true,
        by41: true,
        by42: true,
        by5: true,
        by51: true,
        by52: true,
        ms1: '',
        ms2: '',
        ms3: '',
        ms4: '',
        ms5: '',
        msValue1: 0,
        msValue2: 0,
        msValue3: 0,
        msValue4: 0,
        msValue5: 0
      },
      horses: [
        { key: '', value: 0 }, { key: '', value: 0 }, { key: '', value: 0 }
      ],
      rings: [
        { key: '', value: 0 },
        { key: '', value: 0 },
        { key: '', value: 0 },
        { key: '', value: 0 },
        { key: '', value: 0 },
        { key: '', value: 0 }
      ],
      titles: [{ key: '', value: 0 }],
      // arr
      eqs: [
        [], [], [], [], []
      ],
      sqs1: [
        [], [], [], [], []
      ],
      sqs2: [
        [], [], [], [], []
      ],
      lhs: [],
      lhsTree: [],
      posArr: ['头盔', '胸甲', '护肩', '护手', '腿甲'],
      tjList: [],
      list: [],
      sqData: [],
      isCollapse: false,
      saveName: '',
      copyItem: '',
      showImport: false,
      importTxt: '',
      list2: [],
      showList2: false
    }
  },
  mounted() {
    this.initEqData()
    this.initLhData()
    this.tjList = require('@/json/tj_list.json')
  },
  methods: {
    handleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    handleCopy(data, event) {
      const saveItem = {
        form: this.form,
        horses: this.horses,
        rings: this.rings,
        titles: this.titles
      }
      clip(JSON.stringify(saveItem), event)
    },
    openImport() {
      this.importTxt = ''
      this.showImport = true
    },
    doImport() {
      if (!this.importTxt) {
        return
      }
      this.loadAllInfo(this.importTxt)
    },
    initEqData() {
      const data = require('@/json/data1.json')
      for (let i = 0; i < this.posArr.length; i++) {
        this.$set(this.eqs, i, data.filter(item => item.pos === this.posArr[i]))
      }
    },
    initLhData() {
      const data = require('@/json/data2.json')
      this.sqData = require('@/json/data3.json')
      this.lhs = data
      this.lhs.forEach(item => {
        const group = this.lhsTree.find(item2 => item2.label === item.series)
        if (!group) {
          this.lhsTree.push({
            label: item.series,
            options: [item]
          })
        } else {
          group.options.push(item)
        }
      })
      console.log(this.lhsTree)
    },
    handleLhChange(v, index) {
      const sqs = this.sqData.filter(item => item.pid === v)
      this.$set(this.sqs1, index, sqs)
      this.$set(this.sqs2, index, sqs)
    },
    getEquipmentDiscribe(eq, jzFlag) {
      const temp = [0, 0, 0, 0, 0]
      for (let i = 1; i <= 5; i++) {
        temp[i - 1] = parseInt(eq['v' + i])
        if (jzFlag) {
          if (eq['t' + i] === eq.j1) {
            temp[i - 1] += parseInt(eq.w1)
          } else if (eq['t' + i] === eq.j2) {
            temp[i - 1] += parseInt(eq.w2)
          }
        }
      }
      return [`${eq.t1}(${temp[0]})`, `${eq.t2}(${temp[1]})`, `${eq.t3}(${temp[2]})`, `${eq.t4}(${temp[3]})`, `${eq.t5}(${temp[4]})`]
    },
    getLhDiscribe(lh, by, lv) {
      const temp = []
      temp.push(`${lh.t1}(${lh.v1 - (5 - lv)})`)
      temp.push(`${lh.t2}(${lh.v2 - (-5 + lv)})`)
      if (by) {
        temp.push(`${lh.t3}(${lh.v3 - (5 - lv)})`)
      }
      return temp
    },
    getSqDiscribe(lh, by, lv) {
      const temp = []
      temp.push(`${lh.t1}(${this.getSqValue(lv)})`)
      if (by) {
        temp.push(`${lh.t2}(${this.getSqValue(lv)})`)
      }
      return temp
    },
    startCalc() {
      const temp = []
      const selectedEqs = this.getSelectedEqs()
      const selectedLhs = this.getSelectedLhs()
      const selectedSqs1 = this.getSelectedSqs(1)
      const selectedSqs2 = this.getSelectedSqs(2)
      // this.tjList = require('@/json/tj_list.json')
      for (let i = 0; i < this.tjList.length; i++) {
        const tjName = this.tjList[i]
        temp.push({
          tj: tjName,
          pos1: this.getPoint(0, tjName, [selectedEqs, selectedLhs, selectedSqs1, selectedSqs2]),
          pos2: this.getPoint(1, tjName, [selectedEqs, selectedLhs, selectedSqs1, selectedSqs2]),
          pos3: this.getPoint(2, tjName, [selectedEqs, selectedLhs, selectedSqs1, selectedSqs2]),
          pos4: this.getPoint(3, tjName, [selectedEqs, selectedLhs, selectedSqs1, selectedSqs2]),
          pos5: this.getPoint(4, tjName, [selectedEqs, selectedLhs, selectedSqs1, selectedSqs2]),
          horse: this.getPoint2(tjName, this.horses),
          ring: this.getPoint2(tjName, this.rings),
          title: this.getPoint2(tjName, this.titles)
        })
      }
      this.list = this.killEmpty(temp).filter(item => item.show)
      this.list = this.list.sort((a, b) => b.sum - a.sum)
      // this.list = temp
      this.initTable2()
    },
    getPoint(index, tjName, data) {
      let r = 0
      data.forEach(item => {
        const tj = item[index].find(item2 => item2.key === tjName)
        if (tj) {
          r = r + parseInt(tj.value)
        } else {
          console.log()
        }
      })
      // 脉石
      if (tjName === this.form['ms' + (index + 1)]) {
        r = r + this.form['msValue' + (index + 1)]
      }
      return r
    },
    getPoint2(tjName, data) {
      let r = 0
      const tj = data.find(item => item.key === tjName)
      if (tj) {
        r = r + parseInt(tj.value)
      } else {
        console.log()
      }
      return r
    },
    killEmpty(temp) {
      temp.forEach(item => {
        if (this.isEmptyTj(item)) {
          item.show = false
        } else {
          item.show = true
        }
        item.sum = this.sum(item.pos1, item.pos2, item.pos3, item.pos4, item.pos5, item.horse, item.ring, item.title)
      })
      return temp
    },
    isEmptyTj(row) {
      return !(row.pos1 || row.pos2 || row.pos3 || row.pos4 || row.pos5)
    },
    getSelectedSqs(num) {
      const result = []
      for (let i = 0; i < 5; i++) {
        const lhId = this.form['lh' + (i + 1)]
        const lhBy = this.form['by' + (i + 1)]
        const sqId = this.form['sq' + (i + 1) + num]
        const sqBy = this.form['by' + (i + 1) + num]
        const sqLv = this.form['lv' + (i + 1) + num]
        const sq = this.sqData.find(e => e.id === sqId && e.pid === lhId)
        const by = lhBy && sqBy
        result.push(this.getTjSqArr(sq, by, sqLv))
      }
      return result
    },
    getSelectedLhs() {
      const result = []
      for (let i = 0; i < 5; i++) {
        const id = this.form['lh' + (i + 1)]
        const by = this.form['by' + (i + 1)]
        const lv = this.form['lv' + (i + 1)]
        const lh = this.lhs.find(e => e.id === id)
        result.push(this.getTjLhArr(lh, by, lv))
      }
      return result
    },
    getSelectedEqs() {
      const result = []
      let id = ''
      let eq = {}
      let jz = false
      for (let i = 1; i < 6; i++) {
        id = this.form['eq' + i]
        jz = this.form['jz' + i]
        eq = this.eqs[i - 1].find(e => e.id === id)
        result.push(this.getTjArr(eq, jz))
      }
      return result
    },
    getSqValue(lv) {
      if (lv < 2) {
        return 1
      } else if (lv < 4) {
        return 2
      } else if (lv < 5) {
        return 3
      } else if (lv < 6) {
        return 4
      } else {
        return 0
      }
    },
    getTjSqArr(lh, by, lv) {
      if (!lh) {
        return []
      }
      const result = []
      const v = this.getSqValue(lv)
      result.push({
        key: lh.t1,
        value: v
      })
      if (by) {
        const tj1 = result.find(item => item.key === lh.t2)
        if (!tj1) {
          result.push({
            key: lh.t2,
            value: v
          })
        } else {
          tj1.value = this.sum(tj1.value, v)
        }
      }
      return result
    },
    getTjLhArr(lh, by, lv) {
      if (!lh) {
        return []
      }
      const result = []
      result.push({
        key: lh.t1,
        value: parseInt(lh.v1) - (5 - lv)
      })
      result.push({
        key: lh.t2,
        value: parseInt(lh.v2) + (5 - lv)
      })
      if (by) {
        const tj1 = result.find(item => item.key === lh.t3)
        if (!tj1) {
          result.push({
            key: lh.t3,
            value: parseInt(lh.v3) - (5 - lv)
          })
        } else {
          tj1.value = this.sum(tj1.value, parseInt(lh.v3) - (5 - lv))
        }
      }
      return result
    },
    getTjArr(eq, jz) {
      if (!eq) {
        return []
      }
      const result = []
      result.push({
        key: eq.t1,
        value: eq.v1
      })
      result.push({
        key: eq.t2,
        value: eq.v2
      })
      result.push({
        key: eq.t3,
        value: eq.v3
      })
      result.push({
        key: eq.t4,
        value: eq.v4
      })
      result.push({
        key: eq.t5,
        value: eq.v5
      })
      if (jz) {
        const tj1 = result.find(item => item.key === eq.j1)
        if (!tj1) {
          result.push({
            key: eq.j1,
            value: eq.w1
          })
        } else {
          tj1.value = this.sum(tj1.value, eq.w1)
        }
        const tj2 = result.find(item => item.key === eq.j2)
        if (!tj2) {
          result.push({
            key: eq.j2,
            value: eq.w2
          })
        } else {
          tj2.value = this.sum(tj2.value, eq.w2)
        }
      }
      return result
    },
    sum(...v) {
      let r = 0
      for (let i = 0; i < v.length; i++) {
        if (!v[i]) {
          v[i] = 0
        }
        r = r + parseInt(v[i])
      }
      return r
    },
    save() {
      if (!this.saveName || !this.saveName.trim()) {
        this.$message.warning('输入存档名')
        return
      }
      if (localStorage.getItem(this.saveName)) {
        this.$confirm(`${this.saveName}已存在, 确定覆盖?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const saveItem = {
            form: this.form,
            horses: this.horses,
            rings: this.rings,
            titles: this.titles
          }
          localStorage.setItem(this.saveName, JSON.stringify(saveItem))
        }).catch(() => {})
      }
    },
    load() {
      if (!this.saveName) {
        this.$message.warning('输入存档名')
        return
      }
      const t = localStorage.getItem(this.saveName)
      this.loadAllInfo(t)
    },
    loadAllInfo(t) {
      if (!t) {
        return
      }
      t = JSON.parse(t)
      this.form = t.form
      this.horses = t.horses
      this.rings = t.rings
      this.titles = t.titles
      for (let i = 0; i < 5; i++) {
        this.handleLhChange(this.form['lh' + (i + 1)], i)
      }
      this.showImport = false
    },
    initTable2() {
      const tjAll = require('@/json/tj_desc.json')
      const tjDesc = tjAll.map(item => ({
        tj: item.tj,
        name: item.name,
        value: item.value,
        desc: item.desc
      }))
      const enableList = this.list.filter(item => item.sum <= -10 || item.sum >= 10)
      let result = []
      enableList.forEach(item => {
        const tempArr = tjDesc.filter(tj => tj.tj === item.tj)
        if (item.sum > 0) {
          for (let i = 0; i < tempArr.length; i++) {
            const v = parseInt(tempArr[i].value)
            if (item.sum >= v && v > 0) {
              tempArr[i].bold = true
              break
            }
          }
        } else {
          for (let i = tempArr.length - 1; i >= 0; i--) {
            const v = parseInt(tempArr[i].value)
            if (item.sum <= v && v < 0) {
              tempArr[i].bold = true
              break
            }
          }
        }
        result = result.concat(tempArr)
      })
      for (let i = 0; i < result.length; i++) {
        const ele = result[i]
        if (i === 0) {
          ele.span = result.filter(item => item.tj === ele.tj).length
        } else {
          if (ele.tj === result[i - 1].tj) {
            ele.span = 0
          } else {
            ele.span = result.filter(item => item.tj === ele.tj).length
          }
        }
      }
      this.showList2 = false
      this.list2 = result
      setTimeout(() => {
        this.showList2 = true
      }, 300)
    },
    tableSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (row.span > 0) {
          return [row.span, 1]
        } else {
          return [0, 0]
        }
      }
    },
    boldRow({ row, rowIndex }) {
      if (row.bold) {
        return 'font-weight:bold;color:#409eff'
      }
      return ''
    }
  }
}
</script>

<style lang="scss">
  .tool1 {
    .input-number-width {
      width: 80px;
    }
    .select-width {
      width: 100px;
    }
    .mr-10 {
      margin-right: 10px;
    }
    .expand-btn {
      background-color: #eee;
      height: 40px;
      text-align: center;
      i {
        transition: all ease-out 0.5s;
      }
      cursor: pointer;
      &:hover {
        color: blue;
      }
      &.rotato-180 {
        i {
          transform: rotate(180deg)
        }
      }
    }
    .condition-panel {
      transition: all ease 0.5s;
      max-height: 2000px;
      line-height: 40px;
    }
    .panel-collapse {
      max-height: 40px;
      overflow-y: hidden;
    }
  }
</style>
