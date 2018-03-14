import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Modal, Button, Icon } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class CalendarModal extends Component {
  constructor() {
    super();
    this.state = {
      errorText: '',
      loading: false,
      startDate: moment().minutes(0),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    const {
      startDate,
    } = this.state;
    const { openModal, buttonLabel, title, selectedDates } = this.props;
    const selectedDatesMoment = selectedDates.filter(objF => (
      moment(startDate).dayOfYear() === moment(objF).dayOfYear()
    ))
    .map(obj => moment(obj));
    return (
      <Modal
        open={openModal}
        size="small"
        onClose={this.props.onCloseModal}
      >
        <Header icon="calendar" content={title} />
        <Modal.Content>
          <DatePicker
            className="calendar-gsitae-datepicker"
            selected={startDate}
            onChange={this.handleChange}
            showTimeSelect
            excludeTimes={selectedDatesMoment}
            dateFormat="LLL"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            inverted
            onClick={() => this.props.saveDate(startDate)}
          >
            <Icon name="checkmark" /> {buttonLabel}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

CalendarModal.propTypes = {
  openModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
  onDelete: PropTypes.func,
  title: PropTypes.string,
  buttonLabel: PropTypes.string,
  title: PropTypes.string,
  saveDate: PropTypes.func,
  selectedDates: PropTypes.array,
};

CalendarModal.defaultProps = {
  openModal: false,
  onCloseModal: () => 0,
  saveDate: () => 0,
  title: 'Do you want to delete this?',
  buttonLabel: 'save',
  title: 'Calendar selection',
  selectedDates: [],
};

export default CalendarModal;
