<template>
  <div class="profile_contacts_item" v-bind:class="{'strike': user.status}">
    <div class="logo">
        {{ user.firstName.substring(0, 1).toUpperCase() }}</div>
    <div class="name">{{ `${user.firstName[0].toUpperCase() + user.firstName.slice(1)} ${user.lastName[0].toUpperCase() + user.lastName.slice(1)}` }}</div>
    <div class="work" v-if="user.status"></div>
     <div class="info"
      @click="show = !show"
     >
     </div>
     <div id="popup" class="popup_info" v-show="show">
       <div class="popup_options_item"
        v-for="option in popupOptions"
        :key="option.article"
        v-bind="user.status !== user.status"
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
        {name: !this.user.status? this.name = 'Отметь как рабочий' : this.name = 'Обычный контакт', article: 'status'},
        {name: 'Удалить', article: 'delete'}
      ]
    }
  },

  async mounted() {
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
      if(options.article === "view") {
        this.$emit('showPanelInfo', this.user)
      } else if(options.article === "edit") {
        this.$emit('showPanelEdit', this.user)
      }else if(options.article === "status"){
        this.user.status = !this.user.status
        this.$emit('changeStatus', this.user)
        !this.user.status ? options.name = 'Отметь как рабочий' : options.name = 'Обычный контакт'
      } else {
        this.$emit('delete', this.user)
      }
    },
    hidePopup() {
     this.show = false
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
  border-bottom: 1px solid rgb(228, 225, 225);
  background-color: rgba(252, 252, 252, 0.5);
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
  color: rgb(255, 247, 247);
  box-sizing: border-box;
  font-weight: bold;
}

.name {
  padding-left: 10px;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;
  width: 70%;
  text-align: left;
  color: rgb(131, 123, 123);
  user-select: none;
}

.info {
  width: 35px;
  height: 20px;
  background-repeat: no-repeat;
  background: url('../assets/images/more-info.svg') no-repeat;
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
  right: 40px;
  top: 26px;
  z-index: 99;
  text-align: left;
  font-size: 14px;
  overflow: hidden;
  color: #000;
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
}

.work {
  width: 35px;
  height: 20px;
  background: url('../assets/images/life.svg') no-repeat;
  background-size: 50%;
  margin-left: 10px;
}

.strike{
  background-color: rgba(134, 127, 127, 0.5);
  color: rgb(243, 236, 236);
}

.strike .name{
  color: rgb(243, 236, 236);
}


</style>
