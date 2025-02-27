import React, { useState } from 'react';
import { Modal, Box, Grid, Typography, IconButton, TextField, Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

const TicketDetails = ({
  open,
  handleClose,
  ticket,
  customerName,
  customerEmail,
  content,
  status,
  phoneNumber,
  setCustomerName,
  setCustomerEmail,
  setContent,
  setStatus,
  setPhoneNumber,
  updateTicket,
  addTicket // Add this prop to handle adding a new ticket
}) => {
  const [note, setNote] = useState(ticket?.note || '');

  const handleSave = () => {
    if (ticket && ticket.id) {
      updateTicket();
    } else {
      addTicket();
    }
    handleClose();
  };

  // Function to handle status change
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    // Optionally auto-save when status changes
    // updateTicket();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none !important',
        outline: 'none',
        '& .MuiBackdrop-root': {
          border: 'none !important',
          outline: 'none',
        },
      }}
    >
      <Box
        sx={{
          padding: '30px 40px',
          backgroundColor: '#fff',
          border: 'none !important',
          borderRadius: '10px',
          maxWidth: '800px',
          width: '100%',
          margin: 'auto',
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" sx={{ fontSize: '13px' }}>
              Ticket No.#{ticket?.id || 'New Ticket'}
            </Typography>
            <Box display="flex" alignItems="center">
              <span className="icon-printer" style={{ marginRight: '30px', cursor: 'pointer', fontSize: '20px' }} />
              <span className="icon-close-1" style={{ cursor: 'pointer' }} onClick={handleClose} />
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="customer-name"
                  label="Customer Name:"
                  variant="standard"
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    sx: {
                      fontSize: '13px',
                    },
                  }}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '10px',
                      color: 'gray',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="date"
                  label="Date:"
                  variant="standard"
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    sx: {
                      fontSize: '13px',
                    },
                  }}
                  defaultValue={ticket?.created_at}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '10px',
                      color: 'gray',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="time"
                  label="Time:"
                  variant="standard"
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    sx: {
                      fontSize: '13px',
                    },
                  }}
                  defaultValue={ticket ? new Date(ticket.created_at).toLocaleTimeString() : ''}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '10px',
                      color: 'gray',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="mail"
                  label="Mail:"
                  variant="standard"
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    sx: {
                      fontSize: '12px',
                    },
                  }}
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '10px',
                      color: 'gray',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="mobile-number"
                  label="Mobile Number:"
                  variant="standard"
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    sx: {
                      fontSize: '13px',
                    },
                  }}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '10px',
                      color: 'gray',
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4 }}>
              <Grid container alignItems="center" justifyContent="center">
                <Grid item>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton
                      sx={{
                        bgcolor: status === 'open' ? '#ef7d00' : '#9d9d9c',
                        '&:hover': { bgcolor: status === 'open' ? '#ef7d00' : '#b0b0b0' }
                      }}
                      onClick={() => handleStatusChange('open')}
                    >
                      <span className="icon-share" style={{ fontSize: 13, color: 'white' }} />
                    </IconButton>
                    <Typography
                      variant="caption"
                      sx={{
                        color: status === 'open' ? '#ef7d00' : '#9d9d9c',
                        fontSize: '9px',
                        mt: 1
                      }}
                    >
                      Opened
                    </Typography>
                  </Box>
                </Grid>

                <Grid item>
                  <Box sx={{ borderBottom: '1px solid #ccc', width: 70, marginTop: '-10px' }} />
                </Grid>

                <Grid item>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton
                      sx={{
                        bgcolor: status === 'in_progress' ? '#ef7d00' : '#9d9d9c',
                        '&:hover': { bgcolor: status === 'in_progress' ? '#ef7d00' : '#b0b0b0' }
                      }}
                      onClick={() => handleStatusChange('in_progress')}
                    >
                      <span className="icon-processing-time" style={{ fontSize: 13, color: 'white' }} />
                    </IconButton>
                    <Typography
                      variant="caption"
                      sx={{
                        color: status === 'in_progress' ? '#ef7d00' : '#9d9d9c',
                        fontSize: '9px',
                        mt: 1
                      }}
                    >
                      In Progress
                    </Typography>
                  </Box>
                </Grid>

                <Grid item>
                  <Box sx={{ borderBottom: '1px solid #ccc', width: 70, marginTop: '-10px' }} />
                </Grid>

                <Grid item>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton
                      sx={{
                        bgcolor: status === 'Done' ? '#ef7d00' : '#9d9d9c',
                        '&:hover': { bgcolor: status === 'Done' ? '#ef7d00' : '#b0b0b0' }
                      }}
                      onClick={() => handleStatusChange('Done')}
                    >
                      <span
                        className="icon-check"
                        style={{
                          fontSize: 13,
                          color: 'white',
                          padding: '5px',
                          borderRadius: '50%',
                        }}
                      />
                    </IconButton>
                    <Typography
                      variant="caption"
                      sx={{
                        color: status === 'Done' ? '#ef7d00' : '#9d9d9c',
                        fontSize: '9px'
                      }}
                    >
                      Done
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box>
              <Typography variant="body2" sx={{ fontSize: '12px', mb: 1 }}>
                Note:
              </Typography>
              <TextField

                variant="standard"
                fullWidth
                multiline
                rows={9}
                size="small"
                sx={{ backgroundColor: '#f7f7f7' }}
                InputProps={{
                  style: {
                    fontSize: '12px',
                    padding: '15px',
                    color: 'gray',
                  },
                }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <Grid item xs={12} display="flex" justifyContent="center" sx={{ marginTop: '50px' }}>
                <Button
                  sx={{
                    border: '1px solid #9d9d9c',
                    color: '#ef7d00',
                    borderRadius: '20px',
                    textTransform: 'capitalize',
                    padding: '2px 22px',
                  }}
                  onClick={handleSave}
                >
                  <DoneIcon sx={{ fontSize: '18px', mr: 1 }} /> Save
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default TicketDetails;