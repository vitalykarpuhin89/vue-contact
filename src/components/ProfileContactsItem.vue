<template>
  <div class="profile_contacts_item">
    <!-- <div class="logo">{{user.selectedFile}}</div> -->
    <!-- <img v-bind:src="'https://i11.fotocdn.net/s124/f06efbca4f147e2e/user_xl/2828667358.jpg'" alt=""> -->
    <!-- <img v-bind:src="`${user.selectedFile}`" alt=""> -->
    <div class="logo">
        {{ user.firstName.substring(0, 1) }}</div>
    <div class="name">{{ `${user.firstName[0].toUpperCase() + user.firstName.slice(1)} ${user.lastName[0].toUpperCase() + user.lastName.slice(1)}` }}</div>
     <div class="info"
      @click="show = !show"
     >
        
     </div>
     <div id="popup" class="popup_info" v-show="show">
       <div class="popup_options_item"
        v-for="option in popupOptions"
        :key="option.article"
        v-on:click="choiceOption(option)"
       > {{ option.name }}</div>
     </div>
  </div>
</template>

<script>

export default {
  props: ['user'],
  name: 'profileContactsItem',
   data() {
    return {
      show: false,
      popupOptions:[
        {name: 'Посмотреть контакт', article: 'view'},
        {name: 'Редактировать', article: 'edit'},
        {name: 'Удалить', article: 'delete'}
      ]
    }
  },

  async mounted() {
     console.log('------------us', this.user)
    if(!Object.keys(this.$store.getters.info).length) {
     await this.$store.dispatch('fetchInfo')
    }
    document.addEventListener('click', this.hidePopup.bind(this), true)
  },

  beforeDestroy() {
    document.removeEventListener('click', this.hidePopup)
  },

  methods: {
    choiceOption(options) {
      this.show = false;
      if(options.article === "view") {
        this.$emit('showPanelInfo', this.user)
      } else if(options.article === "edit") {
        this.$emit('showPanelEdit', this.user)
      } else {
        this.$emit('delete', this.user)
      }
    },
    hidePopup(e) {
     this.show = false
      console.log('e', e.currentTarget.id)
    }
  },
}

</script>

<style scoped>
h1 {
  padding: 0;
  margin: 0;
}

.profile_contacts_item {
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(230, 221, 221);
  background: #fff;
  padding: 10px 10px;
  color: #000;
  line-height: 18px;
  font-size: 15px;
  font-family: LatoRegular, sans-serif;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: rgb(73, 71, 71);
  color: #fff;
  box-sizing: border-box;
}

.name {
  padding-left: 10px;
}

.info {
  width: 35px;
  height: 20px;
  background-repeat: no-repeat;
  background: url('../assets/icon-info.png') no-repeat;
  background-size: 50%;
  margin-left: auto;
  background-position: 10px 0;
  cursor: pointer;
}

.popup_info {
  border-radius: 5px;
  box-shadow: 0 4px 16px #ccc;
  background: #fff;
  position: absolute;
  /* right: 16px;
  top: 45px; */
  right: 40px;
  top: 26px;
  z-index: 99;
  text-align: left;
  font-size: 14px;
  overflow: hidden;
}

.popup_options_item {
  display: flex;
  align-items: center;
  height: 30px;
  padding:  0 10px 0px 10px;
  cursor: pointer;
}

.popup_options_item:hover {
  background: rgb(177, 177, 184);
  color: #fff;
}

img{
    background-size: 100px;
    background-position: center 0;
    width: 20px;
    height: 20px;
    /* height: 40px;
    width: 40px;
    border: 1px solid #0377ff;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 0 10px;
    transition: 1s; */
}
</style>
