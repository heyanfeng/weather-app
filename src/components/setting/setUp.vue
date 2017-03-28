<template>
  <div class="setting">
    <div class="header">
      <router-link to="/"><Icon type="arrow-left-c" class="icon"></Icon></router-link>
      <span>设置</span>
    </div>
    <Collapse>
      <Panel name="1">
        温度单位
        <p slot="content">
          <Radio-group v-model="check" @on-change="unit">
            <Radio label=0>
              <span>°C</span>
            </Radio>
            <Radio label=1>
              <span>°F</span>
            </Radio>
          </Radio-group>
        </p>
      </Panel>
    </Collapse>
  </div> 
</template>
<script>
  export default {
    name: 'setUp',
    data () {
      return {
        check: this.$store.state.unit
      }
    },
    methods: {
      unit () {
        this.$store.commit('unit', this.check)
      }
    }
  }
</script>
<style scoped>
  .setting .header {
    color: #fff;
    border-bottom: 2px solid #fff;
    font-size: 14px;
  }
  .setting .header .icon {
    color: #fff;
    margin: 10px;
  } 
</style>
