import React from "react";
import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import StraightIcon from "@mui/icons-material/Straight";
import SouthIcon from "@mui/icons-material/South";
import financialData from "./FinancialData";
import { useTranslation } from "react-i18next";
import { fetchWalletData, selectWallet } from "../../../../../store/client/clientDashBoardSlice";
import { useDispatch, useSelector } from "react-redux";

const Financial = ({
  allData,
  icon,
  percentage,
  direction,
  label,
  amount,
  description,
  iconColor,
}) => {
  const theme = useTheme();
  // console.log("alldata", allData);

  return (
    <Paper
      sx={{
        padding: "32px 25px",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          {icon}
          <Typography variant="h6" sx={{ fontSize: "13px", color: "#575756" }}>
            {label}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" color={iconColor}>
          <Typography variant="body1" sx={{ color: "gray", fontSize: "27px" }}>
            {/* {allData && allData.map((item) => item[percentage])}   */}
            {percentage}

          </Typography>

          {direction === "up" ? (
            <StraightIcon sx={{ fontSize: "33px" }} />
          ) : direction === "down" ? (
            <SouthIcon sx={{ fontSize: "33px" }} />
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="/images/paymob.jpg"
                alt="paymob"
                style={{ width: "100px", height: "27px", marginRight: "10px" }}
              />
              <span
                class="icon-share"
                style={{ fontSize: "23px", color: theme.palette.orangePrimary.main }}
              ></span>
              <Box></Box>
            </Box>
          )}
        </Box>
      </Box>
      <Typography variant="h6" sx={{ color: "black", fontSize: "25px", marginTop: "10px" }}>
        {direction === "up" ? (
          <Box sx={{ marginTop: "20px" }}>
            {allData?.Revenue}
            <span style={{ color: "gray", fontSize: "14px" }}> EGP</span>
          </Box>
        ) : direction === "down" ? (
          <Box sx={{ marginTop: "20px" }}>
            {allData.Withdrawal}
            <span style={{ color: "gray", fontSize: "14px" }}> EGP</span>
          </Box>
        ) : (
          <Box sx={{ fontSize: "35px", marginTop: "8px", color: theme.palette.orangePrimary.main }}>
            {allData.balance}
            <span style={{ color: "gray", fontSize: "14px" }}> EGP</span>
          </Box>
        )}
      </Typography>

      <Typography variant="body2" sx={{ margin: "0", color: "#D8E0E0" }}>
        {description}
      </Typography>
    </Paper>
  )
};

const FinancialCard = () => {
  const { t } = useTranslation()
  const [year, setYear] = React.useState('2025');
  const [allData, setAllData] = React.useState([]);
  const dispatch = useDispatch()

  const walletClientData = useSelector(selectWallet)
  // Fetch financial data
  React.useEffect(() => {
    if (walletClientData.length === 0) {
      dispatch(fetchWalletData(year));

    } else {
      setAllData(walletClientData);
    }
  }, [dispatch, year, walletClientData]);
 


  return (
    <Grid container spacing={2} sx={{ marginTop: "5px" }}>
      {financialData.map((item, index) => (
        <Grid item xs={12} sm={index == 2 ? 12 : 6} lg={index < 2 ? 3 : 6} key={index}>
          <Financial
            allData={allData}
            icon={item.icon}
            percentage={item.percentage}
            direction={item.direction}
            label={t(item.label)}
            amount={item.amount}
            description={t(item.description)}
            iconColor={item.iconColor}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default FinancialCard;
