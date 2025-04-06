import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { financialData } from "./financialData";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useTranslation } from 'react-i18next';

const FinancialCard = () => {
  const { t } = useTranslation();
  return (
    <Box display="flex" justifyContent="space-around" flexWrap="wrap">
      {financialData.map((data, index) => (
        <Card
          key={index}
          sx={{
            width: {xs:'98%', md:'49%', lg:"24%"},
            padding: "0px 5px",
            marginTop: "20px",
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Box>
              <Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginBottom={"20px"}
                >
                  <Box>
                    {data.icon}
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "13px", color: "#575756" }}
                    >
                      {t(data.title)}
                    </Typography>
                  </Box>

                  <Box sx={{ width: "70px", height: "70px" }}>
                    <CircularProgressbar
                      value={parseInt(data.percentage)}
                      text={`${data.percentage}`}
                      strokeWidth={10}
                      styles={buildStyles({
                        textSize: "20px",
                        pathColor: `url(#gradient-${data.title === "Balance" ? "balance" : "other"})`,
                        textColor: "#AD4181",
                        trailColor: "#D8E0E0",
                      })}
                    />
                    <svg style={{ height: 0 }}>
                      <defs>
                        <linearGradient id="gradient-balance" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgb(163, 215, 255)" />
                          <stop offset="100%" stopColor="#1C7FCB" />
                        </linearGradient>
                        <linearGradient id="gradient-other" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgb(250, 160, 214)" />
                          <stop offset="100%" stopColor="#8A2C5E" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </Box>
                </Box>

                <Typography
                  variant="bady1"
                  sx={{
                    fontSize: "25px",
                    color: "#222240",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                  }}
                >
                  {data.value}
                  <span
                    style={{
                      color: "gray",
                      fontSize: "15px",
                      fontWeight: "normal",
                    }}
                  >
                    {" "}
                    EGP
                  </span>
                </Typography>

                <Typography
                  variant="body2"
                  color="#D8E0E0"
                  sx={{ marginTop: "5px" }}
                >
                  {t(data.description)}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    mt: "15px",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        marginRight: "5px",
                        width: 15,
                        height: 7,
                        backgroundImage: data.title === "Balance"
                          ? "linear-gradient(to right,rgb(163, 215, 255), #1C7FCB)"
                          : "linear-gradient(to right,rgb(250, 160, 214), #8A2C5E)",
                        borderRadius: "20px",
                      }}
                    />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: "10px" }}
                    >
                      {t(data.legend1)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        marginRight: "5px",
                        width: 15,
                        height: 7,
                        backgroundColor: "#D8E0E0",
                        borderRadius: "20px",
                      }}
                    />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: "10px" }}
                    >
                      {t(data.legend2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default FinancialCard;
