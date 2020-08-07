<template>
<div class="loyout">
  <img alt="Vue logo" src="../assets/logo.png">
  <div class="register">
    <Login  
      @submitHandler="hideDownloads"
    />
    <Loader v-if="loading"/>
  </div>

</div>
 
</template>

<script>
import Login from '@/components/Login'
import Loader from '@/components/Loader'

export default {
  name: 'Register',
  data() {
    return {
      loading: false,
      errors: '',
      showError: true
    }
  },

  mounted() {
    this.loading = false
  },

   methods: {
     hideDownloads() {
      this.loading = true;
      setTimeout(() => {
        this.$router.push('/profileContacts');
      }, 1500)
     }
  },

  components: {
    Login, Loader
  }

}
</script>

<style scoped>
*{
  font-family:Arial, Helvetica, sans-serif;
}

.register {
  position: relative;
}
img {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
}
.errors {
  background-color: #757575 !important;
  padding: 5px;
  width: 30%;
  color: #fff;
  border-radius: 8px;
}

</style>
