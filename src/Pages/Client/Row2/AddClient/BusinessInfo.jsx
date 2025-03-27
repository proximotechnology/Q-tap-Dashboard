import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
  import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
  import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
  import CardTravelOutlinedIcon from "@mui/icons-material/CardTravelOutlined";
  import TableBarIcon from "@mui/icons-material/TableBar";
  import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
  import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
  import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
  import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
  import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
  import WbSunnyIcon from "@mui/icons-material/WbSunny";
  import NightlightIcon from "@mui/icons-material/Nightlight";
  import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
  import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
  import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";
  import { useBusinessContext } from "../../../../context/BusinessContext";
import { useTranslation } from "react-i18next";
  
  const daysOfWeek = ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"];
  
  export const BusinessInfo = () => {
    const {t} = useTranslation();
    const { businessData, updateBusinessData, branches, selectedBranch, selectBranch } =
      useBusinessContext();
    const [branchIndex, setBranchIndex] = useState(0);
  
    const {
      businessName,
      businessPhone,
      businessEmail,
      country,
      city,
      currency,
      businessType,
      menuLanguage,
      tableCount,
      mode,
      design,
      workingHours = { selectedDays: [], fromTime: "9:00 am", toTime: "5:00 pm", currentDay: "Sunday" },
      servingWays = [],
      paymentMethods = [],
      paymentTime = "after",
      callWaiter = "inactive",
    } = branches[branchIndex] || businessData;
  
    const handleBranchClick = (index) => {
      setBranchIndex(index);
      selectBranch(index);
    };
  
    const handleModeChange = (event, newMode) => {
      if (newMode !== null) {
        updateBusinessData({ mode: newMode });
      }
    };
  
    const handleDesignChange = (event, newDesign) => {
      if (newDesign !== null) {
        updateBusinessData({ design: newDesign });
      }
    };
  
    const handleInputChange = (field, value) => {
      updateBusinessData({ [field]: value });
    };
  
    const handleWorkingHoursChange = (updates) => {
      updateBusinessData({
        workingHours: {
          ...workingHours,
          ...updates,
        },
      });
    };
  
    const handleDayClick = (day) => {
      const newSelectedDays = workingHours.selectedDays.includes(day)
        ? workingHours.selectedDays.filter((d) => d !== day)
        : [...workingHours.selectedDays, day];
      handleWorkingHoursChange({ selectedDays: newSelectedDays });
    };
  
    const handleTimeChange = (event, type) => {
      const newTime = event.target.value;
      if (type === "from") {
        handleWorkingHoursChange({ fromTime: newTime });
      } else {
        handleWorkingHoursChange({ toTime: newTime });
      }
    };
  
    const handleServingWayChange = (way) => {
      const updatedServingWays = servingWays.includes(way)
        ? servingWays.filter((w) => w !== way)
        : [...servingWays, way];
      updateBusinessData({ servingWays: updatedServingWays });
    };
  
    const handlePaymentMethodChange = (method) => {
      const updatedPaymentMethods = paymentMethods.includes(method)
        ? paymentMethods.filter((m) => m !== method)
        : [...paymentMethods, method];
      updateBusinessData({ paymentMethods: updatedPaymentMethods });
    };
  
    const handlePaymentTimeChange = (time) => {
      updateBusinessData({ paymentTime: time });
    };
  
    const handleCallWaiterChange = (event) => {
      updateBusinessData({ callWaiter: event.target.checked ? "active" : "inactive" });
    };
  
    const handleDayToggle = (direction) => {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const currentIndex = days.indexOf(workingHours.currentDay);
      const newIndex = (currentIndex + (direction === "next" ? 1 : -1) + days.length) % days.length;
      handleWorkingHoursChange({ currentDay: days[newIndex] });
    };
  
    const handlePrint = () => {
      window.print();
    };
  
    return (
      <Grid container sx={{ marginTop: "20px", paddingLeft: "20px" }}>
        <Grid item xs={12}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box>
              <Typography variant="body2" sx={{ fontSize: "15px" }} color="#3b3a3a" gutterBottom>
                {t("personalInfo")}
              </Typography>
              <Divider sx={{ width: "100%", borderBottom: "4px solid #ef7d00", marginBottom: "18px" }} />
            </Box>
            <Box>
              <IconButton>
                <span className="icon-delete" style={{ fontSize: "23px" }}></span>
              </IconButton>
              <IconButton onClick={handlePrint}>
                <img src="/assets/print.svg" alt="icon" style={{ width: "22px", height: "22px" }} />
              </IconButton>
            </Box>
          </Box>
          <Box display="flex" gap={2}>
            {branches.map((branch, i) => (
              <Button
                key={i}
                variant="contained"
                onClick={() => handleBranchClick(i)}
                sx={{
                  backgroundColor: selectedBranch === i ? "#ef7d00" : "#bdbdbd",
                  color: "white",
                  borderRadius: "10px",
                  padding: "3px 15px",
                  display: "flex",
                  alignItems: "center",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: selectedBranch === i ? "#ef7d00" : "#bdbdbd",
                  },
                }}
              >
                <StorefrontOutlinedIcon sx={{ marginRight: "5px", fontSize: "20px" }} />
                {t("branch")} {i + 1}
              </Button>
            ))}
          </Box>
          <Divider sx={{ margin: "12px 0px" }} />
        </Grid>
  
        <Grid item xs={12} md={12} display={"flex"} justifyContent={"space-between"}>
          <Grid md={6} sx={{ marginRight: "40px" }}>
            {/* Business Info Fields */}
            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                id="outlined-fullname"
                startAdornment={
                  <InputAdornment position="start">
                    <StorefrontOutlinedIcon sx={{ fontSize: "20px" }} />
                  </InputAdornment>
                }
                required
                placeholder={t("businessName")}
                sx={{ borderRadius: "10px", marginBottom: "10px !important", height: "33px", fontSize: "12px" }}
                value={businessName}
                onChange={(e) => handleInputChange("businessName", e.target.value)}
              />
            </FormControl>
  
            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                id="outlined-fullname"
                startAdornment={
                  <InputAdornment position="start">
                    <PhoneOutlinedIcon sx={{ fontSize: "20px" }} />
                  </InputAdornment>
                }
                required
                placeholder={t("businessPhone")}
                sx={{ borderRadius: "10px", height: "33px", marginBottom: "10px", fontSize: "12px" }}
                value={businessPhone}
                onChange={(e) => handleInputChange("businessPhone", e.target.value)}
              />
            </FormControl>
  
            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                id="outlined-fullname"
                startAdornment={
                  <InputAdornment position="start">
                    <MailOutlinedIcon sx={{ fontSize: "20px" }} />
                  </InputAdornment>
                }
                required
                placeholder={t("businessEmailNotOptional")}
                type="email"
                sx={{ borderRadius: "10px", marginBottom: "10px", height: "33px", fontSize: "12px" }}
                value={businessEmail}
                onChange={(e) => handleInputChange("businessEmail", e.target.value)}
              />
            </FormControl>
  
            <Box display="flex" justifyContent="space-between" width="100%" marginBottom="10px">
              <FormControl variant="outlined" sx={{ width: "48%" }}>
                <Select
                  id="outlined-country"
                  value={country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  displayEmpty
                  sx={{ borderRadius: "10px", height: "33px", fontSize: "12px", color: "gray" }}
                  startAdornment={
                    <InputAdornment position="start">
                      <PinDropOutlinedIcon sx={{ fontSize: "20px" }} />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="" disabled>
                    {t("country")}
                  </MenuItem>
                  <MenuItem value="US">United States</MenuItem>
                  <MenuItem value="CA">Canada</MenuItem>
                  <MenuItem value="UK">United Kingdom</MenuItem>
                </Select>
              </FormControl>
  
              <FormControl variant="outlined" sx={{ width: "48%" }}>
                <Select
                  id="outlined-city"
                  value={city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  displayEmpty
                  sx={{ borderRadius: "10px", height: "33px", fontSize: "12px", color: "gray" }}
                  startAdornment={
                    <InputAdornment position="start">
                      <PinDropOutlinedIcon sx={{ fontSize: "20px" }} />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="" disabled>
                    {t("city")}
                  </MenuItem>
                  <MenuItem value="NY">New York</MenuItem>
                  <MenuItem value="LA">Los Angeles</MenuItem>
                  <MenuItem value="CHI">Chicago</MenuItem>
                </Select>
              </FormControl>
            </Box>
  
            <Box display="flex" alignItems="center" marginBottom="10px">
              <Button
                variant="contained"
                fullWidth
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "#222240",
                  color: "white",
                  borderRadius: "10px",
                  fontSize: "11px",
                  height: "30px",
                  "&:hover": {
                    backgroundColor: "#222240",
                  },
                }}
              >
                <span className="icon-map-1" style={{ fontSize: "18px", marginRight: "6px" }}></span>
                {t("pinYourLocation")}
              </Button>
            </Box>
  
            <FormControl variant="outlined" sx={{ width: "100%", marginBottom: "10px" }}>
              <Select
                id="outlined-Currency"
                value={currency}
                onChange={(e) => handleInputChange("currency", e.target.value)}
                displayEmpty
                sx={{ borderRadius: "10px", height: "33px", fontSize: "12px", color: "gray" }}
                startAdornment={
                  <InputAdornment position="start">
                    <AttachMoneyIcon sx={{ fontSize: "20px" }} />
                  </InputAdornment>
                }
              >
                <MenuItem value="" disabled>
                  {t("currency")}
                </MenuItem>
                <MenuItem value="US">United States</MenuItem>
                <MenuItem value="CA">Canada</MenuItem>
                <MenuItem value="UK">United Kingdom</MenuItem>
              </Select>
            </FormControl>
  
            <FormControl variant="outlined" sx={{ width: "100%", marginBottom: "10px" }}>
              <Select
                id="outlined-BusinessType"
                value={businessType || "Pastry"}
                onChange={(e) => handleInputChange("businessType", e.target.value)}
                displayEmpty
                sx={{ borderRadius: "10px", height: "33px", fontSize: "12px", color: "gray" }}
                startAdornment={
                  <InputAdornment position="start">
                    <CardTravelOutlinedIcon sx={{ fontSize: "20px" }} />
                  </InputAdornment>
                }
              >
                <MenuItem value="" disabled>
                  {t("businessType")}
                </MenuItem>
                <MenuItem value="restaurant">{t("restaurant")}</MenuItem>
                <MenuItem value="cafe">{t("cafe")}</MenuItem>
                <MenuItem value="cloud">{t("cloudKitchens")}</MenuItem>
                <MenuItem value="fast">{t("fastFood")}</MenuItem>
                <MenuItem value="truck">{t("foodTruch")}</MenuItem>
                <MenuItem value="Bakery">{t("bakeryStore")}</MenuItem>
                <MenuItem value="Pastry">{t("pastryStore")}</MenuItem>
                <MenuItem value="Fruits">{t("fruitsStore")}</MenuItem>
                <MenuItem value="Retail">{t("retailStore")}</MenuItem>
              </Select>
            </FormControl>
  
            <FormControl variant="outlined" sx={{ width: "100%", marginBottom: "10px" }}>
              <Select
                id="outlined-MenuDefaultLanguage"
                value={menuLanguage || "US"}
                onChange={(e) => handleInputChange("menuLanguage", e.target.value)}
                displayEmpty
                sx={{ borderRadius: "10px", height: "33px", fontSize: "12px", color: "gray" }}
                startAdornment={
                  <InputAdornment position="start">
                    <LanguageOutlinedIcon sx={{ fontSize: "20px" }} />
                  </InputAdornment>
                }
              >
                <MenuItem value="" disabled>
                  {t("menuDefLang")}
                </MenuItem>
                <MenuItem value="US">United States</MenuItem>
                <MenuItem value="CA">Canada</MenuItem>
                <MenuItem value="UK">United Kingdom</MenuItem>
              </Select>
            </FormControl>
  
            <FormControl variant="outlined" sx={{ width: "100%", marginBottom: "10px" }}>
              <Select
                id="outlined-TableCount"
                value={tableCount || 1}
                onChange={(e) => handleInputChange("tableCount", e.target.value)}
                displayEmpty
                sx={{ borderRadius: "10px", height: "33px", fontSize: "12px", color: "gray" }}
                startAdornment={
                  <InputAdornment position="start">
                    <TableBarIcon sx={{ fontSize: "20px" }} />
                  </InputAdornment>
                }
              >
                <MenuItem value="" disabled>
                  {t("HowManyTablesDoYouHave")}
                </MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="6">6</MenuItem>
              </Select>
            </FormControl>
  
            <Divider sx={{ width: "100%", borderBottom: "1px solid #9d9d9c", marginBottom: "18px" }} />
  
            <Typography variant="body2" sx={{ fontSize: "14px", color: "gray", display: "flex" }}>
              <SellOutlinedIcon sx={{ color: "gray", fontSize: "20px", marginRight: "6px" }} /> {t("Bundle")}
            </Typography>
  
            <Box display="flex" alignItems="center" justifyContent="flex-start" mb={2}>
              <Button
                variant="outlined"
                sx={{
                  border: "1px solid gray",
                  textTransform: "capitalize",
                  color: "gray",
                  padding: "1px 25px",
                  borderRadius: "8px",
                }}
              >
                <CheckOutlinedIcon sx={{ fontSize: "20px", marginRight: "6px", color: "#ef7d00" }} /> {t("pro")}
              </Button>
  
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#222240",
                  textTransform: "capitalize",
                  color: "white",
                  padding: "3px 30px",
                  borderRadius: "8px",
                  marginLeft: "10px",
                  "&:hover": {
                    backgroundColor: "#322240",
                  },
                }}
              >
                {t("changeBundle")}
              </Button>
            </Box>
          </Grid>
  
          <Grid md={6}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
                width: "100%",
              }}
            >
              {/* Default Mode and Menu Design */}
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <Grid container spacing={1}>
                  <Typography variant="h3" sx={{ fontSize: "13px", width: "100%", fontWeight: "500", color: "gray" }}>
                    {t("defaultMode")}
                  </Typography>
                  <ToggleButtonGroup value={mode} exclusive onChange={handleModeChange}>
                    <ToggleButton
                      value="light"
                      sx={{
                        padding: "5px 8px",
                        backgroundColor: mode === "light" ? "#E57C00" : "inherit",
                        color: mode === "light" ? "#FFFFFF" : "gray",
                      }}
                    >
                      <WbSunnyIcon sx={{ fontSize: "30px", color: mode === "light" ? "#E57C00" : "inherit" }} />
                    </ToggleButton>
  
                    <ToggleButton
                      value="dark"
                      sx={{
                        padding: "5px 8px",
                        backgroundColor: mode === "dark" ? "#E57C00" : "inherit",
                        color: mode === "dark" ? "#FFFFFF" : "gray",
                      }}
                    >
                      <NightlightIcon sx={{ fontSize: "30px", color: mode === "dark" ? "#E57C00" : "inherit" }} />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
  
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ height: "50px", marginRight: "25px", width: "1px", backgroundColor: "orange" }}
                />
  
                <Grid container spacing={1}>
                  <Typography variant="h6" sx={{ fontSize: "13px", width: "100%", fontWeight: "500", color: "gray" }}>
                    {t("menus.design")}
                  </Typography>
                  <ToggleButtonGroup value={design} exclusive onChange={handleDesignChange}>
                    <ToggleButton
                      value="grid"
                      sx={{
                        padding: "5px 8px",
                        backgroundColor: design === "grid" ? "#E57C00" : "inherit",
                        color: design === "grid" ? "#E57C00" : "inherit",
                      }}
                    >
                      <ViewQuiltIcon sx={{ fontSize: "30px", color: design === "grid" ? "#E57C00" : "gray" }} />
                    </ToggleButton>
                    <ToggleButton
                      value="list"
                      sx={{
                        padding: "5px 8px",
                        backgroundColor: design === "list" ? "#E57C00" : "inherit",
                        color: design === "list" ? "#E57C00" : "inherit",
                      }}
                    >
                      <FormatListBulletedIcon sx={{ fontSize: "30px", color: design === "list" ? "#E57C00" : "gray" }} />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Box>
  
              <Divider sx={{ backgroundColor: "#f4f6fc", height: "2px", margin: "8px 0px" }} flexItem />
  
              {/* Working Hours */}
              <Box>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
                    <Typography variant="body1" display="flex" alignItems="center" sx={{ fontSize: "12px", color: "gray" }}>
                      <span className="icon-working-hour" style={{ marginRight: "10px", fontSize: "22px" }}></span>
                      {t("workHours")}
                    </Typography>
  
                    <Grid item xs={3}>
                      <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                          backgroundColor: "#222240",
                          borderRadius: "20px",
                          width: "90px",
                          height: "30px",
                        }}
                      >
                        <IconButton onClick={() => handleDayToggle("prev")} sx={{ color: "#ef7d00" }}>
                          <ArrowBackIos sx={{ fontSize: "11px" }} />
                        </IconButton>
                        <Typography
                          sx={{ width: "60px", textTransform: "capitalize", color: "white", fontSize: "10px" }}
                        >
                          {workingHours.currentDay}
                        </Typography>
  
                        <IconButton onClick={() => handleDayToggle("next")} sx={{ color: "#ef7d00" }}>
                          <ArrowForwardIos sx={{ fontSize: "11px" }} />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
  
                  <Grid item xs={7}>
                    <Box display="flex" flexWrap="wrap">
                      {daysOfWeek.map((day) => (
                        <Button
                          key={day}
                          onClick={() => handleDayClick(day)}
                          sx={{
                            minWidth: "25px",
                            height: "30px",
                            width: "30px",
                            margin: "3px",
                            borderRadius: "5px",
                            textTransform: "capitalize",
                            fontSize: "12px",
                            border: workingHours.selectedDays.includes(day) ? "1px solid #ef7d00" : "1px solid gray",
                            color: workingHours.selectedDays.includes(day) ? "#ef7d00" : "gray",
                          }}
                        >
                          {day}
                        </Button>
                      ))}
                    </Box>
                  </Grid>
  
                  <Grid item xs={4} sx={{ marginLeft: "20px" }}>
                    <Grid container spacing={2} alignItems="center">
                      <Box display={"flex"}>
                        <Grid item>
                          <Typography variant="body1" sx={{ fontSize: "11px", color: "gray", mr: 1 }}>
                            {t("from")}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <TextField
                            select
                            value={workingHours.fromTime}
                            onChange={(e) => handleTimeChange(e, "from")}
                            size="small"
                            sx={{ width: "90px", height: "30px" }}
                            inputProps={{ sx: { padding: "2px 10px", fontSize: "12px" } }}
                          >
                            {["9:00 am", "10:00 am", "11:00 am"].map((time) => (
                              <MenuItem key={time} value={time} sx={{ color: "gray", fontSize: "12px" }}>
                                <span style={{ fontSize: "10px", color: "gray" }}>{time}</span>
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Box>
                      <Box display={"flex"} marginTop={"3px"} marginLeft={"10px"}>
                        <Grid item>
                          <Typography variant="body1" sx={{ fontSize: "11px", color: "gray", mr: 1 }}>
                            {t("to")}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <TextField
                            select
                            value={workingHours.toTime}
                            onChange={(e) => handleTimeChange(e, "to")}
                            size="small"
                            sx={{ width: "90px", height: "30px" }}
                            inputProps={{ sx: { padding: "2px 10px", fontSize: "12px" } }}
                          >
                            {["5:00 pm", "6:00 pm", "7:00 pm"].map((time) => (
                              <MenuItem key={time} value={time} sx={{ color: "gray", fontSize: "12px" }}>
                                <span style={{ fontSize: "10px", color: "gray" }}>{time}</span>
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
  
              <Divider sx={{ backgroundColor: "#f4f6fc", height: "2px", margin: "8px 0px" }} flexItem />
  
              {/* Serving Ways */}
              <Box>
                <Typography variant="body1" sx={{ display: "flex", fontSize: "12px", color: "gray" }}>
                  <span className="icon-waiter" style={{ fontSize: "20px", marginRight: "6px" }}></span>
                  {t("servingWay")}
                </Typography>
                <Box display="flex">
                  {[t("Dine In"), t("Takeaway"), t("Delivery")].map((way) => (
                    <FormControlLabel
                      key={way}
                      control={
                        <Checkbox
                          checked={servingWays.includes(way)}
                          onChange={() => handleServingWayChange(way)}
                          sx={{
                            "& .MuiSvgIcon-root": { fontSize: 20 },
                            color: "gray",
                            "&.Mui-checked": {
                              color: "#ef7d00",
                            },
                          }}
                        />
                      }
                      label={way.replace("_", " ")}
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: "12px",
                          color: "gray",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
  
              <Divider sx={{ backgroundColor: "#f4f6fc", height: "2px", margin: "8px 0px" }} flexItem />
  
              {/* Call Waiter */}
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={callWaiter === "active"}
                      onChange={handleCallWaiterChange}
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 20 },
                        color: "gray",
                        "&.Mui-checked": {
                          color: "#ef7d00",
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <span className="icon-hand-up" style={{ fontSize: "20px", color: "gray", marginRight: "6px" }}></span>
                      <Typography sx={{ fontSize: "14px", color: "gray" }}>{t("activeCallWaiter")}</Typography>
                    </Box>
                  }
                />
              </Box>
  
              <Divider sx={{ backgroundColor: "#f4f6fc", height: "2px", margin: "8px 0px" }} flexItem />
  
              {/* Payment Methods */}
              <Box>
                <Typography variant="body1" sx={{ marginTop: "10px", display: "flex", fontSize: "12px", color: "gray" }}>
                  {t("paymentMethod")}
                </Typography>
                <Box display="flex" justifyContent="left">
                  {[t("cash"), t("Digit wallet"), t("Card")].map((method) => (
                    <FormControlLabel
                      key={method}
                      control={
                        <Checkbox
                          checked={paymentMethods.includes(method)}
                          onChange={() => handlePaymentMethodChange(method)}
                          sx={{
                            "& .MuiSvgIcon-root": { fontSize: 18 },
                            color: "gray",
                            "&.Mui-checked": {
                              color: "#ef7d00",
                            },
                          }}
                        />
                      }
                      label={method === "wallet" ? "Digital Wallet" : method.charAt(0).toUpperCase() + method.slice(1)}
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: "10px",
                          color: "gray",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
  
              <Divider sx={{ backgroundColor: "#f4f6fc", height: "2px", margin: "8px 0px" }} flexItem />
  
              {/* Payment Time */}
              <Box>
                <Typography variant="body1" sx={{ display: "flex", fontSize: "12px", color: "gray" }}>
                  {t("paymentTime")}
                </Typography>
                <Box display="flex" justifyContent="left">
                  {[t("beforeServing"), t("afterServing")].map((time) => (
                    <FormControlLabel
                      key={time}
                      control={
                        <Checkbox
                          checked={paymentTime === time}
                          onChange={() => handlePaymentTimeChange(time)}
                          sx={{
                            "& .MuiSvgIcon-root": { fontSize: 22 },
                            color: "gray",
                            "&.Mui-checked": {
                              color: "#ef7d00",
                            },
                          }}
                        />
                      }
                      label={time.charAt(0).toUpperCase() + time.slice(1) }
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: "13px",
                          color: "gray",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };