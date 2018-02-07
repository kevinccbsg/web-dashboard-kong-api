import React from 'react';
import PropTypes from 'prop-types';

const VideoItem = props => (
  <video
    className={props.videoClass}
    autoPlay={props.autoPlay}
    muted={props.muted}
    preload={props.preload}
    loop={props.loop}
  >
    <source
      src={props.sourceUrl}
      type="video/mp4"
    />
  </video>
);

VideoItem.propTypes = {
  videoClass: PropTypes.string,
  autoPlay: PropTypes.bool,
  muted: PropTypes.string,
  preload: PropTypes.string,
  sourceUrl: PropTypes.string,
  loop: PropTypes.bool,
};

VideoItem.defaultProps = {
  videoClass: '',
  autoPlay: true,
  muted: 'muted',
  preload: 'auto',
  loop: true,
  sourceUrl: '',
};

export default VideoItem;
