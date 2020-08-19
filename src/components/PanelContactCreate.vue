<template>
  <div class="panel_contact_create">
			<div class="overlay" v-if="errorSave">Имя и фамиля обязательно</div>

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
      errorSave: false,
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
        this.errorSave = true;
        setTimeout(() => {
          this.errorSave = false
        }, 5500)
				return
      }
      console.log('this.firstName.trim()', this.firstName)
			try {
				const contact = await this.$store.dispatch('createContact', {
					firstName: this.firstName.replace(/\s/g, '') ,
					lastName: this.lastName.replace(/\s/g, ''),
					telephone: this.telephone,
					email: this.email,
					city: this.city,
					status: false
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

  .overlay {
    position: absolute;
    left: 0;
    top: 50px;
    color: rgb(230, 84, 16);
    display: flex;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
</style>
