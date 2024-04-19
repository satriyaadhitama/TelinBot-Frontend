import React from 'react';
import FactTrafficCDN from './FactTrafficCDN';
import FactTopTraffic from './FactTopTraffic';

function Main() {
  return (
    <>
      <div className="mb-4">
        <FactTrafficCDN />
      </div>
      <div>
        <FactTopTraffic />
      </div>
    </>
  );
}

export default Main;
