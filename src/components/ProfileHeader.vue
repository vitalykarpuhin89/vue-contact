<template>
	<div class="profile_contacts_header">
    <div class="left">
        <div class="logo"></div>
        <div class="name">{{ name }}</div>
    </div>
    <div class="create_contact" @click="showPanelCreate"></div>
    <div class="logout" @click="logout"></div>
  </div>
</template>

<script>

export default {
  name: 'profileHeader',
   async mounted() {
    if(!Object.keys(this.$store.getters.info).length) {
     await this.$store.dispatch('fetchInfo')
    }
  },

  computed: {
    name() {
      if(this.$store.getters.info.name === '') {
        return this.$store.getters.info.name = 'Takeoff Staff'
      } else {
        return this.$store.getters.info.name
      }
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/');
		},
    showPanelCreate() {
      this.$emit('showPanelCreate')
    }
  }
}
</script>

<style scoped>
h1 {
  padding: 0;
   margin: 0;
}

a {
  width: 150px;
  height: 100%;
}

.profile_contacts_header {
  display: flex;
  height: 110px;
  background-repeat: no-repeat;
  background-image: url('../assets/images/menu-bg.jpg');
  background-position: center;
  -webkit-background-size: cover;
  background-size: cover;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:  0 0px 0 20px;
}

.left, .right {
  display: flex;
  align-items: center;
}

.name {
  padding-left: 20px;
  color: #fff;
}

.logo {
  width: 50px;
  height:50px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid #D0D0D0;
  background: url('../assets/images/avatar.png') no-repeat;
  background-size: 100%;
}

.create_contact {
  background: url('../assets/images/plus.svg') no-repeat;
  background-size: 30px;
  background-position: center;
  height: 40px;
  width: 40px;
  border: 1px solid #0377ff;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 0 10px;
  transition: 1s;
}

.create_contact:hover {
  background: url('../assets/images/plus-hover.svg') no-repeat;
  border: 1px solid #fff;
  background-size: 30px;
  background-position: center;
}

.logout {
  background: url('../assets/images/exit.svg') no-repeat;
  flex: none;
  width: 150px;
  height: 100%;
  background-color: rgba(16, 16, 16, 0.06);
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

.logout:hover {
  background-color: rgba(214, 213, 216, 0.06);
  transition: 1s;
}

</style>
