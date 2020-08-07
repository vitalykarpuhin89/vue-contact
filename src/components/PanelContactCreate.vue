<template>
  <div class="panel_contact_create">
		<h1>Создать контакт</h1>

		<form @submit.prevent="createContact">
      		<div class="field">
				<input type="text" placeholder="Имя" v-model="firstName">
			</div>
			<div class="field">
				<input type="text" placeholder="Фамилия" v-model="lastName">
			</div>
			<div class="field">
				<input type="text" placeholder="Телефон" v-model="telephone">
			</div>
			<div class="field">
				<input type="text" placeholder="Почта" v-model="email">
			</div>
			<div class="field">
				<input type="text" placeholder="Город" v-model="city">
			</div>
				<button class="btn">Создать</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'panelContactCreate',
  data() {
		return {
			firstName: '',
			lastName: '',
			telephone: '',
			email: '',
			city: ''
		}
	},

  methods: {
		async createContact() {
			if(this.firstName === '' || this.lastName === '') {
				alert('имя обязательно'); 
				return
			}
			try {
				const contact = await this.$store.dispatch('createContact', {
					firstName: this.firstName,
					lastName: this.lastName,
					telephone: this.telephone,
					email: this.email,
					city: this.city
				})
				this.$emit('created', contact)
				this.firstName = ''
				this.lastName = ''
				this.telephone = ''
				this.email = ''
				this.city = ''
			} catch (error) {
				console.log('error', error);
				throw error
			}
		},
  }
}

</script>

<style scoped>
	h1 {
		color: #7f8285;
		margin-top: 50px;
	}
	.panel_contact_create {
    font-family: LatoRegular, sans-serif;
		margin: auto;
		overflow: hidden;
		width: 50%;
		padding: 10px 0 10px 0;
	}

	.field{
		margin-top: 20px;
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
	}

	.btn {
		margin-top: 40px;
    width: 100%;
    height: 50px;
    border-radius: 5px;
    font-size: 16px;
    line-height: 25px;
    background-color: rgba(127, 133, 133, 0.5);
    color: #fff;
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
</style>
