import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { Box, useTheme } from '@mui/system';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import TableBarOutlinedIcon from '@mui/icons-material/TableBarOutlined';
import ChairAltOutlinedIcon from '@mui/icons-material/ChairAltOutlined';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClientLoginData } from '../../../../context/ClientLoginDataContext';
import AddTableModal from './AddTable'; // Ensure this component is created
import styles from '../SupportClient/supportCard.module.css'
import { useTranslation } from 'react-i18next';

const TableCard = ({ table, onDeleteTable, onEditTable }) => {
  const {t} = useTranslation();
  const theme = useTheme();
  return(
<Card
      className={styles.card3} // Apply the card3 class for the gradient background
      sx={{
        height: '270px',
        maxWidth: 180,
        width: '140px',
        borderRadius: '10px',
        backgroundColor: 'rgb(211, 221, 253)', // Base background color for the card
        position: 'relative',
      }}
    >
      <CardContent
        sx={{
          zIndex: 5, // Ensure content is above the ::before pseudo-element
          height: '100%', // Ensure the background covers the entire content area
          position: 'relative', // Ensure the content is positioned correctly
        }}
      >
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant="subtitle2" sx={{ fontSize: '11px', color: theme.palette.orangePrimary.main }}>
            {t("id")}{' '}
            <span style={{ fontSize: '10px', color: '#AAAAAA', borderBottom: '1px solid #AAAAAA' }}>
              {table.id}
            </span>
          </Typography>
          <span
            onClick={onDeleteTable}
            className="icon-delete"
            style={{ fontSize: '15px', color: 'red', cursor: 'pointer' }}
          />
        </Box>
        <Divider
          sx={{
            backgroundImage: 'linear-gradient(to right, #FDB913, #F2672E)',
            height: '2px',
            marginTop: '2px',
            border: 'none',
          }}
        />

        <Typography sx={{ fontSize: '12px', display: 'flex', color: '#7b6a6a', marginTop: '9px' }}>
          <TableBarOutlinedIcon sx={{ fontSize: '12px', mr: '5px' }} /> Name
        </Typography>
        <Typography
          variant="body2"
          component="div"
          sx={{ fontSize: '9px', display: 'flex', color: '#9d9d9c', marginLeft: '5px' }}
        >
          {table.name}
        </Typography>

        <Box display={'flex'} justifyContent={'space-between'}>
          <Box>
            <Typography
              variant="body2"
              sx={{ fontSize: '10px', display: 'flex', color: '#7b6a6a', marginTop: '10px' }}
            >
              <ChairAltOutlinedIcon sx={{ fontSize: '14px', mr: '5px' }} />
              Chairs
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: '10px', display: 'flex', color: '#9d9d9c', marginLeft: '5px' }}
            >
              {table.chairs} ch
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{ fontSize: '10px', display: 'flex', color: '#7b6a6a', marginTop: '10px' }}
            >
              <img src="/assets/location.svg" alt="location icon" style={{ width: '13px', height: '13px' }} />
              Area
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: '10px', display: 'flex', color: '#9d9d9c', marginLeft: '10px' }}
            >
              {table.area}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            height: '100px',
            textAlign: 'center',
            borderRadius: '10px',
            border: '3px solid #ef7d00',
            margin: '10px auto',
            display: 'flex',
            width: '90%',
            padding: '2px 5px',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <QRCodeSVG
            value={`https://highleveltecknology.com/Qtap${table.link}`}
            size={90}
            fgColor="#000000"
            bgColor="#FFFFFF"
            level="Q"
          />
        </Box>

        <Grid container justifyContent="center" alignItems="center">
          <IconButton>
            <span className="icon-link" style={{ fontSize: '15px', color: 'black' }} />
          </IconButton>
          <IconButton>
            <span className="icon-qr-code" style={{ fontSize: '15px', color: 'black' }} />
          </IconButton>
          <IconButton onClick={() => onEditTable(table)}>
            <span className="icon-edit" style={{ fontSize: '18px', color: 'black' }} />
          </IconButton>
        </Grid>
      </CardContent>
    </Card>
);
}
export const Tables = ({ openOldMenu }) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const { tableDataRes, getTableDataRes } = useContext(ClientLoginData);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTable(null); // Reset editing table state
  };

  const handleSaveTable = async (tableData) => {
    try {
      const url = editingTable
        ? `https://highleveltecknology.com/Qtap/api/tables/${editingTable.id}`
        : 'https://highleveltecknology.com/Qtap/api/tables';
      const method = editingTable ? 'PUT' : 'POST';

      const response = await axios({
        method,
        url,
        data: tableData,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('clientToken')}`,
        },
      });

      if (response.data) {
        toast.success(editingTable ? t("table.updateSucc") : t("table.addSucc"));
        getTableDataRes(); // Refresh table data
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error saving table:', error);
      toast.error(t("table.saveErr"));
    }
  };

  const handleEditTable = (table) => {
    setEditingTable(table);
    setModalOpen(true);
  };

  const handleDeleteTable = async (id) => {
    try {
      const response = await axios.delete(`https://highleveltecknology.com/Qtap/api/tables/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('clientToken')}`,
        },
      });

      if (response.data) {
        toast.success(t("table.deleteSucc"));
        getTableDataRes(); // Refresh table data
      }
    } catch (error) {
      console.error('Error deleting table:', error);
      toast.error(t("table.deleteErr"));
    }
  };
  useEffect(()=>{
    getTableDataRes(); // Fetch table data when component mounts
  },[])

  return (
    <Paper style={{ padding: '20px 30px', borderRadius: '10px', marginTop: '16px' }}>
      <Box sx={{ maxWidth: '100%', padding: '6px' }}>
        <Typography variant="body1" sx={{ textAlign: 'left', fontSize: '13px', color: '#4b4a4a' }}>
          {t("table.add")}
        </Typography>

        <Divider
        sx={{
          backgroundImage: 'linear-gradient(to right, #FDB913, #F2672E)',
          height: '2px',
          marginTop: '2px',
          border: 'none',
        }}
      />
        <Grid container spacing={2} sx={{ marginTop: '10px' }}>
          {tableDataRes.map((table, index) => (
            <Grid item key={index}>
              <TableCard table={table} onDeleteTable={() => handleDeleteTable(table.id)} onEditTable={handleEditTable} />
            </Grid>
          ))}
          <Grid item>
            <Card
              onClick={handleOpenModal}
              sx={{
                height: '270px',
                maxWidth: 180,
                width: '140px',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#EBEDF3',
              }}
            >
              <img src="/assets/add.svg" alt="add icon" style={{ width: '35px', height: '35px' }} />
            </Card>

            <AddTableModal
              open={modalOpen}
              onClose={handleCloseModal}
              onSave={handleSaveTable}
              tableData={editingTable} // Pass table data for editing
            />
          </Grid>
        </Grid>

        <Box textAlign="center" mt={4}>
          <Button
            sx={{
              fontSize: '13px',
              padding: '3px 50px',
              margin: '20px 0px',
              borderRadius: '20px',
              backgroundColor: theme.palette.orangePrimary.main,
              color: 'white',
              textTransform: 'capitalize',
              '&:hover': {
                backgroundColor: theme.palette.orangePrimary.main,
              },
            }}
            startIcon={<CheckOutlinedIcon />}
          >
            {t("save")}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};