import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        playerName: null
    },
    mutations: {
        setPlayerName(state, playerName) {
            state.playerName = playerName;
        }
    },
    actions: {
        setPlayerName({ commit }, playerName) {
            commit('setPlayerName', playerName)
        }
    }
});