<template>
  <div class="app-container tool1">
    <div style="margin-bottom: 15px;">
      <el-button type="primary" size="small" @click="startCalc">计算</el-button>
    </div>
    <div :class="{'panel-collapse':isCollapse}" class="condition-panel">
      <div :class="{'rotato-180':!isCollapse}" class="expand-btn" @click="handleCollapse"><i class="el-icon-caret-bottom"/></div>
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <template v-for="(p,index) in posArr">
          <el-form-item :key="'a'+index" :label="p">
            <el-select v-model="form['eq'+(index+1)]" :placeholder="p" filterable class="select-width" clearable>
              <el-option v-for="e in eqs[index]" :key="e.id" :label="e.name" :value="e.id"/>
            </el-select>
            <el-checkbox v-model="form['jz'+(index+1)]" class="mr-10">满精铸</el-checkbox>
            <el-select v-model="form['ms'+(index+1)]" placeholder="脉石" filterable class="select-width" clearable>
              <el-option v-for="t in tjList" :key="t" :label="t" :value="t"/>
            </el-select>
            <el-input-number v-model="form['msValue'+(index+1)]" :min="0" :max="3" controls-position="right" class="input-number-width" />
          </el-form-item>
          <el-form-item :key="'b'+index" label="猎魂">
            <!-- 主魂 -->
            <el-select v-model="form['lh'+(index+1)]" filterable class="select-width" placeholder="镶嵌魂" clearable @change="handleLhChange(form['lh'+(index+1)],index)">
              <el-option v-for="e in lhs" :key="e.id" :label="e.name" :value="e.id"/>
            </el-select>
            <el-input-number v-model="form['lv'+(index+1)]" :min="1" :max="5" controls-position="right" class="input-number-width" />
            <el-checkbox v-model="form['by'+(index+1)]">变异</el-checkbox>
            <!-- 圣契1 -->
            <el-select v-model="form['sq'+(index+1)+'1']" filterable clearable class="select-width" placeholder="圣契1">
              <el-option v-for="e in sqs1[index]" :key="e.id" :label="e.name" :value="e.id"/>
            </el-select>
            <el-input-number v-model="form['lv'+(index+1)+1]" :min="1" :max="5" controls-position="right" class="input-number-width" />
            <el-checkbox v-model="form['by'+(index+1)+'1']">变异</el-checkbox>
            <!-- 圣契2 -->
            <el-select v-model="form['sq'+(index+1)+'2']" filterable clearable class="select-width" placeholder="圣契2">
              <el-option v-for="e in sqs2[index]" :key="e.id" :label="e.name" :value="e.id"/>
            </el-select>
            <el-input-number v-model="form['lv'+(index+1)+2]" :min="1" :max="5" controls-position="right" class="input-number-width" />
            <el-checkbox v-model="form['by'+(index+1)+'2']">变异</el-checkbox>
          </el-form-item>
        </template>
        <el-form-item label="马">
          <template v-for="(h,i) in horses">
            <el-select v-model="h.key" :key="'a'+i" :placeholder="'特技'+(i+1)" filterable clearable class="select-width">
              <el-option v-for="t in tjList" :key="t" :label="t" :value="t"/>
            </el-select>
            <el-input-number v-model="h.value" :key="'b'+i" :min="0" :max="6" controls-position="right" class="input-number-width mr-10" />
          </template>
        </el-form-item>
        <el-form-item label="戒指">
          <template v-for="(h,i) in rings">
            <el-select v-model="h.key" :key="'a'+i" :placeholder="'特技'+(i+1)" filterable clearable class="select-width">
              <el-option v-for="t in tjList" :key="t" :label="t" :value="t"/>
            </el-select>
            <el-input-number v-model="h.value" :key="'b'+i" :min="-1" :max="4" controls-position="right" class="input-number-width mr-10" />
          </template>
        </el-form-item>
        <el-form-item label="称号">
          <template v-for="(h,i) in titles">
            <el-select v-model="h.key" :key="'a'+i" :placeholder="'特技'" filterable clearable class="select-width">
              <el-option v-for="t in tjList" :key="t" :label="t" :value="t"/>
            </el-select>
            <el-input-number v-model="h.value" :key="'b'+i" :min="0" :max="5" controls-position="right" class="input-number-width mr-10" />
          </template>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        :data="list"
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
  </div>
</template>

<script>
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
      posArr: ['头盔', '胸甲', '护肩', '护手', '腿甲'],
      tjList: [],
      list: [],
      sqData: [],
      isCollapse: false
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
    },
    handleLhChange(v, index) {
      const sqs = this.sqData.filter(item => item.pid === v)
      this.$set(this.sqs1, index, sqs)
      this.$set(this.sqs2, index, sqs)
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
      // this.list = temp
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
      } else if (lv < 3) {
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
