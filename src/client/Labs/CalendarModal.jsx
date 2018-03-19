import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Modal, Button, Icon, Message } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import DateList from './DateList';

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
    const {
      openModal,
      buttonLabel,
      title,
      selectedDates,
      userTitle,
      userDates,
      onButtonClick,
      error,
      errorText,
      errorTitle,
    } = this.props;
    const selectedDatesMoment = selectedDates.filter(objF => (
      moment(startDate).dayOfYear() === moment(objF.selectedDate).dayOfYear()
    ))
    .map(obj => moment(obj.selectedDate).seconds(0).milliseconds(0));
    return (
      <Modal
        open={openModal}
        size="small"
        onClose={this.props.onCloseModal}
      >
        <Header icon="calendar" content={title} />
        <Modal.Content>
          <div className="calendar-gsitae-container">
            <div>
              <Header as="h3">{title}</Header>
              <DatePicker
                className="calendar-gsitae-datepicker"
                selected={startDate}
                onChange={this.handleChange}
                showTimeSelect
                minDate={moment().add(1, 'days')}
                excludeTimes={selectedDatesMoment}
                dateFormat="LLL"
              />
            </div>
            {(userDates.length !== 0) && (
              <div className="user-dates-container">
                <Header as="h3">{userTitle}</Header>
                <DateList
                  itemClassName="user-dates-item"
                  items={userDates}
                  onButtonClick={onButtonClick}
                />
              </div>
            )}
          </div>
          {error && (
            <Message negative>
              <Message.Header>{errorTitle}</Message.Header>
              <p>{errorText}</p>
            </Message>
          )}
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
  buttonLabel: PropTypes.string,
  title: PropTypes.string,
  saveDate: PropTypes.func,
  selectedDates: PropTypes.array,
  userDates: PropTypes.array,
  userTitle: PropTypes.string,
  onButtonClick: PropTypes.func,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  errorTitle: PropTypes.string,
};

CalendarModal.defaultProps = {
  openModal: false,
  onCloseModal: () => 0,
  saveDate: () => 0,
  buttonLabel: 'save',
  title: 'Calendar selection',
  selectedDates: [],
  userDates: [],
  userTitle: '',
  onButtonClick: () => 0,
  error: false,
  errorText: '',
  errorTitle: '',
};

export default CalendarModal;
