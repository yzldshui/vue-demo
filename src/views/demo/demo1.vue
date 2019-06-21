<template>
  <div class="app-container">
    <div>
      <el-button type="primary" @click="startCalc">start</el-button>
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item :label="posArr[0]">
          <el-select v-model="form.eq1" placeholder="">
            <el-option v-for="e in eqs1" :key="e.id" :label="e.name" :value="e.id"/>
          </el-select>
          <el-checkbox v-model="form.jz1">满精铸</el-checkbox>
        </el-form-item>
        <el-form-item :label="posArr[1]">
          <el-select v-model="form.eq2" placeholder="">
            <el-option v-for="e in eqs2" :key="e.id" :label="e.name" :value="e.id"/>
          </el-select>
          <el-checkbox v-model="form.jz2">满精铸</el-checkbox>
        </el-form-item>
        <el-form-item :label="posArr[2]">
          <el-select v-model="form.eq3" placeholder="">
            <el-option v-for="e in eqs3" :key="e.id" :label="e.name" :value="e.id"/>
          </el-select>
          <el-checkbox v-model="form.jz3">满精铸</el-checkbox>
        </el-form-item>
        <el-form-item :label="posArr[3]">
          <el-select v-model="form.eq4" placeholder="">
            <el-option v-for="e in eqs4" :key="e.id" :label="e.name" :value="e.id"/>
          </el-select>
          <el-checkbox v-model="form.jz4">满精铸</el-checkbox>
        </el-form-item>
        <el-form-item :label="posArr[4]">
          <el-select v-model="form.eq5" placeholder="">
            <el-option v-for="e in eqs5" :key="e.id" :label="e.name" :value="e.id"/>
          </el-select>
          <el-checkbox v-model="form.jz5">满精铸</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        :data="list"
        style="width: 100%">
        <el-table-column
          prop="tj"
          label="特技"
        />
        <el-table-column
          prop="pos1"
          label="pos1"
        />
        <el-table-column
          prop="pos2"
          label="pos2"
        />
        <el-table-column
          prop="pos3"
          label="pos3"
        />
        <el-table-column
          prop="pos4"
          label="pos4"
        />
        <el-table-column
          prop="pos5"
          label="pos5"
        />
        <el-table-column
          prop="sum"
          label="求和"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      form: {
        eq1: 'mjs-1',
        jz1: true,
        eq2: 'mjs-2',
        jz2: true,
        eq3: 'mjs-3',
        jz3: true,
        eq4: 'mjs-4',
        jz4: true,
        eq5: 'mjs-5',
        jz5: true
      },
      eqs1: [],
      eqs2: [],
      eqs3: [],
      eqs4: [],
      eqs5: [],
      posArr: ['头部', '胸甲', '护肩', '护手', '腿甲'],
      tjList: [],
      list: []
    }
  },
  mounted() {
    this.initEqData()
  },
  methods: {
    initEqData() {
      const data = require('@/json/data1.json')
      this.eqs1 = data.filter(item => item.pos === '头盔')
      this.eqs2 = data.filter(item => item.pos === '胸甲')
      this.eqs3 = data.filter(item => item.pos === '护肩')
      this.eqs4 = data.filter(item => item.pos === '护手')
      this.eqs5 = data.filter(item => item.pos === '腿甲')
    },
    startCalc() {
      const temp = []
      const selectedEqs = this.getSelectedEqs()
      console.log(selectedEqs)
      this.tjList = require('@/json/tj_list.json')
      for (let i = 0; i < this.tjList.length; i++) {
        const tjName = this.tjList[i]
        temp.push({
          tj: tjName,
          pos1: this.getPoint(selectedEqs[0], tjName),
          pos2: this.getPoint(selectedEqs[1], tjName),
          pos3: this.getPoint(selectedEqs[2], tjName),
          pos4: this.getPoint(selectedEqs[3], tjName),
          pos5: this.getPoint(selectedEqs[4], tjName)
        })
      }
      this.list = this.killEmpty(temp).filter(item => item.show)
    },
    killEmpty(temp) {
      temp.forEach(item => {
        if (this.isEmptyTj(item)) {
          item.show = false
        } else {
          item.show = true
        }
        item.sum = this.sum(item.pos1, item.pos2, item.pos3, item.pos4, item.pos5)
      })
      return temp
    },
    isEmptyTj(row) {
      return !(row.pos1 || row.pos2 || row.pos3 || row.pos4 || row.pos5)
    },
    getPoint(arr, tjName) {
      const tj = arr.find(item => item.key === tjName)
      if (tj) {
        return tj.value
      } else {
        return ''
      }
    },
    getSelectedEqs() {
      const result = []
      let id = ''
      let eq = {}
      let jz = false
      for (let i = 1; i < 6; i++) {
        id = this.form['eq' + i]
        jz = this.form['jz' + i]
        eq = this['eqs' + i].find(e => e.id === id)
        result.push(this.getTjArr(eq, jz))
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
    }
  }
}
</script>
