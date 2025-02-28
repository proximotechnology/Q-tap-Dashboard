import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { financialData } from "./financialData";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const FinancialCard = () => {
  return (
    <Box display="flex" justifyContent="space-around" flexWrap="wrap">
      {financialData.map((data, index) => (
        <Card
          key={index}
          sx={{
            width: "24%",
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
                      {data.title}
                    </Typography>
                  </Box>

                  <Box sx={{ width: "70px", height: "70px" }}>
                    <CircularProgressbar
                      value={parseInt(data.percentage)}
                      text={`${data.percentage}`}
                      strokeWidth={10}
                      styles={buildStyles({
                        textSize: "20px",
                        pathColor: "#AD4181",
                        textColor: "#AD4181",
                        trailColor: "#D8E0E0",
                      })}
                    />
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
                    gap : 1
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
                  {data.description}
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
                        backgroundColor: "#AD4181",
                        borderRadius: "20px",
                      }}
                    />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: "10px" }}
                    >
                      {data.legend1}
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
                      {data.legend2}
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
