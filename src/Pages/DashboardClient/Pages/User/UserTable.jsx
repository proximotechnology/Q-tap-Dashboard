import React, { useState } from 'react';
import { Button, Divider, IconButton, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import * as XLSX from 'xlsx';
import { userData } from './userData';
import { AddUser } from './AddUser';

export const UserTable = () => {
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleToggleVisibility = (rowId) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleExport = () => {
    const dataToExport = userData.map((row) => ({
      "User Name": row.userName,
      "Created": row.created,
      "PIN": visiblePasswords[row.id] ? row.pin : '******', 
      "Access": row.access,
      "Status": row.status,
    }));

    
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

 
    XLSX.writeFile(workbook, "User_Data.xlsx");
  };

  return (
    <Paper sx={{ padding: "15px 30px 50px 30px", borderRadius: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" padding="5px 0">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src="/assets/Clients.svg" alt="icon" style={{color:"#D8E0E0", width: "25px", height: "25px", marginRight: "10px" }} />
          <Typography variant="body1" sx={{ fontSize: "16px", color: "#575756" }}>Users</Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          <IconButton>
            <span className="icon-magnifier" style={{ fontSize: "16px" }} />
          </IconButton>
          <Button onClick={handleOpen} sx={{ fontSize: "12px", color: "#ef7d00", display: "flex", cursor: "pointer", textTransform: "capitalize" }}>
            Add
            <span style={{ fontSize: "15px", color: "#ef7d00", fontWeight: 700, paddingLeft: "6px" }}>+</span>
          </Button>
          <AddUser open={modalOpen} onClose={handleClose} /> 

          <Button onClick={handleExport} variant="text" sx={{ color: '#ef7d00', textTransform: "capitalize", fontSize: "12px" }}>
            Export
            <ArrowForwardIosIcon sx={{ fontSize: "10px", color: "#ef7d00" }} />
          </Button>
        </Box>
      </Box>

      <Divider sx={{
          width: "100%", height: "2px", background: "linear-gradient(45deg, #FDB913, #F2672E)", borderRadius: "50px",
        }} />

      <TableContainer>
        <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 5px' }}>
          <TableHead>
            <TableRow sx={{ height: "20px", borderBottom: "2px solid #f0f0f0" }}>
              {["User Name", "Created", "PIN", "Access", "Status", " "].map((header) => (
                <TableCell key={header} sx={{ fontSize: "12px", padding: "3px", width: `${100 / 6}%`, textAlign: "center", color:"#575756" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {userData.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor: row.id % 2 !== 0 ? '#EBEDF3' : 'white',
                  height: "20px",
                  borderRadius: '20px',
                  '& td:first-of-type': { borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' },
                  '& td:last-of-type': { borderTopRightRadius: '20px', borderBottomRightRadius: '20px' },
                }}
              >
                <TableCell sx={{ color:"#575756", fontSize: '11px', padding: "0px 2px", textAlign: "center", borderBottom: "none" }}>
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <PersonOutlineOutlinedIcon sx={{ padding: "5px", fontSize: "25px", backgroundColor: "white", borderRadius: "50%", mr: 1 }} />
                    {row.userName}
                  </span>
                </TableCell>
                <TableCell sx={{ color:"#575756", fontSize: '11px', padding: "0px 2px", textAlign: "center", borderBottom: "none" }}>
                  {row.created}
                </TableCell>
                <TableCell sx={{ color:"#575756", fontSize: '11px', padding: "0px 2px", textAlign: "center", borderBottom: "none" }}>
                  {visiblePasswords[row.id] ? row.pin : '******'}
                  <IconButton onClick={() => handleToggleVisibility(row.id)} sx={{ color: "gray", fontSize: "16px", marginLeft: "2px" }}>
                    {visiblePasswords[row.id] ? <VisibilityOutlinedIcon sx={{ fontSize: "18px" }} /> : <VisibilityOffOutlinedIcon sx={{ fontSize: "18px" }} />}
                  </IconButton>
                </TableCell>
                <TableCell sx={{ color:"#575756", fontSize: '11px', padding: "0px 2px", textAlign: "center", borderBottom: "none" }}>
                  {row.access}
                </TableCell>
                <TableCell sx={{ color:"#575756", fontSize: '11px', padding: "0px 2px", textAlign: "center", borderBottom: "none" }}>
                  <Button sx={{ color: "white", textTransform: "capitalize", fontSize: "10px", 
                    padding: "3px 25px", borderRadius: "20px",
                    backgroundColor: row.status === "Active" ? "#8DE6B6" : "#f05e5e", 
                    "&:hover": { backgroundColor: row.status === "Active" ? "#8DE6B6" : "#d04a4a" } }}>
                    {row.status}
                  </Button>
                </TableCell>

                <TableCell sx={{ padding: "0px 2px", textAlign: "left", borderBottom: "none" }}>
                  <IconButton>
                    <span className="icon-delete" style={{ fontSize:"16px",color:"black" }} />
                  </IconButton>
                  <IconButton>
                    <img src="/assets/setting.svg" alt="icon" style={{ width: "18px", height: "18px" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserTable;
