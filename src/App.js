import React, { useEffect, useState } from "react";
import DistributionCenters from "./Components/DistributionCenter/DistributionCenters";
import './styles.css';
// TODO Improve design

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://dcms-backend-dgopr4idaa-ew.a.run.app/dcs")
      .then(resp => resp.json())
      .then(resp => resp.distribution_centers)
      .then(data => setData(data))
  }, []);

  return (
    <div className="App">
      <DistributionCenters
        title = 'Distribution Center Management'
        header = {['id', 'name', 'shor_name', 'address', 'type', 'operations', 'Active', 'Created', 'Updated']}
        products = {data}
      />
    </div>
  );
}

export default App;
