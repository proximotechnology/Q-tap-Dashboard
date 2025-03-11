import React, { useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useNavigate } from "react-router";
import * as XLSX from "xlsx";

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(clients);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Clients Data");
  XLSX.writeFile(workbook, "clients_data.xlsx");
};
const clients = [
  {
    name: "Name",
    date: "22.06.2024",
    city: "Cairo",
    bundle: "Starter",
    status: "active",
    statusColor: "#ef7d00",
  },
  {
    name: "Name",
    date: "22.06.2024",
    city: "Mansoura",
    bundle: "Starter",
    status: "Confirm Payment",
    statusColor: "white",
  },
  {
    name: "Name",
    date: "22.06.2024",
    city: "Alex",
    bundle: "Starter",
    status: "inactive",
    statusColor: "gray",
  },
];
export const Row2 = () => {
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/dashboard-home");
  };

  const getData = () => {
    fetch("https://highleveltecknology.com/Qtap/api/qtap_clients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    getData();
  }, []);

  const updateClientStatus = async (clientId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const response = await fetch(
        `https://highleveltecknology.com/Qtap/api/qtap_clients/${clientId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );
      const data = await response.json();
      getData(); // Refresh data after update
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box sx={{ padding: "0 20px", marginTop: "20px" }}>
      <Paper sx={{ padding: "20px", borderRadius: 5, height: "360px" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h5"
            sx={{
              color: "#575756",
              display: "flex",
              fontSize: "18px",
              alignItems: "center",
              marginLeft: "20px"
            }}
          >
            <img
              src="/assets/Clients.svg"
              alt="icon"
              style={{
                color: "#D8E0E0",
                width: "22px",
                height: "22px",
                marginRight: "12px",
                opacity: 0.5,
              }}
            />
            Clients
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <IconButton>
              <span
                class="icon-magnifier"
                style={{ color: "#575756", fontSize: "16px" }}
              ></span>
            </IconButton>

            <Button
              onClick={() => navigate("/add-client")}
              sx={{
                color: "#E57C00",
                textTransform: "capitalize",
                fontSize: "12px",
              }}
            >
              {" "}
              Add
              <AddIcon sx={{ color: "#575756", fontSize: "12px" }} />
            </Button>

            <Button
              onClick={exportToExcel}
              sx={{
                color: "#E57C00",
                textTransform: "capitalize",
                fontSize: "12px",
                display: "flex",
                gap: 1,
              }}
            >
              Export
              <ArrowForwardIosOutlinedIcon
                sx={{ color: "#575756", fontSize: "10px" }}
              />
            </Button>
          </Box>
        </Box>

        <TableContainer sx={{
          height: "300px",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#E57C00",
            borderRadius: "4px",
            width: '2px',
            "&:hover": {
              background: "#ef7d00",
            },
          },
        }}>
          <Table
            size="small"
            sx={{ borderCollapse: "separate", borderSpacing: "0 5px" }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#575756",
                    fontSize: "12px",
                    padding: "0px",
                    borderBottom: "none",
                    width: `${100 / 6}%`,
                      textAlign: "start",
                     paddingLeft: "35px"
                    }}
                >
                  Business
                </TableCell>

                {["Data", "City", "Bundle", "Status", ""].map(
                  (header) => (
                    <TableCell
                      key={header}
                      sx={{
                        color: "#575756",
                        fontSize: "12px",
                        padding: "0px",
                        borderBottom: "none",
                        width: `${100 / 6}%`,
                        textAlign: "center",
                      }}
                    >
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.qtap_clients?.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#EBEDF3" : "white",
                    height: "5px",
                    borderRadius: "20px",
                    "& td:first-of-type": {
                      borderTopLeftRadius: "20px",
                      borderBottomLeftRadius: "20px",
                    },
                    "& td:last-of-type": {
                      borderTopRightRadius: "20px",
                      borderBottomRightRadius: "20px",
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      color: "#222240",
                      fontSize: "11px",
                      padding: "0px",
                      width: `${100 / 6}%`,
                      textAlign: "left",
                      paddingLeft: "20px",
                      borderBottom: "none",
                      lineHeight: "1",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "white",
                        borderRadius: "50%",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        marginRight: "8px",
                        width: "20px",
                        height: "20px",
                        lineHeight: "0",
                        color: "#686666",
                      }}
                    >
                      <PersonOutlineOutlinedIcon sx={{ fontSize: "14px" }} />
                    </span>
                    {row.name}
                  </TableCell>

                  <TableCell
                    sx={{
                      lineHeight: "1",
                      color: "#222240",
                      fontSize: "11px",
                      padding: "0px",
                      width: `${100 / 6}%`,
                      textAlign: "center",
                      borderBottom: "none",
                    }}
                  >
                    {row.email}
                  </TableCell>
                  <TableCell
                    sx={{
                      lineHeight: "1",
                      color: "#222240",
                      fontSize: "11px",
                      padding: "0px",
                      width: `${100 / 6}%`,
                      textAlign: "center",
                      borderBottom: "none",
                    }}
                  >
                    {row.country}
                  </TableCell>
                  <TableCell
                    sx={{
                      lineHeight: "1",
                      color: "#222240",
                      fontSize: "11px",
                      padding: "0px",
                      width: `${100 / 6}%`,
                      textAlign: "center",
                      borderBottom: "none",
                    }}
                  >
                    {row.birth_date}
                  </TableCell>

                  <TableCell
                    onClick={() => updateClientStatus(row.id, row.status)}
                    sx={{
                      padding: "0px",
                      width: `${100 / 6}%`,
                      textAlign: "center",
                      borderBottom: "none",
                      lineHeight: "1",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor:
                          row.status === "Confirm Payment" ? "#222240" : null,
                        borderRadius:
                          row.status === "Confirm Payment" ? "20px" : "0px",
                        color:
                          row.status === "active"
                            ? "#ef7d00"
                            : row.status === "inactive"
                              ? "gray"
                              : "defaultColor",
                        padding:
                          row.status === "Confirm Payment" ? "5px 9px" : "0px",
                        fontSize:
                          row.status === "Confirm Payment" ? "10px" : "11px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "6px",
                          height: "6px",
                          backgroundColor:
                            row.status === "active" ? "#ef7d00" : "black",
                          borderRadius: "50%",
                          marginRight: "5px",
                        }}
                      ></span>
                      {row.status}
                    </span>
                  </TableCell>

                  <TableCell
                    sx={{
                      lineHeight: "1",
                      padding: "0px",
                      width: `${100 / 6}%`,
                      textAlign: "center",
                      borderBottom: "none",
                    }}
                  >
                    <IconButton onClick={handleDashboardClick}>
                      <img
                        src="/assets/dashboard.svg"
                        alt="icon"
                        style={{
                          cursor: "pointer",
                          width: "16px",
                          height: "16px",
                        }}
                      />
                    </IconButton>
                    <IconButton>
                      <img
                        src="/assets/setting.svg"
                        alt="icon"
                        style={{
                          cursor: "pointer",
                          width: "16px",
                          height: "16px",
                        }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
