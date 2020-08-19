<template>
  <div class="profile_contacts">
    <ProfileHeader
       @showPanelCreate="showPanelCreate"
    />
    
    <div class="profile_contacts_block">
      <div class="search">
        <input class="input_search" placeholder="поиск" @keyup="searchContacts">
      </div>
      <div class="counter">
        <p>{{ contacts.length == 0 ? 'У вас пока нет контактов' : `У вас ${contacts.length} контакт ( - ов )` }}</p>
      </div>
      <div class="wrapper">
        <div class="empty_contacts" v-if="emptyBlock">
          Не найдено
        </div>
        <ProfileContactsItem v-else
          v-for="user in contacts"
          :key="user.id"
          v-bind:user="user"
          @showPanelInfo="showPanelInfo"
          @showPanelEdit="showPanelEdit"
          @delete="deleteContact"
          @changeStatus="changeStatus"
        />
      </div>
    </div>
   
    <transition name="slide">
     <aside  v-show="panelCreateContact" transition="slide">
      <div class="close" @click="hidePaneCreateContact"></div>
      <PanelContactCreate @created="addNewContacts"/>
    </aside> 
   </transition>
   <transition name="slide">
     <aside  v-show="panelInfo" transition="slide">
      <div class="close" @click="hidePanelInfo"></div>
      <PanelContactInfo 
          v-bind:contactInfo="userInfo"
      />
    </aside> 
   </transition>
    <transition name="slide">
     <aside  v-show="panelEditContact" transition="slide">
      <div class="close" @click="hidePanelEditContact"></div>
      <PanelContactEdit v-bind:userInfo="userInfo"/>
    </aside> 
   </transition>
    
  </div>
</template>

<script>
import ProfileHeader from '@/components/ProfileHeader'
import ProfileContactsItem from '@/components/ProfileContactsItem'
import PanelContactCreate from '@/components/PanelContactCreate'
import PanelContactInfo from '@/components/PanelContactInfo'
import PanelContactEdit from '@/components/PanelContactEdit'

export default {
  name: 'profileContacts',
  data() {
    return {
      contacts: [],
      userInfo: [],
      panelInfo: false,
      panelCreateContact: false,
      panelEditContact: false,
      loading: true,
      query: '',
      emptyBlock: false,
    }
  },
  async mounted() {
    this.contacts = await this.$store.dispatch('fetchContacts');
    this.sortByName();
    this.loading = false;
  },
 
  components: {
    ProfileHeader,
    ProfileContactsItem,
    PanelContactCreate,
    PanelContactInfo,
    PanelContactEdit
  },

  methods: {
    showPanelCreate() {
      this.panelCreateContact = true
      this.panelInfo = false
      this.panelEditContact = false;
    },

    showPanelInfo(userInfo) {
      if(userInfo.firstName == '') {userInfo.firstName = 'не указано'}
      if(userInfo.lastName == '') {userInfo.lastName = 'не указано'}
      if(userInfo.telephone == '') {userInfo.telephone = 'не указан'}
      if(userInfo.email == '') {userInfo.email = 'не указана'}
      if(userInfo.city == '') {userInfo.city = 'не указан'}
      this.userInfo = userInfo;
      this.panelInfo = true;
      this.panelCreateContact = false;
      this.panelEditContact = false;
    },

    showPanelEdit(userInfo) {
      this.userInfo = userInfo;
      this.panelEditContact = true;
      this.panelInfo = false;
      this.panelCreateContact = false
    },

    addNewContacts(contact){
      this.contacts.push(contact);
      this.sortByName()    
    },

    async deleteContact(contact) {
      try {
				await this.$store.dispatch('delete', {
          id: contact.id
        })
        this.contacts = this.contacts.filter(t => t.id !== contact.id)
        this.hidenPanelAll();
			} catch (error) {
				// throw error
			}
    },

    async changeStatus(contact){
      console.log('contact', contact.status);
      try {
        await this.$store.dispatch('changeStatus', {
          id: contact.id,
          status: contact.status
        })
      } catch (error) {console.log('e');}
    },

    async searchContacts(e) {
      let searcString = e.target.value;
      this.contacts = this.contacts.filter(contact =>  {
        return contact.firstName.includes(searcString) || contact.lastName.includes(searcString)
      })
      if(searcString === '') {
        this.contacts = await this.$store.dispatch('fetchContacts');
      }
      this.contacts.length === 0 ? this.emptyBlock = true : this.emptyBlock = false
    },

    sortByName() {
      this.contacts.sort(function (a, b) {
        if (a.firstName > b.firstName) {
          return 1;
        }
        if (a.firstName < b.firstName) {
          return -1;
        }
        return 0;
      });
    },

    hidePanelInfo() {
      this.panelInfo = false
    },

    hidePaneCreateContact() {
      this.panelCreateContact = false;
    },

    hidePanelEditContact () {
      this.panelEditContact = false
    },

    hidenPanelAll() {
      this.panelEditContact = false;
      this.panelCreateContact = false;
      this.panelInfo = false
    }
  }
 
}
</script>

<style scoped>
  ::-webkit-scrollbar {
    width: 0px;
  }
  h1 {
    padding: 0;
    margin: 0;
  }
  .profile_contacts {
    background: url('../assets/images/whats-app-background.jpg') no-repeat;
    height: 100vh;
    background-size: cover;
    position: relative;
    z-index: 0;
  }

  .profile_contacts_block {
    position: relative;
    width: 40%;
    height: calc(100% - 70px);
    overflow: hidden;
    border-right: 1px solid #fff;
  }

  .search {
    width: 100%;
    z-index: 99;
    left: 0;
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(247, 244, 244);
    background-color: rgba(51, 50, 50, 0.06);
    color: #000;
    line-height: 18px;
    font-size: 15px;
    font-family: LatoRegular, sans-serif;
  }

  .input_search {
    position: relative;
    border: 1px solid #c7c7c7;
    background-color: rgba(252, 252, 252, 0.5);
    box-sizing: border-box;
    border-radius: 10px;
    width: 95%;
    height: 40px;
    padding: 0 0 0 10px;
    margin: auto;
    outline: none;
    font-size: 15px;
  }

  .wrapper {
    overflow: hidden;
    overflow-y: scroll;
    height: calc(100% - 100px);
    padding:  0 0 10px 0;
    background-color: rgba(51, 50, 50, 0.06);
  }

  .counter {
    background: rgba(19, 16, 16, 0.06);
    padding: 7px;
  }

  .counter * {
    font-size: 11px;
    background-color: rgba(10, 5, 5, 0.178);
    display: block;
    width: 35%;
    margin: auto;
    padding: 3px;
    border-radius: 20px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }

  aside {
    background-color: rgb(250, 246, 246);
    width: 59%;
    position: fixed;
    top: 70px;
    right: 0;
    bottom: 0px;
    z-index: 1;
    background: rgba(19, 16, 16, 0.06);
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }

.close {
  background-image: url('../assets/images/close-info-aside.svg');
  flex: none;
  width: 30px;
  height: 30px;
  padding: 5px;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

.empty_contacts {
  color: rgb(151, 149, 149);
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
  font-family: LatoBold, sans-serif;
}

.close:hover {
  background-color: rgba(1, 15, 5, 0.06);
}

.slide-enter-active, .slide-leave-active {
  transition: all .2s cubic-bezier(.65, .05, .36, 1);
}

.slide-enter, .slide-leave-to {
  transform: translateX(900px);
}
</style>
