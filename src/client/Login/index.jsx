import React from 'react';
import VideoItem from './VideoItem';
import LoginContainer from './LoginContainer';

const Login = () => (
  <div className="video-container">
    <VideoItem
      videoClass="bgvid"
      sourceUrl="http://mazwai.com/system/posts/videos/000/000/109/webm/leif_eliasson--glaciartopp.webm?1410742112"
    />
    <LoginContainer />
  </div>
);

export default Login;
