import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';

const LoaderItem = props => (
  <Loader
    active={props.active}
    inline={props.inline}
  />
);

LoaderItem.propTypes = {
  active: PropTypes.bool,
  inline: PropTypes.string,
};

LoaderItem.defaultProps = {
  active: true,
  inline: 'centered',
};

export default LoaderItem;
