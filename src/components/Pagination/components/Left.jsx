// @flow
import React from 'react';

const Left = ({ onClick }: { onClick: Function }) => (
  <div onClick={onClick}>
    <i className="curser fa fa-chevron-left fa-4x" />
  </div>
);

export default Left;
