import React, { useRef, useState } from "react";
import { Box, Tab, Tabs, Button } from "@mui/material";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import { Features } from "./Features";
import OurClients from "./OurClients";
import { FAQ } from "./FAQ";
import { Videos } from "./Videos";
import Content from "./Content";
import Payment from "../DashboardClient/Pages/SettingClient/Payment";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

export const Setting = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const featuresRef = useRef();
  const videosRef = useRef();
  const faqRef = useRef();
  const contentRef = useRef();
  const ourClientsRef = useRef();

  const tabData = [
    {
      label: "Features",
      icon: (
        <span class="icon-new-features" style={{ fontSize: "18px" }}></span>
      ),
      content: <Features ref={featuresRef} />,
    },

    {
      label: "Our Clients",

      icon: (
        <img
          src="/assets/Clients.svg"
          alt="icon"
          style={{ width: "18px", height: "18px" }}
        />
      ),
      content: <OurClients ref={ourClientsRef} />,
    },

    {
      label: "Videos",
      icon: <PlayArrowOutlinedIcon sx={{ fontSize: "22px" }} />,
      content: <Videos ref={videosRef} />,
    },

    {
      label: "FAQ",
      icon: <span class="icon-question" style={{ fontSize: "18px" }}></span>,
      content: <FAQ ref={faqRef} />,
    },

    {
      label: "Content",
      icon: <ContentPasteIcon sx={{ fontSize: "18px" }} />,
      content: <Content ref={contentRef} />,
    },
    {
      label: "Payment",
      icon: <PaymentOutlinedIcon style={{ width: "18px", height: "18px" }} />,
      content: <Payment />,
    },
  ];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // recieve handleSave from child component
  const handleSave = () => {
    if (selectedTab === 0 && featuresRef.current) {
      featuresRef.current.saveFeatures();
    }
    if (selectedTab === 1 && ourClientsRef.current) {
      ourClientsRef.current.saveClients();
    }
    if (selectedTab === 2 && videosRef.current) {
      videosRef.current.saveVideos();
    }
    if (selectedTab === 3 && faqRef.current) {
      faqRef.current.saveFaq();
    }
    if (selectedTab === 4 && contentRef.current) {
      contentRef.current.saveContent();
    }
  };

  return (
    <Box sx={{ padding: "0px 30px" }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          TabIndicatorProps={{
            style: { backgroundColor: "#ef7d00", height: "3px" },
          }}
        >
          {tabData.map((tab, index) => (
            <Tab
              key={index}
              label={
                <Box display="flex" alignItems="center">
                  {tab.icon}
                  <Box marginLeft={"6px"} fontSize={"14px"}>
                    {tab.label}
                  </Box>
                </Box>
              }
              sx={{
                textTransform: "capitalize",
                color: selectedTab === index ? "#ef7d00" : "#575756",
                "&.Mui-selected": { color: "#575756" },
              }}
            />
          ))}
        </Tabs>

        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: "#ef7d00",
            height: "25px",
            width: "12%",
            borderRadius: "20px",
            textTransform: "capitalize",
            color: "white",
            "&:hover": {
              backgroundColor: "#ef7d04",
            },
          }}
        >
          ✔ Save
        </Button>
      </Box>

      <Box mt={1}>{tabData[selectedTab].content}</Box>
    </Box>
  );
};
