import PropTypes from 'prop-types';
import React from 'react';
import VideoItem from './VideoItem';
import LoginContainer from './LoginContainer';

const Login = props => (
  <div className="video-container">
    <VideoItem
      videoClass="bgvid"
      sourceUrl="/video/loginVideo.mp4"
    />
    <LoginContainer
      error={props.location.search}
    />
  </div>
);

Login.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Login;
