<template>

  <div class="register">
   <form @submit.prevent="submitHandler">
    <div class="errors">{{errors}}</div>

    <h1>Вход</h1>
    <div>
      <input class="field" type="text" placeholder="login" 
        v-model.trim="email"
        :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
      >
      <small v-if="$v.email.$dirty && !$v.email.required">Поле email не должно быть пустым</small>
      <small v-else-if="$v.email.$dirty && !$v.email.email">Введите корректный email</small>
    </div>
    <div>
    <div class="password">
      <input id="password" class="field" type="password" placeholder="password" v-model="password"        
        v-on:keyup="passworView"
        v-model.trim="password"
        :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
      >
      <div class="password_view" @click="passwordViewToggle"></div>
    </div>
    
      <small v-if="$v.password.$dirty && !$v.password.required">Введите пароль</small>
      <small v-else-if="$v.password.$dirty && !$v.password.minLength">Пароль должен быть {{$v.password.$params.minLength.min}} символов. Сейчас он {{password.length}}</small>
    </div>
    
    <button class="submit" type="submit">Войти</button>
    <p class="action">Нет аккаунта? <a class="action_link" href="/registration">зарегистрироваться</a></p>
 </form>

  </div>

</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'



export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      loginError: false,
      errors: '',
      showError: true
    }
  },
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(8)},
  },

  mounted() {
      this.passwordType = document.querySelector('#password');
      this.passwordView = document.querySelector('.password_view');
  },
  
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError){
      console.log('7777777777')
      if(fbError.code === 'auth/user-not-found') this.errors = 'Пользователя с таким логином не существует'
      else if(fbError.code === 'auth/wrong-password') this.errors = 'Неверный пороль'
      else if(fbError.code === 'auth/email-already-in-use') this.errors = 'Email уже занят'
      else if(fbError.code === 'logout') this.errors = 'Вы вышли из системы'
      setTimeout(() => {
        this.errors = ''
      }, 4500)
    } 
  },

   methods: {
        async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$emit('submitHandler');
      } catch (e) {console.log('e', e);}
    },

    passwordViewToggle() {
      this.passwordView.classList.toggle('password_view_hidden');
      this.passwordView.classList.value === 'password_view view_show password_view_hidden' ? this.passwordType.type = 'text' :this.passwordType.type = 'password';
    },

    passworView() {
      this.password.length ? this.passwordView.classList.add('view_show') : this.passwordView.classList.remove('view_show');
    }
  },
}
</script>

<style scoped>
*{
  font-family:Arial, Helvetica, sans-serif;
}
  .register {
    display: flex;
    width: 30%;
    flex-direction: column;
    text-align: center;
    margin: 100px auto;
  }

  form {
    position: relative;
    padding: 25px;  
    border-radius: 10px;  
    box-shadow: 0 4px 16px #ccc;
    font-family: sans-serif; 
    letter-spacing: 1px;
  }

  .field {
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #555555;
    line-height: 1.2;
    display: block;
    width: 100%;
    height: 52px;
    background: transparent;
    border: none;
    border-bottom: 1px solid #4caf50!important;
    padding: 0 5px;
    margin-bottom: 10px;
    background: #fff;
  }

  .field:focus {
     border: none;
  }

  .password {
    position: relative;
  }

  .password_view {
    position: absolute;
    top: 15px;
    right: 0px;
    background-image: url('../assets/images/view.svg');
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    cursor: pointer;
    visibility: hidden;
  }

  .view_show {
    visibility: visible;
  }

  .password_view_hidden {
    background: url('../assets/images/no-view.svg') 0 0 no-repeat;
  }

  small {
    font-size: 10px;
  }

  .submit {
    width: 100%;
    margin-top: 30px;
    height: 50px;
    cursor: pointer;
    background: #4caf50;
    border: 1px solid rgb(228, 235, 226);
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .invalid {
    border-bottom: 1px solid rgb(245, 14, 14)!important;
  }

  .action {
    text-align: center;
    font-size: 15px;
    margin-top: 20px;
  }

  .action_link {
    color: #ffab40;
    -webkit-transition: color .3s ease;
    transition: color .3s ease;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 12px;
  }

  .errors {
    color: rgb(241, 24, 24);
    border-radius: 8px;
    font-size: 15px;
  }
</style>
