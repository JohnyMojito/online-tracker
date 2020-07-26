var DateTime = luxon.DateTime;
dt = DateTime.local();

new Vue ({
  el: "#app",
  data: {
    clientName: '',
    confirmed: '',
    briefType: '',
    setStatus: '',
    whoFor: '',
    whoWith: '',
    startDate: '',
    meetDate: '',
    deadline: '',
    delDate: '',
    today: dt.toLocaleString(DateTime.DATE_MED),
    inputShow: true,
    inputEntry: '',
    tableContents: []
  },
  methods: {
    addRow() {
      this.tableContents.push({
        clientName: this.clientName,
        confirmed: this.confirmed,
        briefType: this.briefType,
        setStatus: this.setStatus,
        whoFor: this.whoFor,
        whoWith: this.whoWith,
        startDate: this.startDate.toLocaleString(DateTime.DATE_MED),
        meetDate: this.meetDate,
        deadline: this.deadline,
        delDate: this.delDate,
        inputShow: this.inputShow,
        inputEntry: this.inputEntry
      })
      this.clientName = "";
      this.inputShow = true;
    },
    editRow() {
      this.inputShow = false;
    }
  }
})