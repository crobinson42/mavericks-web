// @flow
import React from 'react';

const Right = ({ onClick }: { onClick: Function }) => (
  <div onClick={onClick}>
    <i className="cursor fa fa-chevron-right fa-4x" />
  </div>
);

export default Right;
