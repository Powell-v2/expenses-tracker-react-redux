import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  }

  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  }

  onSortChange = (e) => {
    if (e.target.value === 'amount') this.props.sortByAmount();
    else if (e.target.value === 'date') this.props.sortByDate();
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  }

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  }

  render() {
    return (
      <section className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              value={this.props.filters.text}
              onChange={ this.onTextChange }
              placeholder="Search expenses"
            />
          </div>
          <div className="input-group__item">
            <select
              value={this.props.filters.sortBy}
              className="select"
              onChange={ this.onSortChange }
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={ this.props.filters.startDate }
              startDateId="1"
              endDate={ this.props.filters.endDate }
              endDateId="2"
              onDatesChange={ this.onDatesChange }
              focusedInput={ this.state.calendarFocused }
              onFocusChange={ this.onFocusChange }
              showClearDates={ true }
              numberOfMonths={ 1 }
              isOutsideRange={ () => false }
              block
            />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters,
})

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
