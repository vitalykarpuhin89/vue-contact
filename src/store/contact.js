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

        async createContact({commit, dispatch}, {firstName, lastName, telephone, email, city}) {
            try {
                const uid = await dispatch('getUid')
                const contact = await firebase.database().ref(`/users${uid}/contacts`).push({firstName, lastName, telephone, email, city})
                return {firstName, lastName, telephone, email, city, id: contact.key}
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
            console.log('idddd', id);
            try {
                const uid = await dispatch('getUid')
                const a = await firebase.database().ref(`/users${uid}/contacts/${id}`).remove()
                dispatch('fetchInfo', a);

            } catch (error) {
                throw error
            }
        },

    }
}