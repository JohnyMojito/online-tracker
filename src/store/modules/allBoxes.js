import { DateTime } from "luxon";
import auth from './auth.js'
import 'promise-polyfill/src/polyfill';

const state = {
  linkName: '',
  isLoading: false,
  isDeleted: false,
  allBoxContents: [],
}
const getters = {
  allBoxContents: state => {
    return state.allBoxContents;
  },
  deleting: state => {
    return state.isDeleted;
  },
  link: state => {
    return state.linkName;
  },
  filteredList: state => {
    if (state.linkName == "In Progress") {
      return state.allBoxContents.filter((element) => {
        return element.status.match("In Progress");
      });
    } else if (state.linkName == "Pending") {
      return state.allBoxContents.filter((element) => {
        return element.status.match("Pending");
      });
    } else if (state.linkName == "Completed") {
      return state.allBoxContents.filter((element) => {
        return element.status.match("Completed");
      });
    } else {
      return state.allBoxContents
    }
  }
}

const mutations = {
  watchTime(state) {
    const boxes = state.allBoxContents
    const today = DateTime.local().toISODate()
    for (const box in boxes) {
      if (boxes[box].timeVal == today && boxes[box].status != "Completed") {
        boxes[box].boolVal = true
        boxes[box].componentKey += 1;
      }
    }
  },
  setData: (state, data) => {
        const boxes = [];
        for (const id in data) {
          data[id].id = id
          boxes.unshift(data[id])
        }
        state.allBoxContents = boxes;
  },
  updateContents: (state, payload) => {
    for (let i = 0; i<state.allBoxContents.length; i++) {
      if (state.allBoxContents[i].id == payload.id) {
        if (payload.input == "date" && payload.property == "delivery") {
          state.allBoxContents[i].timeVal = payload.value
          state.allBoxContents[i][payload.property] = DateTime.fromISO(payload.value).toLocaleString(DateTime.DATE_HUGE);
          state.allBoxContents[i].tillDelivery = DateTime.fromISO(payload.value).toRelative();
        } else if (payload.input == "date"){
          state.allBoxContents[i][payload.property] = DateTime.fromISO(payload.value).toLocaleString(DateTime.DATE_HUGE);
        } else{
          state.allBoxContents[i][payload.property] = payload.value;
        }
        const time = state.allBoxContents[i].timeVal 
        const today = DateTime.local().toISODate()
        if (payload.property == "status" && payload.value == "Completed") {
          alert('This client can now be found in the "Completed" section.')
          state.allBoxContents[i].boolVal = true
          state.allBoxContents[i].componentKey += 1;
        } else if (time <= today && state.allBoxContents[i].status != "Completed") {
          state.allBoxContents[i].boolVal = true
          state.allBoxContents[i].componentKey += 1;
        } else {
          state.allBoxContents[i].boolVal = false
          state.allBoxContents[i].componentKey += 1;
        }
        if (state.allBoxContents[i].progressBar == 12) {
          alert('This client can now be found in the "Completed" section.')
          state.allBoxContents[i].status = "Completed"
          state.allBoxContents[i].boolVal = true
          state.allBoxContents[i].componentKey += 1; 
        }
      }
    }
  },
  updateProgressBar: (state, payload) => {
    for (let i = 0; i<state.allBoxContents.length; i++) {
      if (state.allBoxContents[i].id == payload.id) {
        if (payload.updateProgress){
          delete state.allBoxContents[i].progress.placehold
          if (payload.value == "Ok"||payload.value=="N/A"){
            state.allBoxContents[i].progress[payload.property] = payload.value;
          } else {
            delete state.allBoxContents[i].progress[payload.property]
          }
          state.allBoxContents[i].progressBar = Object.keys(state.allBoxContents[i].progress).length
          console.log(state.allBoxContents[i].progressBar)
          state.allBoxContents[i].progressDisplay = Math.round((state.allBoxContents[i].progressBar/12) * 100) + '%'
        }
      }
    }
  },
  changeLink: (state, payload) => {
    state.linkName = payload
  }
}

const actions = {
  updateContents: (context, payload) => {
    context.commit('updateContents', payload);
    const token = auth.state.token;
    fetch('https://.firebaseio.com/.json?auth=' + token,{
      method: "PATCH",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        [payload.id]: state.allBoxContents.find(it => it.id == payload.id)
      })
    })
  },
  updateProgressBar: ({commit}, payload) => {
    commit('updateProgressBar', payload)
  },
  changeLink: ({commit}, payload) => {
    commit('changeLink', payload)
  },
  async fetchData({commit}) {
    const token = auth.state.token;
    const serverData = await fetch('https://.firebaseio.com/.json?auth=' + token)
    const jsonData = await serverData.json()
    commit('setData', jsonData)
  },
  async removeContents(_, payload) {
    for (const i in state.allBoxContents) {
      if (state.allBoxContents[i].id == payload ){
        state.allBoxContents[i].isDeleted = true
        const token = auth.state.token;
        console.log(token)
        await fetch('https://.firebaseio.com/' + payload +'.json?auth=' + token, {
          method: "DELETE"
        })
        state.isDeleted = false
      }
    }
  },
  refreshStyle(context) {
    setInterval(() => {
      context.commit('watchTime') 
    }, 1000)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}