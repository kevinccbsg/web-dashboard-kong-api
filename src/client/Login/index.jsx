import React from 'react';
import VideoItem from './VideoItem';
import LoginContainer from './LoginContainer';

const Login = () => (
  <div className="video-container">
    <VideoItem
      videoClass="bgvid"
      sourceUrl="/video/loginVideo.mp4"
    />
    <LoginContainer />
  </div>
);

export default Login;
