<template>
  <div class="ds-inputNumber">
    <button @click="handleReduce" :disabled="currentValue <= min">-</button>
      <input type="text" :min="0" :value="currentValue" @change="handleChange" @keydown="handleKeydown" />
    <button @click="handleAdd" :disabled="currentValue >= maxValue">+</button>
  </div>
</template>
<style lang="scss">
  .ds-inputNumber{
    input{
      width: 24px;
      text-align: center;
    }
  }
</style>
<script>
export default{
  props: {
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      maxValue: this.max === -1 ? 10000 : this.max,
      currentValue: this.value,
      oldValue: 0
    }
  },
  mounted: function () {
    this.updateValue(this.value);
  },
  methods: {
    isValueNumber(value) {
      return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value)
    },
    handleChange: function (event) {
      var val = event.target.value.trim()
      console.log(val)
      if (this.isValueNumber(val)) {
        var max = this.maxValue
        var min = this.min
        val = Number(val)
        this.currentValue = val
        if (val > max) this.currentValue = max
        if (val < min) this.currentValue = min
      } else {
        event.target.value = this.currentValue
      }
      this.$emit('onChange', {
        value: this.currentValue,
        _value: this.oldValue
      })
      this.oldValue = this.currentValue
    },
    handleKeydown: function (event) {
      if (event.keyCode == 38) {
        this.handleAdd()
      }
      if (event.keyCode == 40) {
        this.handleReduce()
      }
    },
    handleAdd: function () {
      if (this.currentValue >= this.maxValue) return
      this.currentValue += this.step
      this.$emit('onChange',  {
        value: this.currentValue ,
        _value: this.oldValue
      })
      this.oldValue = this.currentValue
    },
    handleReduce: function () {
      if (this.currentValue <= this.min) return
      this.currentValue -= this.step
      this.$emit('onChange',  {
        value: this.currentValue ,
        _value: this.oldValue
      })
      this.oldValue = this.currentValue
    },
    updateValue: function (val) {
      if (val > this.maxValue) val = this.maxValue
      if (val < this.min) val = this.min
      this.currentValue = val
      this.oldValue = val
    }
  }
}
</script>
