import firebase from 'firebase/app'

export default {
    mutations: {
        fetchInfo(state, info) {
            state.info = info
        },
    },
    actions: {
        async fetchContacts({commit, dispatch}) {
            try {
                const uid = await dispatch('getUid')
                const contacts = (await firebase.database().ref(`/users${uid}/contacts`).once('value')).val() || {}
                return Object.keys(contacts).map(key => ({...contacts[key], id: key}))
            } catch (error) {
                commit('setError', error)
                throw error
            }
        },

        async createContact({commit, dispatch}, {firstName, lastName, telephone, email, city, status}) {
            try {
                const uid = await dispatch('getUid')
                const contact = await firebase.database().ref(`/users${uid}/contacts`).push({firstName, lastName, telephone, email, city, status})
				console.log('contact', contact)
				return {firstName, lastName, telephone, email, city, status, id: contact.key}
            } catch (error) {
                throw error
            }
        },

        async updateContact({commit, dispatch}, {firstName, lastName, telephone, email, city, id}) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users${uid}/contacts`).child(id).update({firstName, lastName, telephone, email, city})
            } catch (error) {
                throw error
            }
        },

        async delete({commit, dispatch}, {id}) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users${uid}/contacts/${id}`).remove()
            } catch (error) {
                throw error
            }
        },
        async changeStatus({commit, dispatch}, {id, status}) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users${uid}/contacts`).child(id).update({status})
            } catch (error) {
                throw error
            }
		},
    },

}