import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TicketDetails from '../DashboardClient/Pages/SupportClient/TicketDetails';
import ChatApp from './ChatApp';
import axios from 'axios';
import { toast } from 'react-toastify';
import DetailsModal from '../DashboardClient/Pages/SupportClient/DetailsModal';
import { useTranslation } from 'react-i18next';


const TicketCard = ({ id, Customer_Name, Customer_Email, created_at, status, onClick }) => {
  const statusStyles = {
    'in_progress': { backgroundColor: '#222240', color: '#f4f6fc' },
    'open': { backgroundColor: '#EBEDF3', color: '#575756' },
  };

  // Format the date
  const formattedDate = new Date(created_at).toLocaleDateString();
  const { t } = useTranslation()

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "10px",
        width: 150,
        height: 150,
        borderRadius: 6,
        position: 'relative',
        cursor: "pointer",
        backgroundColor: statusStyles[status]?.backgroundColor || '#EBEDF3',
        color: statusStyles[status]?.color || '#575756',
      }}
      onClick={onClick}
    >
      <Typography variant="body2" sx={{ fontSize: "11px", paddingBottom: "10px" }}>
        {t("ticketNO")}{id}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: "9px", paddingBottom: "10px" }}>
        {t("name")} {Customer_Name}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: "9px", paddingBottom: "10px" }}>
        {t("mail")} {Customer_Email}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: "9px", paddingBottom: "10px" }}>
        {t("date")} {formattedDate}
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: "25%",
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {status === 'in_progress' ? (
          <>
            <span className="icon-processing-time" style={{ fontSize: "13px", color: "#ef7d00" }} />
            <Typography variant="body1" sx={{ fontSize: "11px", color: "#ef7d00", ml: 1 }}>
              {t("inProgress")}
            </Typography>
          </>
        ) : (
          <>
            <span className="icon-check" style={{ fontSize: "12px", color: "#222240" }} />
            <Typography variant="body1" sx={{ fontSize: "11px", color: "#222240", ml: 1 }}>
              {t("open")}
            </Typography>
          </>
        )}
      </Box>
    </Paper>
  );
};


const Support = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [selectedRow, setSelectedRow] = useState(null);
  const [openModalRow, setOpenModalRow] = useState(false);

  const { t } = useTranslation()

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setOpenModalRow(true);
  };

  const handleCloseModalRow = () => {
    setOpenModalRow(false);
  };
  // Fetch tickets from API
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://highleveltecknology.com/Qtap/api/ticket', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error(t("faildFetchTickets"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleClickOpen = (ticket) => {
    setSelectedTicket(ticket);
    // Populate form fields with ticket data
    setCustomerName(ticket.Customer_Name || '');
    setCustomerEmail(ticket.Customer_Email || '');
    setContent(ticket.content || '');
    setStatus(ticket.status || '');
    setPhoneNumber(ticket.Customer_Phone || '');
  };

  const handleClose = () => {
    setSelectedTicket(null);
    // Reset form fields
    setCustomerName('');
    setCustomerEmail('');
    setContent('');
    setStatus('');
    setPhoneNumber('');
  };

  const updateTicket = async () => {
    try {
      if (!selectedTicket) return;

      const data = {
        Customer_Name: customerName,
        Customer_Email: customerEmail,
        content: content,
        status: status,
        Customer_Phone: phoneNumber,
        client_id: "10",
        brunch_id: "10"
      };

      const response = await axios.put(
        `https://highleveltecknology.com/Qtap/api/ticket/${selectedTicket.id}`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.ticket) {
        // Update tickets list with the updated ticket
        setTickets(tickets.map(ticket =>
          ticket.id === selectedTicket.id ? response.data.ticket : ticket
        ));
        toast.success(t("ticketUpdatedSucc"));
        handleClose(); // Close the modal and reset form
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      toast.error(error.response?.data?.message || t("faildToUpdateTicket"));
    }
  };

  const addTicket = async () => {
    try {

      const data = {
        Customer_Name: customerName,
        Customer_Email: customerEmail,
        content: content,
        status: status,
        Customer_Phone: phoneNumber,
        client_id: "10",
        brunch_id: localStorage.getItem("selectedBranch")
      };

      // console.log(" dat2a add", data);

      const response = await axios.post(
        'https://highleveltecknology.com/Qtap/api/ticket',
        data,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        setTickets([...tickets, response.data.ticket]);
        toast.success(t("ticketAddedSucc"));
        handleClose();
      }
    } catch (error) {
      console.error('Error adding ticket:', error);
      toast.error(error.response?.data?.message || t("faildToAddTicket"));
    }
  };

  return (
    <Box sx={{ padding: "0px 20px" }}>
      <Grid sx={{ marginBottom: "15px" }}>
        <ChatApp />
      </Grid>

      <Paper sx={{ padding: "10px 20px", borderRadius: "20px" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ fontSize: "12px", color: "#575756" }}>
              {t("ticket")}
            </Typography>
            <Grid item xs>
              <Box sx={{ textAlign: 'right' }}>
                <IconButton>
                  <span className="icon-magnifier" style={{ fontSize: "16px" }} />
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          {tickets.map((ticket) => (
            <Grid item key={ticket.id}>
              <TicketCard {...ticket} onClick={() => handleClickOpen(ticket)} />
            </Grid>
          ))}

          <Grid item>
            <Paper
              elevation={3}
              sx={{
                width: 150,
                height: 150,
                borderRadius: 6,
                padding: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ECECEC',
                cursor: "pointer",
              }}
            >
              <IconButton onClick={handleClickOpen}>
                <AddIcon sx={{ fontSize: 50, fontWeight: "bolder" }} />
              </IconButton>            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {selectedTicket && (
        <TicketDetails
          open={Boolean(selectedTicket)}
          handleClose={handleClose}
          ticket={selectedTicket}
          customerName={customerName}
          customerEmail={customerEmail}
          content={content}
          status={status}
          phoneNumber={phoneNumber}
          setCustomerName={setCustomerName}
          setCustomerEmail={setCustomerEmail}
          setContent={setContent}
          setStatus={setStatus}
          setPhoneNumber={setPhoneNumber}
          updateTicket={updateTicket}
          addTicket={addTicket}
        />
      )}
      {selectedRow && (
        <DetailsModal
          open={openModalRow}
          onClose={handleCloseModalRow}
          rowData={selectedRow}
        />
      )}
    </Box>
  );
};

export default Support;
