
import React, { useContext, useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddAreaModal from './AddAreaModal';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { ClientLoginData } from '../../../../context/ClientLoginDataContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddTableModal = ({ open, onClose, onSave, tableData }) => {
  const selectedBranch = localStorage.getItem('selectedBranch');
  const { areaData, getAreaData, getTableDataRes } = useContext(ClientLoginData);
  const { areas } = areaData;
  const [areaMenu, setAreaMenu] = useState('');
  const [size, setSize] = useState('');
  const [name, setName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleCloseAreaModal = () => setModalOpen(false);

  // Pre-fill form fields when editing
  useEffect(() => {
    if (tableData) {
      setName(tableData.name || '');
      setSize(tableData.size || '');
      setAreaMenu(tableData.area_id || '');
    } else {
      setName('');
      setSize('');
      setAreaMenu('');
    }
  }, [tableData]);

  const handleSave = async () => {
    try {
      const dataFormat = {
        brunch_id: selectedBranch,
        area_id: areaMenu,
        name,
        size,
        link: tableData ? tableData.link : 'no link until now', // Preserve link if editing
      };

      const url = tableData
        ? `https://highleveltecknology.com/Qtap/api/tables/${tableData.id}` // Update existing table
        : 'https://highleveltecknology.com/Qtap/api/tables'; // Add new table

      const method = tableData ? 'PUT' : 'POST';

      const response = await axios({
        method,
        url,
        data: dataFormat,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('clientToken')}`,
        },
      });

      if (response.data) {
        toast.success(tableData ? 'Table updated successfully!' : 'Table added successfully!');
        getTableDataRes(); // Refresh table data
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error('Error saving table:', error);
      toast.error('Error saving table');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 3,
          boxShadow: 24,
          mx: 'auto',
          mt: '20vh',
          position: 'relative',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ fontSize: '13px', color: '#424242' }}>
            {tableData ? 'Edit Table' : 'Add Table'}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ fontSize: '20px', color: 'gray' }} />
          </IconButton>
        </Box>
        <Divider sx={{ backgroundColor: '#FF6600', height: '1px' }} />

        {/* Name Field */}
        <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'left' }}>
          <Typography variant="body2" sx={{ width: '25%', textAlign: 'center' }} color="#424242" fontSize="12px">
            Name
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                width: '90%',
                '& .MuiInputBase-input': {
                  height: '35px',
                  padding: '0px 14px',
                  textAlign: 'left',
                  fontSize: '12px',
                  color: 'gray',
                },
              }}
              fullWidth
              placeholder="Table Name"
            />
          </Box>
        </Box>

        {/* Size Field */}
        <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'left' }}>
          <Typography variant="body2" sx={{ width: '25%', textAlign: 'center' }} color="#424242" fontSize="12px">
            Size
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <TextField
              value={size}
              onChange={(e) => setSize(e.target.value)}
              sx={{
                width: '90%',
                '& .MuiInputBase-input': {
                  height: '35px',
                  padding: '0px 14px',
                  color: 'gray',
                  textAlign: 'left',
                  fontSize: '12px',
                },
              }}
              fullWidth
              placeholder="Chairs"
            />
          </Box>
        </Box>

        {/* Area Field */}
        <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'flex-start' }}>
          <Typography variant="body2" sx={{ width: '25%', textAlign: 'center' }} color="#424242" fontSize="12px">
            Area
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <FormControl sx={{ width: '90%' }}>
              <Select
                sx={{
                  '& .MuiInputBase-input': {
                    height: '35px',
                    padding: '0px 14px',
                    textAlign: 'left',
                    fontSize: '12px',
                    color: 'gray',
                    lineHeight: '35px',
                  },
                }}
                fullWidth
                displayEmpty
                value={areaMenu}
                onChange={(e) => setAreaMenu(e.target.value)}
                placeholder="Select Area"
              >
                {areas?.filter((area) => area.brunch_id == selectedBranch)
                  .map((area) => (
                    <MenuItem key={area.id} value={area.id}>
                      {area.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Add Area Button */}
        <Box
          onClick={handleOpen}
          sx={{ float: 'right', position: 'relative', top: '-30px', left: '20px', cursor: 'pointer' }}
        >
          <AddOutlinedIcon sx={{ fontSize: '32px', color: '#ef7d00' }} />
        </Box>
        <AddAreaModal open={modalOpen} onClose={handleCloseAreaModal} />

        {/* Save Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Button
            variant="contained"
            color="warning"
            onClick={handleSave}
            sx={{
              mt: 4,
              borderRadius: '20px',
              height: '30px',
              width: '50%',
              textTransform: 'capitalize',
            }}
          >
            <CheckOutlinedIcon /> Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddTableModal;