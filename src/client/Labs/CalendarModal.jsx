import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Modal, Button, Icon } from 'semantic-ui-react';
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
    } = this.props;
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
          <div className="calendar-gsitae-container">
            <div>
              <Header as="h3">{title}</Header>
              <DatePicker
                className="calendar-gsitae-datepicker"
                selected={startDate}
                onChange={this.handleChange}
                showTimeSelect
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
};

export default CalendarModal;
