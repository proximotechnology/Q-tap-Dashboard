import React, { useEffect, useState } from 'react';
import { Button, Divider, IconButton, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import * as XLSX from 'xlsx';
import { AddUser } from './AddUser';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useBranch } from '../../../../context/BranchContext';
import { useTranslation } from 'react-i18next';

export const UserTable = () => {
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [userStaff, setUserStaff] = useState([]);
  const { selectedBranch } = useBranch(); // Use selectedBranch from context

  const {t} = useTranslation();
  const handleToggleVisibility = (rowId) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleExport = () => {
    const dataToExport = userStaff.map((row) => ({
      "User Name": row.name,
      "Created": row.created_at,
      "PIN": visiblePasswords[row.id] ? row.pin : '******',
      "Access": row.access || '',
      "Status": row.status || '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "User_Data.xlsx");
  };

  // Fetch user staff data
  const getUserStaff = async () => {
    try {
      const response = await axios.get('https://highleveltecknology.com/Qtap/api/restaurant_users', {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('clientToken')}`
        },
        params: {
          brunch_id: selectedBranch // Use selectedBranch from context
        }
      });

      if (response.data) {
        setUserStaff(response.data.restaurant_users || []);
      }
      // console.log("userStaff data response ", response.data);
    } catch (error) {
      console.log("error userStaff data ", error);
    }
  };

  // Fetch data when selectedBranch changes
  useEffect(() => {
    if (selectedBranch) {
      getUserStaff();
    }
  }, [selectedBranch]); // Re-fetch data when selectedBranch changes

  // Handle delete user staff
  const handleDeleteUserStaff = async (id) => {
    try {
      const response = await axios.delete(`https://highleveltecknology.com/Qtap/api/restaurant_users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('clientToken')}`
        }
      });

      if (response.data) {
        toast.success(t("userStaff.deleteSucc"));
        getUserStaff(); // Refresh data after deletion
      }
    } catch (error) {
      console.log("error delete UserStaff ", error);
      toast.error("Error deleting UserStaff");

    }
  };
  // New states for search functionality
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
    setSearchQuery(''); // Reset search query when toggling
  };

  // Filter tickets based on search query
  const filteredUserStaff = userStaff.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <Paper sx={{ padding: "15px 30px 50px 30px", borderRadius: "20px" ,overflow:'auto'}}>
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" padding="5px 0">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src="/assets/Clients.svg" alt="icon" style={{ color: "#D8E0E0", width: "25px", height: "25px", marginRight: "10px" }} />
          <Typography variant="body1" sx={{ fontSize: "16px", color: "#575756" }}>{t("users")}</Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {showSearch && (
              <Box sx={{ width: showSearch ? "100%" : "20%" }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name..."
                  style={{
                    width: "100%",
                    padding: "6px 8px",
                    borderRadius: "6px",
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                    fontSize: "12px",
                    outline: "none",
                    backgroundColor: "#fff",
                    "&:hover": {
                      borderColor: "rgba(0, 0, 0, 0.87)",
                    },
                  }}
                />
              </Box>
            )}
            <IconButton onClick={handleSearchClick}>
              <span
                className="icon-magnifier"
                style={{ fontSize: "15px", color: "#575756" }}
              />
            </IconButton>

          </Box>
          <Button onClick={handleOpen} sx={{ fontSize: "12px", color: "#ef7d00", display: "flex", cursor: "pointer", textTransform: "capitalize" }}>
            {t("add")}
            <span style={{ fontSize: "15px", color: "#ef7d00", fontWeight: 700, paddingLeft: "6px" }}>+</span>
          </Button>
          <AddUser open={modalOpen} onClose={handleClose} />

          <Button onClick={handleExport} variant="text" sx={{ color: '#ef7d00', textTransform: "capitalize", fontSize: "12px" }}>
            {t("export")}
            <ArrowForwardIosIcon sx={{ fontSize: "10px", color: "#ef7d00" }} />
          </Button>
        </Box>
      </Box>

      <Divider sx={{
        width: "100%", height: "2px", background: "linear-gradient(45deg, #FDB913, #F2672E)", borderRadius: "50px",
      }} />

      
        <Table sx={{whiteSpace:'nowrap' }}>
          <TableHead>
            <TableRow sx={{ height: "20px", borderBottom: "2px solid #f0f0f0" }}>
              {[t("userName"), t("created"), t("pin"), t("access"), t("status"), " "].map((header) => (
                <TableCell key={header} sx={{ fontSize: "12px", padding: "3px", width: `${100 / 6}%`, textAlign: "center", color: "#575756" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUserStaff.map((row) => (
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
                <TableCell sx={{ color: "#575756", fontSize: '11px', padding: "0px 2px", textAlign: "center", borderBottom: "none" }}>
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <PersonOutlineOutlinedIcon sx={{ padding: "5px", fontSize: "25px", backgroundColor: "white", borderRadius: "50%", mr: 1 }} />
                    {row.name}
                  </span>
                </TableCell>
                <TableCell sx={{ color: "#575756", fontSize: '11px', padding: "0px 2px", textAlign: "center", borderBottom: "none" }}>
                  {row.created_at}
                </TableCell>
                <TableCell sx={{ color: "#575756", fontSize: '11px', padding: "0px 2px", textAlign: "center", borderBottom: "none" }}>
                  {visiblePasswords[row.id] ? row.pin : '******'}
                  <IconButton onClick={() => handleToggleVisibility(row.id)} sx={{ color: "gray", fontSize: "16px", marginLeft: "2px" }}>
                    {visiblePasswords[row.id] ? <VisibilityOutlinedIcon sx={{ fontSize: "18px" }} /> : <VisibilityOffOutlinedIcon sx={{ fontSize: "18px" }} />}
                  </IconButton>
                </TableCell>
                <TableCell sx={{ color: "#575756", fontSize: '11px', padding: "0px 2px", textAlign: "center", borderBottom: "none" }}>
                  {row.access || ''}
                </TableCell>
                <TableCell sx={{ color: "#575756", fontSize: '11px', padding: "0px 2px", textAlign: "center", borderBottom: "none" }}>
                  <Button sx={{
                    color: "white", textTransform: "capitalize", fontSize: "10px",
                    padding: "3px 25px", borderRadius: "20px",
                    backgroundColor: row.status === "Active" ? "#8DE6B6" : "#f05e5e",
                    "&:hover": { backgroundColor: row.status === "Active" ? "#8DE6B6" : "#d04a4a" }
                  }}>
                    {row.status || ''}
                  </Button>
                </TableCell>
                <TableCell sx={{ padding: "0px 2px", textAlign: "left", borderBottom: "none" }}>
                  <IconButton onClick={() => handleDeleteUserStaff(row.id)}>
                    <span className="icon-delete" style={{ fontSize: "16px", color: "black" }} />
                  </IconButton>
                  <IconButton>
                    <img src="/assets/setting.svg" alt="icon" style={{ width: "18px", height: "18px" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </Paper>
  );
};

export default UserTable;