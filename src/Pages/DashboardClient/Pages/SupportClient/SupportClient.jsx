import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, IconButton, Divider, TableCell, TableRow, TableBody, Table, TableHead } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ticketData from './ticketData';
import TicketDetails from './TicketDetails';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { AddQuestion } from './AddQuestion';
import DetailsModal from './DetailsModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
const TicketCard = ({ id, Customer_Name, Customer_Email, created_at, status, onClick }) => {
  const statusStyles = {
    'in_progress': { backgroundColor: '#222240', color: '#f4f6fc' },
    'open': { backgroundColor: '#EBEDF3', color: '#575756' },
    // "Done": { backgroundColor: '#00A343', color: '#f4f6fc' },
  };

  // Format the date
  const formattedDate = new Date(created_at).toLocaleDateString();
  const { t } = useTranslation();
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
        {t("ticketNo")}{id}
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
        ) : status === "Done" ? (
          <>
            <span className="icon-check" style={{ fontSize: "12px", color: "black" }} />
            <Typography variant="body1" sx={{ fontSize: "11px", color: "black", ml: 1 }}>
              {t("done")}
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

  const [questions, setQuestions] = useState([
    "How much you satisfied with the product?",
    "How much you satisfied with the service?",
  ]);

  const { t } = useTranslation();
  const addQuestion = (newQuestion) => {
    if (newQuestion.trim() !== "") {
      setQuestions([...questions, newQuestion]);
    }
  };
  const handleDelete = (indexToRemove) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, index) => index !== indexToRemove)
    );
  };
  // ===============================================================

  const discounts =
    [
      { name: 'Mohamed Ahmed', phone: '010203034450', orderId: '123344', status: 'sad', rate: "2", satisfied: "3" },
      { name: 'Ahmed Alaa', phone: '010203034450', orderId: '123344', status: 'happy', rate: "4", satisfied: "8" }
    ]

  const [activeStars, setActiveStars] = useState(discounts.map(item => item.star));
  const handleStarClick = (index, rowIndex) => {
    const newStars = [...activeStars];
    newStars[rowIndex] = index + 1;
    setActiveStars(newStars);
  };
  // ============================================================
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModel = () => {
    setOpenModal(true);
  };

  const handleCloseModel = () => {
    setOpenModal(false);
  };
  // ============================================================

  const [selectedRow, setSelectedRow] = useState(null);
  const [openModalRow, setOpenModalRow] = useState(false);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setOpenModalRow(true);
  };

  const handleCloseModalRow = () => {
    setOpenModalRow(false);
  };

  //========================================== get feedback data 

  const [feedbackData, setFeedbackData] = useState([]);

  const getFeedbackData = async () => {
    try {
      const response = await axios.get('https://highleveltecknology.com/Qtap/api/feedback', {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('clientToken')}`
        }
      })

      if (response.data) {
        setFeedbackData(response.data);
      }
      console.log("feedback data response ", response.data);

    } catch (error) {
      console.log("error feedback data ", error);

    }

  }
  useEffect(() => {
    getFeedbackData();
  }, [])
  //========================================== handle delete feedback

  const handleDeleteFeedback = async (id) => {
    try {
      const response = await axios.delete(`https://highleveltecknology.com/Qtap/api/feedback/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('clientToken')}`
        }
      })

      if (response.data) {
        toast.success(t("feedbacks.deleteSucc"));
        getFeedbackData();
      }
    } catch (error) {
      console.log("error delete feedback ", error);
      toast.error(t("feedbacks.deleteErr"));

    }
  }

  ///========================================================== tickets code
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Fetch tickets from API
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://highleveltecknology.com/Qtap/api/ticket', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('clientToken')}`
        }
      });
      setTickets(response.data);
      // console.log('Tickets:', response.data);

    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error(t("feedbacks.fetchErr"));
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

      console.log(" dat2a add", data);

      const response = await axios.post(
        'https://highleveltecknology.com/Qtap/api/ticket',
        data,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        setTickets([...tickets, response.data.ticket]);
        toast.success(t("ticket.addSucc"));
        handleClose();
      }
    } catch (error) {
      console.error('Error adding ticket:', error);
      toast.error(error.response?.data?.message || t("ticket.addErr"));
    }
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
        client_id: "10",          /////////////////////////////????????????❌
        brunch_id: localStorage.getItem("selectedBranch")
      };

      console.log(" dat2a", data);

      const response = await axios.put(
        `https://highleveltecknology.com/Qtap/api/ticket/${selectedTicket.id}`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.ticket) {
        // Update tickets list with the updated ticket
        setTickets(tickets.map(ticket =>
          ticket.id === selectedTicket.id ? response.data.ticket : ticket
        ));
        toast.success(t("ticket.updateSucc"));
        handleClose(); // Close the modal and reset form
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      toast.error(error.response?.data?.message || t("ticket.updateErr"));
    }
  };
  return (
    <>
      <Paper sx={{ padding: 3, borderRadius: "10px" }}>
        <Grid container spacing={2} alignItems="center">
          {/* the header */}
          <Grid item xs={12} sx={{ display: "flex" }}>
            <Typography variant="body1" sx={{ fontSize: "12px", color: "#575756" }}>{t("ticket.many")}</Typography>
            <Grid item xs>
              <Box sx={{ textAlign: 'right' }}>
                <IconButton>
                  <span class="icon-magnifier" style={{ fontSize: "15px", color: "#575756" }} />
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          {/* the ticket */}
          {tickets.map((ticket, index) => (
            <Grid item key={index}>
              <TicketCard {...ticket} onClick={() => handleClickOpen(ticket)} />
            </Grid>
          ))}
          <Grid item>
            <Paper
              elevation={0}
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
                textShadow: "none",
              }}
            >
              <IconButton onClick={handleClickOpen}>
                <AddIcon sx={{ fontSize: 50, fontWeight: "bolder" }} />
              </IconButton>
            </Paper>
          </Grid>{/* add ticket */}
        </Grid>

      </Paper>


      <Paper sx={{ borderRadius: "10px", marginTop: "25px", paddingBottom: "30px" }}>

        <Box sx={{ padding: "30px 30px 0px 30px ", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body1" sx={{ fontSize: "12px", color: "#575756" }}>
            {t("feedbacks.many")}
          </Typography>

          <Typography
            onClick={handleOpenModel}
            variant="body1" sx={{ fontSize: "10px", color: "#E57C00", cursor: "pointer" }}>
            <img src="/assets/add.svg" alt="add icon " style={{ width: "8px", height: "8px", marginRight: "5px" }} />
           {t("addQuestion")}
          </Typography>

          <AddQuestion open={openModal} handleCloseModel={handleCloseModel} onAddQuestion={addQuestion} />
        </Box>

        <Divider sx={{
          width: "94%", height: "2px", background: "linear-gradient(45deg, #FDB913, #F2672E)", borderRadius: "50px",
          margin: "5px 30px",
        }} />

        <Box sx={{ width: '100%', padding: "0px 30px ", display: 'flex', flexDirection: 'column', gap: 1 }}>
          {feedbackData.slice(0, 3).map((question, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: '#575756',
                }}
              >
                {question.comment}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton size="small" onClick={() => handleDelete(index)} >
                  <span className='icon-delete' style={{ fontSize: "20px" }}></span>
                </IconButton>
                <IconButton size="small" >
                  <img src="/assets/setting.svg" alt="setting icon" style={{ width: "15px", height: "15px" }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>

        <Table sx={{ p: 0, mt: 2, mb: 5, width: '100%', tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#EBEDF3" }}>
              <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756", width: "30%" }}>{t("customer")}</TableCell>
              <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756", width: "30%" }}>{t("mobileNumber")}</TableCell>
              <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756", width: "30%" }}>{t("orderId")}</TableCell>
              <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756", width: "40%" }}>{t("rate")}</TableCell>
              <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756", width: "20%" }}>{t("status")}</TableCell>
              <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756", width: "16%" }}>{t("details")}</TableCell>
              <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756", width: "16%" }}>{t("action")}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {feedbackData.map((discount, rowIndex) => (
              <TableRow key={rowIndex}
                sx={{ height: '36px', cursor: 'pointer' }}>

                <TableCell sx={{ textAlign: "center", fontSize: "11px", color: "gray", padding: '5px 0px', borderBottom: "none" }}>{discount.client.name}</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "11px", color: "gray", padding: '5px 0px', borderBottom: "none" }}>{discount.client.mobile}</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "11px", color: "#E57C00", padding: '5px 0px', borderBottom: "none" }}>#{discount.id}</TableCell>

                <TableCell
                  sx={{
                    padding: '5px 0px',
                    borderBottom: 'none',
                    textAlign: 'center',
                  }}
                >
                  <Grid
                    container
                    spacing={0}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Grid
                        item
                        key={index}
                        sx={{
                          display: 'flex',
                          padding: 0,
                        }}
                      >
                        <IconButton
                          sx={{
                            padding: '3px',
                          }}
                        >
                          {index < discount.star ? (
                            <StarIcon
                              sx={{
                                fontSize: '20px',
                                color: '#E57C00',
                              }}
                            />
                          ) : (
                            <StarOutlineIcon
                              sx={{
                                fontSize: '20px',
                                color: '#E57C00',
                              }}
                            />
                          )}
                        </IconButton>
                      </Grid>
                    ))}
                  </Grid>
                </TableCell>


                <TableCell sx={{ textAlign: "center", fontSize: "20px", color: "gray", padding: '5px 0px', borderBottom: "none" }}>
                  {discount.emoji === "said" ? <SentimentVeryDissatisfiedIcon sx={{ fontSize: "35px", color: "red" }} /> :
                    discount.emoji === "happy" ? <SentimentSatisfiedAltIcon sx={{ fontSize: "35px", color: "rgb(229, 124, 0)" }} /> :
                      discount.emoji === "very happy" ? <SentimentSatisfiedAltIcon sx={{ fontSize: "35px", color: "green" }} /> :
                        ""}
                </TableCell>

                <TableCell
                  onClick={() => handleRowClick(discount)}
                  sx={{ textAlign: "center", padding: '5px 0px', borderBottom: "none" }}>
                  <IconButton size="small" >
                    <span class="icon-information" style={{ fontSize: "25px", color: "#E57C00" }}></span>
                  </IconButton>
                </TableCell>

                <TableCell
                  onClick={() => handleDeleteFeedback(discount.id)}
                  sx={{ textAlign: "center", padding: '5px 0px', borderBottom: "none" }}>
                  <IconButton size="small" color="error">
                    <span class="icon-delete" style={{ fontSize: "25px" }}></span>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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
    </>
  );
};

export default Support;
