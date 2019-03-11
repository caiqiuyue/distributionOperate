<template>
  <div>
    <el-dialog :title="title"
               :fullscreen="true"
               :visible.sync="dialogState.show"
               :close-on-click-modal="false"
               @open="onOpen"
               @close="onClose"
    >
      <div :style="contStyle">
        <iframe
          :src="url"
          frameborder="0"
          scrolling="auto"
          style="width: 100%;height: 100%;border:none;"
        ></iframe>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
export default{
  props: {
    dialogState: Object
  },
  data() {
    return{
      title: '...',
      url: '',
      contStyle: {
        height: (document.body.clientHeight - 54 - 60) + 'px'
      }
    }
  },
  computed: {
  },
  methods: {
    onOpen() {
      let formData=this.dialogState
      console.log(formData)
      this.title = formData.title
      this.url = formData.url
    },
    onClose() {
      this.title = '...'
      this.url = ''
    },
    cancel() {
      this.dialogState.show=false
    },
  }
}
</script>
