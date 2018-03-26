const React = require('react');

const AppointmentList = require('./AppointmentList');
const AddAppointment = require('./AddAppointment');
const SearchAppointments = require('./SearchAppointments');
const { sortBy, sortDir } = require('./constants');

class MainInterface extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      aptBodyVisible: false,
      orderBy: sortBy.petName,
      orderDir: sortBy.asc,
      queryText: '',
      myAppointments: []
    };

    this.deleteMessage = this.deleteMessage.bind(this);
    this.toggleAddDisplay = this.toggleAddDisplay.bind(this);
    this.addItem = this.addItem.bind(this);
    this.reorder = this.reorder.bind(this);
    this.searchApts = this.searchApts.bind(this);
  }

  componentDidMount() {
    this.serverRequest = $.get('./js/data.json', (myAppointments) => {
      this.setState({
        myAppointments
      });
    });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  deleteMessage(item) {
    const newApts = this.state.myAppointments.filter(a => a !== item);
    this.setState({
      myAppointments: newApts
    });
  }

  toggleAddDisplay() {
    const visible = !this.state.aptBodyVisible;
    this.setState({
      aptBodyVisible: visible
    });
  }

  addItem(item) {
    const newApts = this.state.myAppointments;
    newApts.push(item);
    this.setState({
      myAppointments: newApts,
      aptBodyVisible: false
    });
  }

  reorder(orderBy, orderDir) {
    this.setState({
      orderBy,
      orderDir
    });
  }

  searchApts(queryText) {
    this.setState({
      queryText
    });
  }

  render() {
    const orderBy = this.state.orderBy;
    const orderDir = this.state.orderDir;
    const queryText = this.state.queryText.toLowerCase();

    const filteredApts = this.state.myAppointments.filter(item => (
      Object.keys(item).some(prop => (
        item[prop].toLowerCase().includes(queryText)
      ))
    ))
    .sort((a, b) => {
      return (orderDir === sortDir.asc)
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    });

    return (
      <div className='interface'>
        <AddAppointment
          bodyVisible={this.state.aptBodyVisible}
          handleToggle={this.toggleAddDisplay}
          addAppointment={this.addItem}
        />
        <SearchAppointments
          orderBy={this.state.orderBy}
          orderDir={this.state.orderDir}
          onReorder={this.reorder}
          onSearch={this.searchApts}
        />
        {filteredApts.map((item, index) => (
          <AppointmentList
            key={index}
            singleItem={item}
            whichItem={item}
            onDelete={this.deleteMessage}
          />
        ))}
      </div>
    );
  }
}

module.exports = MainInterface;
