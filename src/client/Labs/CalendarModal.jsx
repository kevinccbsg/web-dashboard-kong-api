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
      startDate: moment(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    const { openModal, leftLabel, rightLabel } = this.props;
    return (
      <Modal
        open={openModal}
        size="small"
        onClose={this.props.onCloseModal}
      >
        <Header icon="trash outline" content="asdasd" />
        <Modal.Content>
          <DatePicker
            className="calendar-gsitae-datepicker"
            selected={this.state.startDate}
            onChange={this.handleChange}
            showTimeSelect
            excludeDates={[moment(), moment().subtract(1, "days")]}
            excludeTimes={[
              moment().hours(17).minutes(0),
              moment().hours(18).minutes(30),
              moment().hours(19).minutes(30),
              moment().hours(17).minutes(30),
            ]}
            dateFormat="LLL"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            inverted
            onClick={this.props.onDelete}
          >
            <Icon name="checkmark" /> {leftLabel}
          </Button>
          <Button
            basic
            color="red"
            inverted
            onClick={this.props.onCloseModal}
          >
            <Icon name="remove" /> {rightLabel}
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
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  contentHeader: PropTypes.string,
};

CalendarModal.defaultProps = {
  openModal: false,
  onCloseModal: () => 0,
  onDelete: () => 0,
  title: 'Do you want to delete this?',
  leftLabel: 'yes',
  rightLabel: 'no',
  contentHeader: '',
};

export default CalendarModal;
