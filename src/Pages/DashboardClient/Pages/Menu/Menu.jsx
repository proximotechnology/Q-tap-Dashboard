import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import Header from './Header'
import { Content } from './Content'
import { useDispatch } from 'react-redux'
import { fetchDiscounts } from '../../../../store/client/DiscountMenuSlice'



export const Menu = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const selectedBranch = localStorage.getItem("selectedBranch")
    dispatch(fetchDiscounts(selectedBranch))
  }, [dispatch])


  return (
    <Box >
      <Header />
      <Content />
    </Box>
  )
}
