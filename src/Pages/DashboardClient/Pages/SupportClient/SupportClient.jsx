import React, { useState } from 'react';
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
const TicketCard = ({ ticketNumber, name, mail, date, status, onClick }) => {
  const statusStyles = {
    'In Progress': { backgroundColor: '#222240', color: '#f4f6fc' },
    Done: { backgroundColor: '#ECECEC', color: '#9d9d9c' },
  };
  return (
    <Paper
      elevation={0}
      sx={{
        width: 150,
        height: 150,
        borderRadius: 6,
        padding: 2,
        position: 'relative',
        cursor: "pointer",
        backgroundColor: statusStyles[status].backgroundColor,
        color: statusStyles[status].color,
        textShadow: "none",
      }}
      onClick={onClick}
    >
      <Typography variant="body2" sx={{ fontSize: "10px", paddingBottom: "10px" }}>No. #{ticketNumber}</Typography>
      <Typography variant="body2" sx={{ fontSize: "9px", paddingBottom: "10px" }}>Name: {name}</Typography>
      <Typography variant="body2" sx={{ fontSize: "9px", paddingBottom: "10px" }}>Mail: {mail}</Typography>
      <Typography variant="body2" sx={{ fontSize: "9px", paddingBottom: "10px" }}>Date: {date}</Typography>
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: "25%",
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {status === 'In Progress' ? (
          <>
            <span class="icon-processing-time" style={{ fontSize: "16px", color: "#ef7d00" }} ></span>
            <Typography variant="body1" sx={{ fontSize: "10px", color: "#ef7d00", ml: 1 }}>In Progress</Typography>
          </>
        ) : (
          <>
            <span class="icon-check" style={{ fontSize: "16px", color: "black" }} ></span>
            <Typography variant="body1" sx={{ fontSize: "10px", color: "black", ml: 1 }}>
              Done
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
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleClickOpen = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleClose = () => {
    setSelectedTicket(null);
  };
  const discounts =
    [
      { name: 'Mohamed Ahmed', phone: '010203034450', orderId: '123344', status: 'sad', rate: "2", satisfied: "3" },
      { name: 'Ahmed Alaa', phone: '010203034450', orderId: '123344', status: 'happy', rate: "4", satisfied: "8" }
    ]

  const [activeStars, setActiveStars] = useState(discounts.map(item => item.rate));
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

  return (
    <>
      <Paper sx={{ padding: 3, borderRadius: "10px" }}>
        <Grid container spacing={2} alignItems="center">
          {/* the header */}
          <Grid item xs={12} sx={{ display: "flex" }}>
            <Typography variant="body1" sx={{ fontSize: "12px", color: "#575756" }}>Tickets</Typography>
            <Grid item xs>
              <Box sx={{ textAlign: 'right' }}>
                <IconButton>
                  <span class="icon-magnifier" style={{ fontSize: "15px", color: "#575756" }} />
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          {/* the ticket */}
          {ticketData.map((ticket, index) => (
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
              <AddIcon sx={{ fontSize: 50, fontWeight: "bolder" }} />
            </Paper>
          </Grid>{/* add ticket */}
        </Grid>

      </Paper>

      <Paper sx={{ borderRadius: "10px", marginTop: "25px", paddingBottom: "30px" }}>

        <Box sx={{ padding: "30px 30px 0px 30px ", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body1" sx={{ fontSize: "12px", color: "#575756" }}>
            Feedback
          </Typography>

          <Typography
            onClick={handleOpenModel}
            variant="body1" sx={{ fontSize: "10px", color: "#E57C00", cursor: "pointer" }}>
            <img src="/assets/add.svg" alt="add icon " style={{ width: "8px", height: "8px" }} />
            Add Question
          </Typography>

          <AddQuestion open={openModal} handleCloseModel={handleCloseModel} onAddQuestion={addQuestion} />
        </Box>

        <Divider sx={{
          width: "94%", height: "2px", background: "linear-gradient(45deg, #FDB913, #F2672E)", borderRadius: "50px",
          margin: "5px 30px",
        }} />

        <Box sx={{ width: '100%', padding: "0px 30px ", display: 'flex', flexDirection: 'column', gap: 1 }}>
          {questions.map((question, index) => (
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
                {question}
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
              <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756", width: "30%" }}>Customer</TableCell>
              <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756", width: "30%" }}>Phone</TableCell>
              <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756", width: "30%" }}>Order Id</TableCell>
              <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756", width: "40%" }}>Rate</TableCell>
              <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756", width: "20%" }}>Status</TableCell>
              <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756", width: "16%" }}>Details</TableCell>
              <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756", width: "16%" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {discounts.map((discount, rowIndex) => (
              <TableRow key={rowIndex}
                onClick={() => handleRowClick(discount)}
                sx={{ height: '36px', cursor: 'pointer' }}>

                <TableCell sx={{ textAlign: "center", fontSize: "11px", color: "gray", padding: '5px 0px', borderBottom: "none" }}>{discount.name}</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "11px", color: "gray", padding: '5px 0px', borderBottom: "none" }}>{discount.phone}</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "11px", color: "#E57C00", padding: '5px 0px', borderBottom: "none" }}>#{discount.orderId}</TableCell>
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
                          onClick={() => handleStarClick(index, rowIndex)}
                          sx={{
                            padding: '3px',
                          }}
                        >
                          {index < activeStars[rowIndex] ? (
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
                  {discount.status === "sad" ? <SentimentVeryDissatisfiedIcon sx={{ fontSize: "35px", color: "red" }} /> :
                    discount.status === "happy" ? <SentimentSatisfiedAltIcon sx={{ fontSize: "35px", color: "green" }} /> :
                      ""}
                </TableCell>

                <TableCell sx={{ textAlign: "center", padding: '5px 0px', borderBottom: "none" }}>
                  <IconButton size="small" >
                    <span class="icon-information" style={{ fontSize: "25px", color: "#E57C00" }}></span>
                  </IconButton>
                </TableCell>

                <TableCell sx={{ textAlign: "center", padding: '5px 0px', borderBottom: "none" }}>
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
