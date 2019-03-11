<template>
  <div class="login-wrap">
    <div id="login-bg"></div>
    <el-form :model="formItem" :rules="rules" ref="ruleForm" class="login-main" size="small">
      <h3 class="login-title">乾亨分销平台-{{type=='login'?'系统登录':'用户注册'}}</h3>
      <el-form-item>
        <span class="el-form-item__label">请选择您的角色</span>
        <el-radio v-model="formItem.role" label="1">买家</el-radio>
        <el-radio v-model="formItem.role" label="2">卖家</el-radio>
        <el-radio v-model="formItem.role" label="3" v-if="type!='login'">既是买家又是卖家</el-radio>
      </el-form-item>
      <el-form-item prop="loginId">
        <el-input type="text" class="el-input-mine" placeholder="请输入用户名" v-model="formItem.loginId" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" class="el-input-mine" placeholder="请输入密码" v-model="formItem.password"></el-input>
      </el-form-item>
      <el-row :gutter="20" v-if="type=='login'">
        <el-col :span="16">
          <el-form-item prop="imgCode" >
            <el-input
              type="text" class="el-input-mine"
              placeholder="请输入验证码"
              v-model="formItem.imgCode" auto-complete="off"
              @keyup.enter.native="submit"
            >
            </el-input>

          </el-form-item>
        </el-col>
        <el-col :span="8">
          <img class="codeImg" :src="codeImg" @click="getImageCode"/>
        </el-col>
      </el-row>

      <div v-if="type!='login'">
        <el-form-item prop="confirmPwd">
          <el-input type="password" class="el-input-mine" placeholder="请输入确认密码" v-model="formItem.confirmPwd"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item prop="imgCode">
              <el-input
                type="text" class="el-input-mine"
                placeholder="请输入验证码"
                v-model="formItem.imgCode" auto-complete="off"
                @keyup.enter.native="submit"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <img class="codeImg" :src="codeImg" @click="getImageCode"/>
          </el-col>
        </el-row>
        <el-form-item prop="phone">
          <el-input type="text" class="el-input-mine" placeholder="请输入手机号" v-model="formItem.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item prop="smsCode">
              <el-input
                type="text" class="el-input-mine"
                placeholder="请输入短信验证码"
                v-model="formItem.smsCode" auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
              <el-button
                type="primary"
                @click="getSmsCode"
                :disabled="smsLoading"
                size="small"
              >{{smsText}}</el-button>
          </el-col>
        </el-row>

        <el-form-item prop="realName">
          <el-input type="text" class="el-input-mine" placeholder="请输入真实姓名" v-model="formItem.realName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input type="text" class="el-input-mine" placeholder="请输入公司电话" v-model="formItem.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input type="text" class="el-input-mine" placeholder="请输入邮箱地址" v-model="formItem.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="sex">
          <span class="el-form-item__label">请选择您的性别</span>
          <el-radio v-model="formItem.sex" label="1">男</el-radio>
          <el-radio v-model="formItem.sex" label="0">女</el-radio>
        </el-form-item>
      </div>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-button type="primary" style="width:100%;" :loading="loading" @click="submit">{{type=='login'?'登录':'注册'}}</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="danger"  style="width:100%;"  @click="changeType">{{type=='login'?'去注册':'去登录'}}</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import Cookie from 'js-cookie'
