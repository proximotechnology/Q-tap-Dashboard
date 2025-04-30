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
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
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
import { useClientContext } from "../../../../context/ClientContext";
import { useTranslation } from "react-i18next";

const daysOfWeek = ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"];
const fullDays = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const BusinessInfoAdmin = ({ clientInfoData }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { clientData, updateBusinessData, setClientData } = useClientContext();
  const [branchIndex, setBranchIndex] = useState(clientData.selectedBranch || 0);
  const [businessName, setBusinessName] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [currency, setCurrency] = useState("1");
  const [businessType, setBusinessType] = useState("uk");
  const [menuLanguage, setMenuLanguage] = useState("US");
  const [tableCount, setTableCount] = useState("1");
  const [mode, setMode] = useState("white");
  const [design, setDesign] = useState("grid");
  const [workingHours, setWorkingHours] = useState({
    selectedDays: [],
    fromTime: "9:00 am",
    toTime: "5:00 pm",
    currentDay: "Sunday",
  });
  const [servingWays, setServingWays] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentTime, setPaymentTime] = useState("after");
  const [callWaiter, setCallWaiter] = useState("inactive");

  // Initialize state with clientInfoData
  useEffect(() => {
    if (clientInfoData?.brunchs?.[branchIndex]) {
      const branch = clientInfoData.brunchs[branchIndex];
      const contactInfo = branch.contact_info?.[0] || {};
      const parseFirstValue = (str) => (str ? str.split(",")[0].trim() : "");

      setBusinessName(branch.business_name || "");
      setBusinessPhone(parseFirstValue(contactInfo.business_phone) || "");
      setBusinessEmail(parseFirstValue(contactInfo.business_email) || "");
      setCountry(branch.business_country || "");
      setCity(branch.business_city || "");
      setCurrency(branch.currency_id?.toString() || "1");
      setBusinessType(branch.business_format?.toLowerCase() || "uk");
      setMenuLanguage("US"); // API doesn't provide this, default to US
      setTableCount(branch.serving_ways?.find(way => way.name === "dine_in")?.tables_number?.toString() || "1");
      setMode(branch.default_mode || "white");
      setDesign(branch.menu_design?.toLowerCase() || "grid");
      setWorkingHours({
        selectedDays: branch.workschedule?.map((schedule) => daysOfWeek[fullDays.indexOf(schedule.day)]) || [],
        fromTime: branch.workschedule?.[0]?.opening_time || "9:00 am",
        toTime: branch.workschedule?.[0]?.closing_time || "5:00 pm",
        currentDay: branch.workschedule?.[0]?.day || "Sunday(chartreuse)",
      });
      setServingWays(branch.serving_ways?.map((way) => way.name) || []);
      setPaymentMethods(branch.payment_services?.map((service) => service.name) || []);
      setPaymentTime(branch.payment_time || "after");
      setCallWaiter(branch.call_waiter || "inactive");

      // Update context
      updateBusinessData({
        businessName: branch.business_name || "",
        contactInfo: {
          businessPhone: parseFirstValue(contactInfo.business_phone) || "",
          businessEmail: parseFirstValue(contactInfo.business_email) || "",
          facebook: parseFirstValue(contactInfo.facebook) || "",
          twitter: parseFirstValue(contactInfo.twitter) || "",
          instagram: parseFirstValue(contactInfo.instagram) || "",
          address: parseFirstValue(contactInfo.address) || "",
          website: parseFirstValue(contactInfo.website) || "",
        },
        country: branch.business_country || "",
        city: branch.business_city || "",
        currency: branch.currency_id?.toString() || "1",
        businessType: branch.business_format?.toLowerCase() || "uk",
        menuLanguage: "US",
        numberOfTables: branch.serving_ways?.find(way => way.name === "dine_in")?.tables_number?.toString() || "1",
        design: branch.menu_design?.toLowerCase() || "grid",
        mode: branch.default_mode || "white",
        workSchedules: branch.workschedule?.length
          ? branch.workschedule.reduce((acc, schedule) => {
            acc[schedule.day] = [schedule.opening_time, schedule.closing_time];
            return acc;
          }, {})
          : fullDays.reduce((acc, day) => ({ ...acc, [day]: ["9am", "7pm"] }), {}),
        servingWays: {
          dine_in: branch.serving_ways?.some((way) => way.name === "dine_in") || false,
          take_away: branch.serving_ways?.some((way) => way.name === "take_away") || false,
          delivery: branch.serving_ways?.some((way) => way.name === "delivery") || false,
        },
        paymentMethods: {
          cash: branch.payment_services?.some((service) => service.name === "cash") || false,
          wallet: branch.payment_services?.some((service) => service.name === "wallet") || false,
          card: branch.payment_services?.some((service) => service.name === "card") || false,
        },
        paymentTime: {
          beforeServing: branch.payment_time === "before",
          afterServing: branch.payment_time === "after",
        },
        callWaiter: branch.call_waiter === "active",
      });
    }
  }, [branchIndex]);

  const handleBranchClick = (index) => {
    setBranchIndex(index);
    setClientData((prev) => ({ ...prev, selectedBranch: index }));
  };

  const handleModeChange = (event, newMode) => {
    if (newMode) {
      setMode(newMode);
      updateBusinessData({ mode: newMode });
    }
  };

  const handleDesignChange = (event, newDesign) => {
    if (newDesign) {
      setDesign(newDesign);
      updateBusinessData({ design: newDesign });
    }
  };

  const handleInputChange = (field, value) => {
    const updates = { [field]: value };
    switch (field) {
      case "businessName":
        setBusinessName(value);
        break;
      case "businessPhone":
        setBusinessPhone(value);
        break;
      case "businessEmail":
        setBusinessEmail(value);
        break;
      case "country":
        setCountry(value);
        break;
      case "city":
        setCity(value);
        break;
      case "currency":
        setCurrency(value);
        break;
      case "businessType":
        setBusinessType(value);
        break;
      case "menuLanguage":
        setMenuLanguage(value);
        break;
      case "tableCount":
        setTableCount(value);
        updates.numberOfTables = value;
        break;
      default:
        break;
    }
    updateBusinessData(updates);
  };

  const handleWorkingHoursChange = (updates) => {
    setWorkingHours((prev) => ({ ...prev, ...updates }));
    updateBusinessData({
      workSchedules: {
        ...clientData.businessInfo.workSchedules,
        [workingHours.currentDay]: [updates.fromTime || workingHours.fromTime, updates.toTime || workingHours.toTime],
      },
    });
  };

  const handleDayClick = (day) => {
    const newSelectedDays = workingHours.selectedDays.includes(day)
      ? workingHours.selectedDays.filter((d) => d !== day)
      : [...workingHours.selectedDays, day];
    setWorkingHours((prev) => ({ ...prev, selectedDays: newSelectedDays }));
    const fullDay = fullDays[daysOfWeek.indexOf(day)];
    updateBusinessData({
      workSchedules: {
        ...clientData.businessInfo.workSchedules,
        [fullDay]: newSelectedDays.includes(day) ? [workingHours.fromTime, workingHours.toTime] : undefined,
      },
    });
  };

  const handleTimeChange = (event, type) => {
    const newTime = event.target.value;
    if (type === "from") {
      setWorkingHours((prev) => ({ ...prev, fromTime: newTime }));
      updateBusinessData({
        workSchedules: {
          ...clientData.businessInfo.workSchedules,
          [workingHours.currentDay]: [newTime, workingHours.toTime],
        },
      });
    } else {
      setWorkingHours((prev) => ({ ...prev, toTime: newTime }));
      updateBusinessData({
        workSchedules: {
          ...clientData.businessInfo.workSchedules,
          [workingHours.currentDay]: [workingHours.fromTime, newTime],
        },
      });
    }
  };

  const handleServingWayChange = (way) => {
    const updatedServingWays = servingWays.includes(way)
      ? servingWays.filter((w) => w !== way)
      : [...servingWays, way];
    setServingWays(updatedServingWays);
    updateBusinessData({
      servingWays: {
        dine_in: updatedServingWays.includes("dine_in"),
        take_away: updatedServingWays.includes("take_away"),
        delivery: updatedServingWays.includes("delivery"),
      },
    });
  };

  const handlePaymentMethodChange = (method) => {
    const updatedPaymentMethods = paymentMethods.includes(method)
      ? paymentMethods.filter((m) => m !== method)
      : [...paymentMethods, method];
    setPaymentMethods(updatedPaymentMethods);
    updateBusinessData({
      paymentMethods: {
        cash: updatedPaymentMethods.includes("cash"),
        wallet: updatedPaymentMethods.includes("wallet"),
        card: updatedPaymentMethods.includes("card"),
      },
    });
  };

  const handlePaymentTimeChange = (time) => {
    setPaymentTime(time);
    updateBusinessData({
      paymentTime: {
        beforeServing: time === "before",
        afterServing: time === "after",
      },
    });
  };

  const handleCallWaiterChange = (event) => {
    const newValue = event.target.checked ? "active" : "inactive";
    setCallWaiter(newValue);
    updateBusinessData({ callWaiter: newValue === "active" });
  };

  const handleDayToggle = (direction) => {
    const currentIndex = fullDays.indexOf(workingHours.currentDay);
    const newIndex = (currentIndex + (direction === "next" ? 1 : -1) + fullDays.length) % fullDays.length;
    const newDay = fullDays[newIndex];
    setWorkingHours((prev) => ({
      ...prev,
      currentDay: newDay,
      fromTime: clientData.businessInfo.workSchedules[newDay]?.[0] || "9:00 am",
      toTime: clientData.businessInfo.workSchedules[newDay]?.[1] || "5:00 pm",
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Grid container spacing={0} sx={{ marginTop: "20px", overflow: 'hidden', padding: '1rem' }} >
      <Grid item xs={12} >
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box>
            <Typography variant="body2" sx={{ fontSize: "15px" }} color="#3b3a3a" gutterBottom>
              {t("busnessInfo")}
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
          {clientInfoData?.brunchs?.map((branch, i) => (
            <Button
              key={i}
              variant="contained"
              onClick={() => handleBranchClick(i)}
              sx={{
                backgroundColor: branchIndex === i ? theme.palette.orangePrimary.main : "#bdbdbd",
                color: "white",
                borderRadius: "10px",
                padding: "3px 15px",
                display: "flex",
                alignItems: "center",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: branchIndex === i ? theme.palette.orangePrimary.main : "#bdbdbd",
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

      <Grid item xs={12} md={12} display={"flex"} justifyContent={"space-between"} >
        <Grid container spacing={1} >
          <Grid item xs={12} md={6} >
            {/* Business Info Fields */}
            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                id="outlined-business-name"
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
                id="outlined-business-phone"
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
                id="outlined-business-email"
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
                  <MenuItem value="egypt">Egypt</MenuItem>
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
                  <MenuItem value="cairo">Cairo</MenuItem>
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
                  backgroundColor: theme.palette.secondaryColor.main,
                  color: "white",
                  borderRadius: "10px",
                  fontSize: "11px",
                  height: "30px",
                  "&:hover": {
                    backgroundColor: theme.palette.secondaryColor.main,
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
                <MenuItem value="1">USD</MenuItem>
                <MenuItem value="2">CAD</MenuItem>
                <MenuItem value="3">GBP</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" sx={{ width: "100%", marginBottom: "10px" }}>
              <Select
                id="outlined-BusinessType"
                value={businessType}
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
                <MenuItem value="bakery">{t("bakeryStore")}</MenuItem>
                <MenuItem value="pastry">{t("pastryStore")}</MenuItem>
                <MenuItem value="fruits">{t("fruitsStore")}</MenuItem>
                <MenuItem value="retail">{t("retailStore")}</MenuItem>
                <MenuItem value="uk">UK</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" sx={{ width: "100%", marginBottom: "10px" }}>
              <Select
                id="outlined-MenuDefaultLanguage"
                value={menuLanguage}
                onChange={(e) => handleInputChange("menuLanguage", e.target.value)}
                displayEmpty
                sx={{ borderRadius: "10px", height: "33px", fontSize: "12px", color: "gray" }}
                startAdornment={
                  <InputAdornment position="start">
                    <LanguageOutlinedIcon sx={{ fontSize: "20px" }} />
                  </InputAdornment>
                }
              >
                <MenuItem value="US">United States</MenuItem>
                <MenuItem value="CA">Canada</MenuItem>
                <MenuItem value="UK">United Kingdom</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" sx={{ width: "100%", marginBottom: "10px" }}>
              <Select
                id="outlined-TableCount"
                value={tableCount}
                onChange={(e) => handleInputChange("tableCount", e.target.value)}
                displayEmpty
                sx={{ borderRadius: "10px", height: "33px", fontSize: "12px", color: "gray" }}
                startAdornment={
                  <InputAdornment position="start">
                    <TableBarIcon sx={{ fontSize: "20px" }} />
                  </InputAdornment>
                }
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="12">12</MenuItem>
              </Select>
            </FormControl>

            <Divider sx={{ width: "100%", borderBottom: "1px solid #9d9d9c", marginBottom: "18px" }} />

            <Typography variant="body2" sx={{ fontSize: "14px", color: "gray", display: "flex" }}>
              <SellOutlinedIcon sx={{ color: "gray", fontSize: "20px", marginRight: "6px" }} /> {t("bundle")}
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
                <CheckOutlinedIcon sx={{ fontSize: "20px", marginRight: "6px", color: theme.palette.orangePrimary.main }} /> {t("pro")}
              </Button>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.secondaryColor.main,
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
          {/* part of branch */}
          <Grid item xs={12} md={6} className="here_the_container" overflow={'hidden'}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
                width: "100%",
              }}
            >
              <Box sx={{ marginTop: "6px", display: 'flex', justifyContent: 'space-between', width: '100%', overflow: 'hidden', flexWrap: 'nowrap' }} className="here_section">
                <Box sx={{ flexGrow: '1', flex: "1 1 auto" }} >
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: "500", color: "#AAAAAA", textAlign: "start" }}
                  >
                    {t("defaultMode")}
                  </Typography>
                  <ToggleButtonGroup
                    value={mode}
                    exclusive
                    onChange={handleModeChange}
                    sx={{ backgroundColor: 'transparent', display: "flex", justifyContent: "space-around" }}
                  >
                    <ToggleButton
                      value="white"
                      sx={{
                        padding: "8px",
                        backgroundColor: mode === "white" ? theme.palette.orangePrimary.main : "transparent",
                        border: `1px solid ${mode === "white" ? theme.palette.orangePrimary.main : "#AAAAAA"} !important`,
                        borderRadius: "8px !important",
                      }}
                    >
                      <WbSunnyIcon
                        sx={{ fontSize: "30px", color: mode === "white" ? theme.palette.orangePrimary.main : "#AAAAAA" }}
                      />
                    </ToggleButton>
                    <ToggleButton
                      value="dark"
                      sx={{
                        padding: "8px",
                        backgroundColor: mode === "dark" ? theme.palette.orangePrimary.main : "transparent",
                        border: `1px solid ${mode === "dark" ? theme.palette.orangePrimary.main : "#AAAAAA"} !important`,
                        borderRadius: "8px !important",
                      }}
                    >
                      <NightlightIcon
                        sx={{ fontSize: "30px", color: mode === "dark" ? theme.palette.orangePrimary.main : "#AAAAAA" }}
                      />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    height: "40px",
                    width: "1px",
                    backgroundColor: theme.palette.orangePrimary.main,
                    margin: "auto 10px", flex: "0 1 auto"
                  }}
                />

                <Box sx={{ flexGrow: '1', flex: "1 1 auto" }} >
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: "500", color: "#AAAAAA", textAlign: "start" }}
                  >
                    {t("menus.design")}
                  </Typography>
                  <ToggleButtonGroup
                    value={design}
                    exclusive
                    onChange={handleDesignChange}
                    sx={{ backgroundColor: 'transparent', display: "flex", justifyContent: "space-around", }}
                  >
                    <ToggleButton
                      value="grid"
                      sx={{
                        padding: "8px",
                        backgroundColor: design === "grid" ? theme.palette.orangePrimary.main : "transparent",
                        border: `1px solid ${design === "grid" ? theme.palette.orangePrimary.main : "#AAAAAA"} !important`,
                        borderRadius: "8px !important",
                      }}
                    >
                      <ViewQuiltIcon
                        sx={{ fontSize: "30px", color: design === "grid" ? theme.palette.orangePrimary.main : "#AAAAAA" }}
                      />
                    </ToggleButton>
                    <ToggleButton
                      value="list"
                      sx={{
                        padding: "8px",
                        backgroundColor: design === "list" ? theme.palette.orangePrimary.main : "transparent",
                        border: `1px solid ${design === "list" ? theme.palette.orangePrimary.main : "#AAAAAA"} !important`,
                        borderRadius: "8px !important",
                      }}
                    >
                      <FormatListBulletedIcon
                        sx={{ fontSize: "30px", color: design === "list" ? theme.palette.orangePrimary.main : "#AAAAAA" }}
                      />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Box>
              {/* Default Mode and Menu Design
              <Box sx={{ display: "flex", width: "100%" }}>
                <Grid container spacing={1}>
                  <Typography variant="h3" sx={{ fontSize: "13px", width: "100%", fontWeight: "500", color: "gray" }}>
                    {t("defaultMode")}
                  </Typography>
                  <ToggleButtonGroup value={mode} exclusive onChange={handleModeChange}>
                    <ToggleButton
                      value="white"
                      sx={{
                        padding: "5px 8px",
                        backgroundColor: mode === "white" ? theme.palette.orangePrimary.main : "inherit",
                        color: mode === "white" ? "#FFFFFF" : "gray",
                      }}
                    >
                      <WbSunnyIcon sx={{ fontSize: "30px" }} />
                    </ToggleButton>
                    <ToggleButton
                      value="dark"
                      sx={{
                        padding: "5px 8px",
                        backgroundColor: mode === "dark" ? theme.palette.orangePrimary.main : "inherit",
                        color: mode === "dark" ? "#FFFFFF" : "gray",
                      }}
                    >
                      <NightlightIcon sx={{ fontSize: "30px" }} />
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
                        backgroundColor: design === "grid" ? theme.palette.orangePrimary.main : "inherit",
                        color: design === "grid" ? "#FFFFFF" : "gray",
                      }}
                    >
                      <ViewQuiltIcon sx={{ fontSize: "30px" }} />
                    </ToggleButton>
                    <ToggleButton
                      value="list"
                      sx={{
                        padding: "5px 8px",
                        backgroundColor: design === "list" ? theme.palette.orangePrimary.main : "inherit",
                        color: design === "list" ? "#FFFFFF" : "gray",
                      }}
                    >
                      <FormatListBulletedIcon sx={{ fontSize: "30px" }} />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Box> */}

              <Divider sx={{ backgroundColor: "#f4f6fc", height: "2px", margin: "8px 0px" }} flexItem />

              {/* Working Hours */}
              <Box>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
                    <Typography variant="body1" display="flex" alignItems="center" sx={{ fontSize: "12px", color: "gray" }}>
                      <span className="icon-working-hour" style={{ fontSize: "22px" }}></span>
                      {t("workHours")}
                    </Typography>


                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{
                        backgroundColor: theme.palette.secondaryColor.main,
                        borderRadius: "20px",
                        width: "100px",
                        height: "30px",
                      }}
                    >
                      <IconButton onClick={() => handleDayToggle("prev")} sx={{ color: theme.palette.orangePrimary.main }}>
                        <ArrowBackIos sx={{ fontSize: "11px" }} />
                      </IconButton>
                      <Typography
                        sx={{ width: "60px", textTransform: "capitalize", color: "white", fontSize: "10px" }}
                      >
                        {t(workingHours.currentDay)}
                      </Typography>
                      <IconButton onClick={() => handleDayToggle("next")} sx={{ color: theme.palette.orangePrimary.main }}>
                        <ArrowForwardIos sx={{ fontSize: "11px" }} />
                      </IconButton>
                    </Box>

                  </Grid>

                  <Grid item container>
                    <Grid item xs={6}>
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
                              color: workingHours.selectedDays.includes(day) ? theme.palette.orangePrimary.main : "gray",
                            }}
                          >
                            {day}
                          </Button>
                        ))}
                      </Box>
                    </Grid>

                    <Grid item xs={6} padding='1rem'>
                      <Grid container alignItems="center">

                        <Grid item container sx={{ justifyContent:'space-between' }}>
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
                        </Grid>

                        <Grid item container sx={{ justifyContent:'space-between' }}>
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
                        </Grid>
                      </Grid>
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
                  {["dine_in", "take_away", "delivery"].map((way) => (
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
                              color: theme.palette.orangePrimary.main,
                            },
                          }}
                        />
                      }
                      label={t(way.replace("_", " "))}
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
                          color: theme.palette.orangePrimary.main,
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
                  {["cash", "wallet", "card"].map((method) => (
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
                              color: theme.palette.orangePrimary.main,
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
                  {["before", "after"].map((time) => (
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
                              color: theme.palette.orangePrimary.main,
                            },
                          }}
                        />
                      }
                      label={t(time === "before" ? "beforeServing" : "afterServing")}
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
    </Grid>
  );
};

export default BusinessInfoAdmin;