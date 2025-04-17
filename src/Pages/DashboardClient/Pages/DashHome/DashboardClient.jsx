import React from 'react'
import Row1 from './Row1/Row1'
import { Row2 } from './Row2/Row2'
import { Box } from '@mui/material'
import { DashboardDataContext } from '../../../../context/DashboardDataContext'



export const DashboardClient = () => {
  const { dashboardClientData, getClientDashboard } = React.useContext(DashboardDataContext);
  const { users_logs } = dashboardClientData || {};
  React.useEffect(() => {
    let isMounted = true; // Flag to prevent setting state if component is unmounted
    const fetchDashboardData = async () => {
      if (isMounted) {
        await getClientDashboard(localStorage.getItem("selectedBranch"));
      }
    };
    fetchDashboardData();
    return () => {
      isMounted = false; // Cleanup to prevent multiple requests
    };
  }, []);

  return (
    <Box >
      <Row1 dashboardClientData={dashboardClientData} />
      <Row2 users_logs={users_logs} />
    </Box>
  )

}
