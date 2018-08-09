import React from 'react';

import Previous from './components/Left';
import Next from './components/Right';

const Pagination = ({
  canNavNext,
  canNavPrevious,
  handleNext,
  handlePrevious,
}) => (
  <div className="d-flex justify-content-between w-100">
    {(canNavPrevious && <Previous onClick={handlePrevious} />) || <span />}

    {(canNavNext && <Next onClick={handleNext} />) || <span />}
  </div>
);

export default Pagination;
