<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/logo.jpg" alt="my login image" />
    </div>
    <!-- 手机号 -->
    <InputGroup
      type="number"
      v-model="phone"
      placeholder="手机号"
      :disabled="disabled"
      :error="error.phone"
      :btnTitle="btnTitle"
      @btnClick="getVerifyCode"
    />
    <!-- 验证码 -->
    <InputGroup
      type="number"
      v-model="verifyCode"
      placeholder="验证码"
      :error="error.code"
    />
    <!-- 用户协议 -->
    <div class="login_des">
      <p>
        新用户登录即自动注册，表示已同意
        <span>《用户服务协议》</span>
      </p>
    </div>
    <!-- 登录按钮 -->
    <div class="login_btn">
      <button>登录</button>
    </div>
  </div>
</template>

<script>
import InputGroup from "../components/InputGroup.vue";
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      verifyCode: "",
      error: {},
      btnTitle: "获取验证码",
      disabled: false,
    };
  },
  methods: {
    getVerifyCode() {
      if (this.validataPhone()) {
        this.validataBtn();
      }
      // 发送网络请求
    },
    validataBtn() {
      let time = 40;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.btnTitle = "获取验证码";
          this.disabled = false;
        } else {
          this.btnTitle = time + "s后重试";
          time--;
          this.disabled = true;
        }
      }, 1000);
    },
    validataPhone() {
      if (!this.phone) {
        this.error = {
          phone: "手机号不能为空",
        };
        return false;
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.error = {
          phone: "请输入正确的手机号",
        };
        return false;
      } else {
        this.error = {
          phone: "",
        };
        return true;
      }
    },
  },
  components: {
    InputGroup,
  },
};
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}

.logo {
  text-align: center;
}
.logo img {
  width: 150px;
}
.text_group,
.login_des,
.login_btn {
  margin-top: 20px;
}
.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
.login_btn button[disabled] {
  background-color: #8bda81;
}
</style>