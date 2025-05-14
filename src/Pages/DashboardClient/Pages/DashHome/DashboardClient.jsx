import React from 'react'
import Row1 from './Row1/Row1'
import { Row2 } from './Row2/Row2'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDashboardData, selectDashboard } from '../../../../store/clientDashBoardSlice'


export const DashboardClient = () => {
  const dispatch = useDispatch()
  const dashboardData = useSelector(selectDashboard)
  console.log("redux dashboardData", dashboardData)

  const selectedBranch = localStorage.getItem("selectedBranch");
  const { users_logs } = dashboardData || {};

  React.useEffect(() => {

    dispatch(fetchDashboardData(selectedBranch))

  }, [dispatch, selectedBranch]);

  return (
    <Box >
      <Row1 dashboardClientData={dashboardData} />
      <Row2 users_logs={users_logs} />
    </Box>
  )

}
