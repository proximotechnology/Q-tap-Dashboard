import React from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import LineChart1 from "./LineChart1";

export const Row1 = () => {
  const [year, setYear] = React.useState("2024");
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <Paper
      sx={{
        height: "270px",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid width={"80%"} >
        <Grid container justifyContent="space-between" alignItems="center" sx={{ margin: "20px 5px" }}>
          <Grid
            item
            sx={{
              paddingLeft: "20px",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <span
              class="icon-social"
              style={{ fontSize: "25px", marginRight: "6px", color: "#D8E0E0" }}
            ></span>
            <Typography
              variant="body1"
              component="div"
              sx={{ fontSize: "14px", color: "#575756" }}
            >
              Sales Volume
            </Typography>
          </Grid>
          <Grid item sx={{ paddingLeft: "20px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Select
                value={year}
                onChange={handleYearChange}
                sx={{
                  height: "24px",
                  fontSize: "14px",
                  color: "#575756",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  ".MuiSelect-icon": { fontSize: "20px" },
                }}
                MenuProps={{
                  disableScrollLock: true,
                }}
              >
                <MenuItem value="2022" sx={{ fontSize: "12px", color: "gray" }}>
                  2022
                </MenuItem>
                <MenuItem value="2023" sx={{ fontSize: "12px", color: "gray" }}>
                  2023
                </MenuItem>
                <MenuItem value="2024" sx={{ fontSize: "12px", color: "gray" }}>
                  2024
                </MenuItem>
              </Select>
            </Box>
          </Grid>
        </Grid>
        <Grid>
          <LineChart1 />
        </Grid>
      </Grid>

      <Grid width={"20%"}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "10px",
          }}
        >
          <span class="icon-wallet1" style={{ fontSize: "30px" }}></span>
          <Typography
            variant="h6"
            sx={{
              color: "#575756",
              marginTop: "8px",
              border: "2px solid #ef7d00",
              padding: "2px 20px",
              borderRadius: "30px",
              width: "140px", height: "40px",
            }}
          >
            501,420 <span style={{ fontSize: "20px"  , opacity:'0.5'}}>£</span>
          </Typography>

          <Grid
            container
            spacing={0}
            justifyContent="center"
            sx={{ marginTop: "10px" }}
          >
            <Button
              sx={{
                background: "linear-gradient(45deg, #E57C00, #222240)",
                borderRadius: 30,
                color: "#fff",
                width: "140px",
                height: "40px",
                textTransform: "none",
                fontWeight: "bold",
                WebkitTextFillColor: "white",
              }}
            >
              <span
                class="icon-Paymob"
                style={{ fontSize: "70px", fill: "white !important" }}
              ></span>
            </Button>
          </Grid>

          <Box marginTop="30px" justifyContent="left">
            <Box display={"flex"} textAlign={"center"} alignItems={"center"}>
              <Box
                component="span"
                sx={{
                  backgroundImage: "linear-gradient(to right,rgb(135, 195, 241), #1C7FCB)",
                  width: "25px",
                  borderRadius: "20px",
                  height: "10px",
                  display: "inline-block",
                  marginRight: "8px",
                }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "9px" }}
              >
                Sales Volume
              </Typography>
            </Box>
            <Box
              display={"flex"}
              textAlign={"center"}
              alignItems={"center"}
              marginTop="5px"
            >
              <Box
                component="span"
                sx={{
                  backgroundImage: "linear-gradient(to right,rgb(250, 160, 214), #8A2C5E)",
                  width: "25px",
                  borderRadius: "20px",
                  height: "10px",
                  display: "inline-block",
                  marginRight: "8px",
                }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "9px" }}
              >
                Sales
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Paper>
  );
};
