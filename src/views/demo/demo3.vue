<template>
  <div class="app-container">
    <div>
      <el-autocomplete
        v-model="condition"
        :fetch-suggestions="findSuggestions"
        style="width:300px"
        placeholder="魂名称或特技名"
      />
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </div>
    <div style="margin-top: 15px;">
      <span>常规</span>
      <span class="txt-red">变异</span>
      <span class="txt-green">负值</span>
    </div>
    <!-- <div>
      {{ cardData }}
    </div> -->
    <div style="margin-top:15px;">
      <el-row :gutter="10">
        <el-col v-for="(data,index) in cardData" :xs="24" :lg="12" :md="12" :sm="12" :key="index">
          <el-card style="height: 280px;margin-bottom:15px;">
            <div class="txt">
              <span :class="{'txt-imp':data.lh.name===condition}" class="txt-title">{{ data.lh.name }}</span>
              <span :class="{'txt-imp':data.lh.t1===condition}">{{ data.lh.t1 }}</span>
              <span :class="{'txt-imp':data.lh.t3===condition}" class="txt-red">{{ data.lh.t3 }}</span>
              <span :class="{'txt-imp':data.lh.t2===condition}" class="txt-green">{{ data.lh.t2 }}</span>
            </div>
            <div class="txt" style="color:#409EFF;font-weight:bold;">圣契</div>
            <div v-for="(sq,index) in data.sq" :key="index" class="txt">
              <span :class="{'txt-imp':sq.name===condition}" class="txt-title">{{ sq.name }}</span>
              <span :class="{'txt-imp':sq.t1===condition}">{{ sq.t1 }}</span>
              <span :class="{'txt-imp':sq.t2===condition}" class="txt-red">{{ sq.t2 }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      condition: '',
      lhs: [],
      sqs: [],
      tjs: [],
      allWords: [],
      cardData: []
    }
  },
  created() {
    this.lhs = require('@/json/data2.json')
    this.sqs = require('@/json/data3.json')
    this.tjs = require('@/json/tj_list.json')
  },
  mounted() {
    this.allWords.push(...this.tjs)
    this.allWords = this.allWords.concat(this.lhs.map(item => item.name))
  },
  methods: {
    handleSearch() {
      const result = []
      const r1 = this.lhs.filter(item => item.name.indexOf(this.condition) > -1)
      const r2 = this.lhs.filter(item => item.t1.indexOf(this.condition) > -1 || item.t3.indexOf(this.condition) > -1)
      const lhSet1 = new Set((r1.concat(r2)).map(item => item.name))

      const s1 = this.sqs.filter(item => item.name.indexOf(this.condition) > -1)
      const s2 = this.sqs.filter(item => item.t1.indexOf(this.condition) > -1 || item.t2.indexOf(this.condition) > -1)
      const lhSet2 = new Set((s1.concat(s2)).map(item => item.pname))

      const set = new Set([...lhSet1, ...lhSet2])

      const tArr = [...set]
      tArr.forEach(name => {
        const lh = this.lhs.find(lh => lh.name === name)
        const sqs = this.sqs.filter(lh => lh.pname === name)
        result.push({
          lh: lh,
          sq: sqs
        })
      })
      this.initRestlt(result)
    },
    findSuggestions(queryString, cb) {
      var allWords = this.allWords
      const results = queryString ? allWords.filter(this.createFilter(queryString)) : allWords
      const r = results.map(item => ({ value: item }))
      cb(r)
    },
    createFilter(queryString) {
      return (word) => {
        return (word.indexOf(queryString) > -1)
      }
    },
    initRestlt(data) {
      this.cardData = data
    }
  }
}
</script>

<style lang="scss">
  .txt {
    line-height: 25px;
    >span {
      display: inline-block;
      width: 100px;
    }
  }
  .txt-title {
    font-weight: bold;
    display: inline-block;
    width: 120px;
  }
  .txt-red {
    color:rgb(205, 92, 190);
  }
  .txt-green {
    color:rgb(73, 187, 53);
  }
  .txt-imp {
    font-weight: bold;
    color: red;
  }
</style>

