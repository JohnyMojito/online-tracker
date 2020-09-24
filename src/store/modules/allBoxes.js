const state = {
  newText: 'ALE BYNDZIE SANFRANSISKO',
  allBoxContents: [
    {
      clientName: "Godzilla",
      id: 111,
      status: "In Progress"
    },
    {
      clientName: "Ghidora",
      id: 112,
      status: "Pending"
    },
    {
      clientName: "Mothra",
      id: 113,
      status: "Pending"
    },
    {
      clientName: "Rodan",
      id: 114,
      status: "In Progress"
    },
    {
      clientName: "Gundam",
      id: 115,
      status: "Pending"
    },
    {
      clientName: "EVA-01",
      id: 116,
      status: "In Progress"
    },
    {
      clientName: "Totoro",
      id: 117,
      status: "In Progress"
    },
    {
      clientName: "Mechagodzilla",
      id: 118,
      status: "In Progress"
    },
    {
      clientName: "Bumblebee",
      id: 119,
      status: "In Progress"
    },
    {
      clientName: "Optimus Prime",
      id: 120,
      status: "In Progress"
    },
    {
      clientName: "Megatron",
      id: 121,
      status: "Pending"
    },
  ],
}

const getters = {
  newText: state => {
    return state.newText
  },
  allBoxContents: state => {
    return state.allBoxContents;
  }
}

const mutations = {

}

const actions = {

}

export default {
  state,
  getters,

}