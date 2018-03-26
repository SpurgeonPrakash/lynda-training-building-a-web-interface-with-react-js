const React = require('react');

const { sortByOptions, sortDirOptions } = require('./constants');

class SearchAppointments extends React.Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSort(e) {
    this.props.onReorder(e.target.id, this.props.orderDir);
  }

  handleOrder(e) {
    this.props.onReorder(this.props.orderBy, e.target.id);
  }

  handleSearch(e) {
    this.props.onSearch(e.target.value);
  }

  render() {
    return (
      <div className="row search-appointments">
        <div className="col-sm-offset-3 col-sm-6">
          <div className="input-group">
            <input id="SearchApts"
              onChange={this.handleSearch}
              placeholder="Search"
              type="text"
              className="form-control"
              aria-label="Search Appointments"
            />
            <div className="input-group-btn">
              <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sort by: <span className="caret"></span>
              </button>
              <ul className="dropdown-menu dropdown-menu-right">
                {sortByOptions.map((item, index) => (
                  <li key={index}>
                    <a href="#" id={item.value} onClick={this.handleSort}>
                      {item.text} {(this.props.orderBy === item.value) && <span className="glyphicon glyphicon-ok"></span>}
                    </a>
                  </li>
                ))}
                <li role="separator" className="divider"></li>
                {sortDirOptions.map((item, index) => (
                  <li key={index}>
                    <a href="#" id={item.value} onClick={this.handleOrder}>
                      {item.text} {(this.props.orderDir === item.value) && <span className="glyphicon glyphicon-ok"></span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = SearchAppointments;
