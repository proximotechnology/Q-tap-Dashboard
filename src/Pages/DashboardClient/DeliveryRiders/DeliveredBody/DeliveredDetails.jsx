import React, { useContext, useRef } from 'react';
import { Box, Typography, IconButton, Grid, Paper, Divider } from '@mui/material';
import { OrderContext } from './DeliveredContext';



export const DeliveredDetails = ({ orders }) => {
  const printRef = useRef();
  const { open, selectedOrder, handleClose } = useContext(OrderContext);

  const handlePrint = () => {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();  
  };

  return (
    open && selectedOrder && (
      <Paper
      ref={printRef}
        sx={{
          width: "90%",
          backgroundColor: "white",
          borderRadius: "10px",
          minWidth: 600,
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 15,
        }}
      >
        <Box sx={{ padding: '10px 20px' }}>
          <Grid container display="flex" justifyContent="space-between" alignItems="center">
            <Grid item xs={11} sx={{ alignItems: "center" }}>
              <Typography variant="body2" sx={{ color: 'gray', fontSize: "11px" }}>
                {selectedOrder.date}
              </Typography>
            </Grid>

            <Grid item xs={1} sx={{ display: "flex", textAlign: "center", alignItems: "center" }}>
              <IconButton onClick={handlePrint} >
                <span class='icon-printer' style={{fontSize: "18px" }} />
              </IconButton>

              <IconButton>
                <span class="icon-close-1"
                  onClick={handleClose}
                  style={{ fontSize: "12px" }}></span>
              </IconButton>
            </Grid>
          </Grid>  {/*Header */}
          <Divider />

          <Grid container spacing={3} sx={{ marginTop: '0px', justifyContent: "space-around" }}>

            <Grid item xs={5}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography color="#262624" fontSize="12px"  >Dine Method</Typography>
                  <Typography color="textSecondary" fontSize="11px" marginLeft={"10px"} marginTop={"3px"}>{selectedOrder.method},</Typography>
                </Box>

                <Box sx={{
                  backgroundColor: "#222240", width: "40px", height: "25px", borderRadius: "30px", display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <span class="icon-map-1" style={{ fontSize: "18px" }}>
                    <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span></span>

                </Box>
              </Box>
              <Typography color="textSecondary" fontSize="11px" >
                <span style={{ color: "#ef7d00", marginLeft: "10px" }}>Address : </span>
                {selectedOrder.address}</Typography>

              <Typography color="textSecondary" fontSize="11px" >
                <span style={{ color: "#ef7d00", marginLeft: "10px" }}>Name : </span>
                {selectedOrder.name}</Typography>

              <Typography color="textSecondary" fontSize="11px" >
                <span style={{ color: "#ef7d00", marginLeft: "10px" }}>Phone : </span>
                {selectedOrder.phone}</Typography>

              <Typography color="#262624" fontSize="12px" marginTop={"15px"}>Payment Method</Typography>
              <Typography color="textSecondary" fontSize="11px" marginLeft={"10px"} marginTop={"3px"}> {selectedOrder.payIcon} {selectedOrder.paymentMethod}</Typography>
              <Typography color="#262624" fontSize="12px" marginTop={"15px"}>Payment Status</Typography>
              <Box display="flex" alignItems="center"  marginLeft={"10px"} marginTop={"6px"}>
              <img src="/assets/balance.svg" alt="icon" style={{ width: "16px", height: "16px", marginRight:"5px" }} />
                  <Typography sx={{ color: selectedOrder.paymentColor }} fontSize="11px"  >
                    {selectedOrder.payment}</Typography> 
              </Box>


            </Grid>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                background: "#D8E0E0",
                width: '1px', marginTop: "20px", transform: 'scaleX(0.5)'
              }}
            />
            <Grid item xs={6} sx={{ padding: "0px 15px" }} >
              <Box>
                <Typography color="#262624" fontSize="12px" marginBottom={"10px"} >Order details</Typography>
                {selectedOrder.items.map((item, index) => (
                  <Grid container alignItems="center" key={index}   >
                    <Grid item xs={8}>
                      <Typography variant="body2" sx={{ color: 'gray', fontSize: "11px", marginBottom: "7px" }}>
                        <span style={{ color: "#ef7d00" }}> {item.quantity}x</span>
                        <span style={{ color: "black" }}> {item.name}</span> (Size:{item.size}), Variants + Extra
                      </Typography>
                    </Grid>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        background: 'linear-gradient(to Bottom, #f57c00, #fbc02d)',
                        width: '1px', transform: 'scaleX(0.5)'
                      }}
                    />

                    <Grid item xs={3}>
                      <Typography variant="body2" align="right" sx={{ color: "gray", fontSize: "11px", marginBottom: "7px" }}>
                        {item.price} EGP
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Box>
              <Divider style={{ color: "#D8E0E0", marginTop: "15px", marginBottom: "10px" }} />

              <Typography variant="body1"  >
                <Typography variant="body2" component="span" sx={{ color: '#ef7d00', fontSize: "12px" }}>
                  <span style={{ color: "#262624", fontSize: "12px" }}>Total: </span>
                  {selectedOrder.total} <span style={{ color: '#ef7d00', fontSize: "8px" }}>EGP</span>
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Box>


        <Grid container sx={{
          marginTop: '10px', padding: "5px 30px", color: "white", justifyContent: "space-between",
          borderRadius: "0px 0px 8px 8px", backgroundColor: "#222240"
        }}>

          <Typography variant="body2" sx={{ fontSize: "14px", display: "flex", alignItems: "center" }}  >
            <Box sx={{ width: "10px", height: "10px", backgroundColor: "#ef7d00", borderRadius: "50%", marginRight: "6px" }}></Box>
            ID #{selectedOrder.id}
          </Typography>

          <Typography variant="body2" sx={{ fontSize: "12px", display: "flex", alignItems: "center" }} >
            {selectedOrder.icon} {selectedOrder.status}
          </Typography>
        </Grid> {/* footer */}


      </Paper >
    )
  );
};
