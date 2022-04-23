import React, { useEffect } from "react";

const Dashboard = () => {
  const fetchData = async () => {
    try {
      const data = await (await fetch("/api/v1")).json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return <div>Dashboard</div>;
};

export default Dashboard;
