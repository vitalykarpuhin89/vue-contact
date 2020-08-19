<template>
  <div class="panel_contact_create">
		<h1>Редактировать</h1>

		<form @submit.prevent="editContact">
      <div class="field">
			<span class="field_text">имя</span>
				<input type="text" placeholder="Имя" v-model="userInfo.firstName">
			</div>
			<div class="field">
        <span class="field_text">Фамилия</span>
				<input type="text" placeholder="Фамилия" v-model="userInfo.lastName">
			</div>
			<div class="field">
        <span class="field_text">Телефон</span>
				<input type="text" placeholder="Телефон" v-model="userInfo.telephone">
			</div>
			<div class="field">
        <span class="field_text">Почта</span>
				<input type="text" placeholder="Почта" v-model="userInfo.email">
			</div>
			<div class="field">
        <span class="field_text">Город</span>
				<input type="text" placeholder="Город" v-model="userInfo.city">
			</div>
				<button class="btn">Сохранить</button>
    </form>
    <div class="overlay" v-if="save">Сохраненно</div>
  </div>
</template>

<script>

export default {
  props: ['userInfo'],
  name: 'panelContactEdit',
  data() {
		return {
		save: false
		}
  },

  methods: {
    async editContact() {
			try {
				const contactEdit = await this.$store.dispatch('updateContact', {
          id: this.userInfo.id,
          firstName: this.userInfo.firstName,
					lastName: this.userInfo.lastName,
					telephone: this.userInfo.telephone,
					email: this.userInfo.email,
					city: this.userInfo.city
        })
        console.log('contactEdit', contactEdit)
        this.save = true
        setTimeout(() => {
          this.save = false
        }, 5500)
        
			} catch (error) {
				console.log('error', error);
				throw error
			}
		}
  }
}

</script>

<style scoped>
	h1 {
		color: #7f8285;
	}
	.panel_contact_create {
    position: relative;
    font-family: LatoRegular, sans-serif;
		margin: auto;
		overflow: hidden;
		width: 60%;
		padding: 10px 0 10px 0;
	}

	.field{
		margin-top: 10px;
	}

  .field_text {
    display: flex;
    padding-left: 10px;
    font-size: 13px;
    margin-bottom: 5px;
    color: rgba(104, 100, 100, 0.678);
  }

	.field input{
		width: 95%;
		height: 50px;
		border-radius: 4px;
		font-weight: bold;
		border: none;
		padding: 0 5px 0 5px;
    background-color: rgba(234, 238, 238, 0.5);
		outline: none;
		color: #7f8285;
	}

	.btn {
	margin-top: 40px;
    width: 100%;
    height: 50px;
    background-color: rgba(127, 133, 133, 0.5);
    border-radius: 5px;
    font-size: 16px;
    line-height: 25px;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
		border: none;
		outline: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
	}

  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    color: rgb(41, 230, 16);
    display: flex;
    font-size: 20px;
  }
</style>
