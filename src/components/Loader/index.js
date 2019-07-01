import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = ({ width, height, show }) => (
  <div hidden={!show}>
    <Loader color="#ff3399" type="Oval" className="loader" width={width} height={height} />
  </div>
);

export default Loading;
