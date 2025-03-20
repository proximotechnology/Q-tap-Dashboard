
import { Button, Divider, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { logData } from './CustomersData';
import { useTranslation } from 'react-i18next';
export const Customers = () => {
  const {t} = useTranslation();
  const handleExport = () => {
    const headers = ["Dine Method", "Name", "Email", "Phone", "Note", "Visit Time"];
    const csvRows = [
      headers.join(','),
      ...logData.map(row =>
        [row.dineMethod, row.name, row.email, row.phone, row.note, row.visitTime].join(',')
      )
    ];
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'logData.csv';
    link.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Paper sx={{ padding: "15px 30px 50px 30px", borderRadius: "20px" }} >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        padding="5px 0"
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <span class="icon-show" style={{ fontSize: "30px", color: "#D8E0E0", marginRight: "6px" }} ></span>
          <Typography variant='body1' sx={{ fontSize: "14px", color: "#575756" }}>{t("log")}</Typography>
        </Box>

        <Box sx={{display:"flex",  alignItems:"center"}}>

          <TextField
            variant="outlined"
            size="small"
            placeholder={t("from")}
            style={{ marginRight: '8px', width: "90px" }}
            InputProps={{
              startAdornment: <CalendarMonthOutlinedIcon sx={{ fontSize: "15px", marginRight: "5px", color: "#c7c3c3" }} />,
              endAdornment: <ArrowDropDownIcon sx={{ color: "#615f5f", fontSize: "18px" }} />,
              style: { fontSize: '10px',  padding: '1px 6px',height:"20px", borderRadius: "6px" },
            }}
            InputLabelProps={{
              style: { fontSize: '10px' },
            }}
          />
          <TextField
            variant="outlined"
            size="small"
            placeholder={t("to")}
            style={{ marginRight: '8px', width: "90px" }}
            InputProps={{
              startAdornment: <CalendarMonthOutlinedIcon sx={{ fontSize: "15px", marginRight: "5px", color: "#c7c3c3" }} />,
              endAdornment: <ArrowDropDownIcon sx={{ color: "#615f5f", fontSize: "18px" }} />,
              style: { fontSize: '10px', padding: '1px 6px',height:"20px", borderRadius: "6px" },
            }}
          />
          <Button
            variant="text"
            style={{ color: '#ef7d00', fontSize: "11px", textTransform: "capitalize" }}
            onClick={handleExport}
          >
            {t("export")}
            <ArrowForwardIosIcon sx={{ fontSize: "11px", color: "black" }} />
          </Button>
        </Box>

      </Box> {/* header */}


      <Divider
        sx={{
          backgroundColor: "orange",
          height: '1px',
        }}
      />

      <TableContainer>
        <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 5px' }}>
          <TableHead>
            <TableRow sx={{ height: "25px", borderBottom: "2px solid #f0f0f0" }}>
              {[t("dineMethod"), t("name"), t("email"), t("mobileNumber"), t("note"), t("visitTime")," "].map((header) => (
                <TableCell
                  key={header}
                  sx={{ fontSize: "12px", padding: "4px", width: `${100 / 6}%`, textAlign: "left" }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {logData.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
                  height: "30px",
                  borderRadius: '20px',
                  '&:nth-of-type(odd)': {
                    borderRadius: '20px',
                  },
                  '&:nth-of-type(even)': {
                    borderRadius: '20px',
                  },
                  '& td:first-of-type': {
                    borderTopLeftRadius: '20px',
                    borderBottomLeftRadius: '20px',
                  },
                  '& td:last-of-type': {
                    borderTopRightRadius: '20px',
                    borderBottomRightRadius: '20px',
                  },
                }}
              >
                <TableCell sx={{ fontSize: '11px', padding: "3px 20px", width: `${100 / 7}%`, textAlign: "left", borderBottom: "none" }}>{t(row.dineMethod)}</TableCell>
                <TableCell sx={{ fontSize: '11px', padding: "3px", width: `${100 / 7}%`, textAlign: "left", borderBottom: "none" }}>{row.name}</TableCell>
                <TableCell sx={{ fontSize: '11px', padding: "3px", width: `${100 / 7}%`, textAlign: "left", borderBottom: "none" }}>{row.email}</TableCell>
                <TableCell sx={{ fontSize: '11px', padding: "3px", width: `${100 / 7}%`, textAlign: "left", borderBottom: "none" }}>{row.phone}</TableCell>
                <TableCell sx={{ fontSize: '11px', padding: "3px", width: `${100 / 7}%`, textAlign: "left", borderBottom: "none" }}>
                  <span>
                    <RemoveRedEyeOutlinedIcon sx={{ fontSize: "16px", color: "#d3cfcf", marginRight: "5px" }} />
                  </span>
                  {row.note}
                </TableCell>
                <TableCell sx={{ fontSize: '11px', padding: "3px 20px 0px 0px", width: `${100 / 7}%`, textAlign: "left", borderBottom: "none" }}>{row.visitTime}</TableCell>
                <TableCell >
                </TableCell>

                <TableCell >
                </TableCell>
 

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Paper>
  )
}