import { passCheck, phoneCheck, emailCheck } from '@/utils/validate'
import { getImageCode, userLogin, getSmsCode, userRegister } from '@/api/userInfo'
import JParticles from 'jparticles/production/jparticles'
import 'jparticles/production/particle'
export default {
  data () {
    const validAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    const validPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else if (passCheck(value)) {
        return callback(new Error('密码不能少于8位,且必须有数字字母组合'))
      } else {
        callback()
      }
    }
    const validPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else if (!phoneCheck(value)) {
        return callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    const validCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    const validName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入真实姓名'))
      } else {
        callback()
      }
    }
    const validEmail = (rule, value, callback) => {
      if (value && !emailCheck(value)) {
        return callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }
    const validConfirm = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入确认密码'))
      } else if (value !== this.formItem.password) {
        return callback(new Error('确认密码和密码不一致'))
      } else {
        callback()
      }
    }
    return {
      type: 'login',
      codeImg: '',
      formItem: {
        loginId: '',
        password: '',
        confirmPwd: '',
        imgCode: '',
        imgId: '',
        phone: '',
        smsCode: '',
        smsId: '',
        realName: '',
        mobile: '',
        sex: '1',
        email: '',
        role: '1'
      },
      rules: {
        loginId: [
          {
            validator: validAccount,
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: validPass,
            trigger: 'blur'
          }
        ],
        imgCode: [
          {
            validator: validCode,
            trigger: 'blur'
          }
        ],
        phone: [
          {
            validator: validPhone,
            trigger: 'blur'
          }
        ],
        realName: [
          {
            validator: validName,
            trigger: 'blur'
          }
        ],
        email: [
          {
            validator: validEmail,
            trigger: 'blur'
          }
        ],
        confirmPwd: [
          {
            validator: validConfirm,
            trigger: 'blur'
          }
        ],
        name: [
          {
            validator: validName,
            trigger: 'blur'
          }
        ]
      },
      loading: false,
      smsText: '获取短信验证码',
      smsLoading: false
    }
  },
  created () {
    localStorage.removeItem('TOKEN')
    this.getImageCode()

  },
  mounted () {
    new JParticles.particle('#login-bg',{
      color: '#25bfff',
      lineShape: 'cube',
      range: 850,
      proximity: 120,
      // 开启视差效果
      parallax: true,
      maxR: 5,
      minR: 2,
      maxSpeed: 0.3
    })
  },
  methods: {
    loginIn (formName) {
      if(this.formItem.role === '3'){
        this.$message.error('请选择您的角色')
        return false
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('login')
          this.loading = true
          let data = {
            imgCode: this.formItem.imgCode,
            imgId: this.formItem.imgId,
            loginId: this.formItem.loginId,
            password: this.formItem.password,
            role: this.formItem.role
          }
          userLogin(data).then(res => {
            if (res.code !== 0) {
              this.$message.error(res.message)
              this.getImageCode()
            } else {
              Cookie.set('user', res.data)
              Cookie.set('role', this.formItem.role) // 用于拉去用户可支配的路由权限
              localStorage.setItem('TOKEN', res.data.TOKEN)
              localStorage.setItem('imageUrl', res.data.image) // 设置头像url
              localStorage.setItem('role', this.formItem.role) // 设置头像url
              this.$store.commit('setCurrentUserInfo', res.data.role) // manage user info
              this.$store.commit('message/SET_IMAGEURL', res.data.image)  // 设置头像url
              this.$router.push({
                path: 'dashboard'
              })
            }
            this.loading = false
          }).catch(e => {
            this.loading = false
            console.log(e)
          })
        } else {
          return false
        }
      })
    },
    register (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('register')
          console.log(this.formItem)
          this.loading = true
          userRegister(this.formItem).then(res => {
            if (res.code !== 0) {
              this.$message.error(res.message)
              this.getImageCode()
            } else {
              this.$message.success('注册成功!请登录')
              this.type = 'login'
            }
            this.loading = false
          }).catch(e => {
            this.loading = false
            console.log(e)
          })
        } else {
          return false
        }
      })
    },
    getImageCode () {
      getImageCode().then(res => {
        this.codeImg = res.data.image
        this.formItem.imgId = res.data.imgId
      }).catch(e => {
        console.log(e)
      })
    },
    getSmsCode () {
      console.log(this.formItem.phone)
      if (this.formItem.phone === '') {
        this.$message.error('请输入手机号码')
        return false
      }
      if (this.formItem.imgCode === '') {
        this.$message.error('请输入图片验证码')
        return false
      }
      getSmsCode({
        phone: this.formItem.phone,
        imgId: this.formItem.imgId,
        imgCode: this.formItem.imgCode
      }).then(res => {
        if (res.code !== 0) {
          this.$message.error(res.message)
          this.getImageCode()
        } else {
          this.formItem.smsId = res.data.smsId
          this.smsLoading = true
          let time = 60
          let timer = setInterval(() => {
            this.smsText = (--time) + 's后重新获取'
            if (time === 0) {
              clearInterval(timer)
              this.smsLoading = false
              this.smsText = '获取短信验证码'
            }
          }, 1000)
        }
      }).catch(e => {
        console.log(e)
      })

    },
    changeType () {
      if (this.type == 'login') {
        this.type = 'register'
      } else {
        this.type = 'login'
      }
    },
    submit () {
      this.type == 'login' ? this.loginIn('ruleForm') : this.register('ruleForm')
    }
  }
}
</script>
<style lang="scss">
  @import './login.scss';
  .role-class{
    width: 100%;
    margin-bottom: 18px;
    .el-input__inner{
      background-color: #2d3a4b;
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, .6);
    }
  }
</style>
