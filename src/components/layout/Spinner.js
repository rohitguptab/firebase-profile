import React from 'react';

import spinner from '../../images/spinner.gif';

const Spinner = () => {
  return (
    <div>
      <img
        className="loader"
        src={spinner}
        alt="Loading..."
      />
    </div>
  );
};

export default Spinner