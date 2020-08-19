<template>
  <div class="panel_contact_info">
    <div class="name">
      <div class="logo">
        {{ contactInfo.length !== 0 ? contactInfo.firstName[0].toUpperCase() : contactInfo.firstName }}
      </div>
      <p> {{ `имя:     ${contactInfo.length !== 0 ? contactInfo.firstName[0].toUpperCase() + contactInfo.firstName.slice(1) : contactInfo.firstName}`}} </p>
      <p> {{ `фамилия: ${contactInfo.length !== 0 ? contactInfo.lastName[0].toUpperCase() + contactInfo.lastName.slice(1) : contactInfo.lastName}` }} </p>
      <p> {{ `телефон: ${contactInfo.telephone}` }} </p>
      <p> {{ `почта:   ${contactInfo.email}` }} </p>
      <p> {{ `город:   ${contactInfo.city}` }} </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['contactInfo'],
  name: 'panelContactInfo',
  data() {
    return {
      infoName: ''
    }
  },
  async mounted() {
    if(!Object.keys(this.$store.getters.info).length) {
     await this.$store.dispatch('fetchInfo')
    }
  },
}
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px auto;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background: rgb(73, 71, 71);
  color: #fff;
  box-sizing: border-box;
}
.panel_contact_info {
  font-family: LatoRegular, sans-serif;
  font-size: 20px;
  color: rgb(134, 128, 128);
  height: 100%;
}
.panel_contact_info p {
  margin-top: 30px;
}
</style>
