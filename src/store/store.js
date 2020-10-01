import Vue from 'vue';
import Vuex from 'vuex';
import { DateTime } from 'luxon';
import allBoxes from './modules/allBoxes'
import addNewBoxes from './modules/addNewBoxes'
import searchbar from './modules/searchbar'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    id: 0,
    boxesVisible: false,
    date: DateTime.local()
  },
  getters,
  mutations,
  actions,
  modules: {
    allBoxes,
    addNewBoxes,
    searchbar
  }
});