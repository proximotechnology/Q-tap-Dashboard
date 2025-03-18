import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Cell } from "recharts";

const data01 = [
  { name: "Pro", value: 10 },
  { name: "Remaining", value: 90 },
];

const COLORS = ["#AD4181", "#D8E0E0"];

export const Cart3 = () => {
  const {t} = useTranslation()
  return (
    <Box
      display={"flex"}
      justifyContent="space-between"
      alignItems="center"
      padding={"0px 15px"}
      sx={{ marginTop: "-5px" }}
    >
      <Box>
        <Box display={"flex"} textAlign={"center"} alignItems={"center"}>
          <Box
            component="span"
            sx={{
              backgroundColor: COLORS[1],
              width: "15px",
              borderRadius: "20px",
              height: "6px",
              display: "inline-block",
              marginRight: "8px",
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "6px", color: "gray" }}
          >
            {t("subscriptions")}
          </Typography>
        </Box>

        <Box
          display={"flex"}
          textAlign={"center"}
          alignItems={"center"}
          marginTop={"5px"}
        >
          <Box
            component="span"
            sx={{
              backgroundColor: COLORS[0],
              width: "15px",
              borderRadius: "20px",
              height: "6px",
              display: "inline-block",
              marginRight: "8px",
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "6px", color: "gray" }}
          >
            {t("affiliatedSub")}
          </Typography>
        </Box>
      </Box>

      <PieChart width={120} height={120}>
        <defs>
          <linearGradient id="colorGradient2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fd4845" />
            <stop offset="29%" stopColor="#d64462" />
            <stop offset="56%" stopColor="#b2417d" />
            <stop offset="81%" stopColor="#983f91" />
            <stop offset="100%" stopColor="#893e9c" />
          </linearGradient>
        </defs>
        <Pie
          data={data01}
          cx={60}
          cy={60}
          innerRadius={30}
          outerRadius={45}
          fill="#D8E0E0"
          paddingAngle={0}
          startAngle={90}
          endAngle={-270}
        >
          <Cell fill="url(#colorGradient2)" />
          <Cell fill="#D8E0E0" />
          <Cell fill="#d3d3d3" />
        </Pie>
        <text
          x={60}
          y={60}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={COLORS[0]}
          fontSize="18"
        >
          {data01[0].value}%
        </text>
      </PieChart>
    </Box>
  );
};
