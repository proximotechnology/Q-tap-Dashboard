import React, { useContext } from 'react';
import { Card, Box, Typography, Button, Divider } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { OrderContext } from './DeliveredContext';

export const DeliveredCard = ({ orders }) => {
  const { handleOpen } = useContext(OrderContext);
  return (
    <>
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          position: 'relative',
          padding: '12px 0',
          cursor: 'pointer',
          alignItems: "center",
          justifyContent: "center",
          marginTop: "-25px", zIndex: "5"
        }}
      >
        <Typography variant="body1" sx={{ color: '#333' }}>
          New Orders
        </Typography>
        <Box
          sx={{
            height: '5px',
            width: '100%',
            position: 'absolute',
            bottom: 0,
            borderRadius: '0 0 8px 8px',
            background: 'linear-gradient(to right, #fbc927, #f05a27)',
          }}
        />
      </Box> {/*Tabs */}


      {orders.map((order) => (
        <Card sx={{ marginTop: "15px",marginBottom:"30px", borderRadius: "8px" }} >
          <Box display="flex" justifyContent="space-between"
            sx={{ backgroundColor: "#222240", padding: "7px 15px", }}>
            <Typography
              variant="body1"
              sx={{
                color: "white", fontSize: "14px",
                borderRadius: "10px 10px 0px 0px",
                display: "flex", alignItems: "center"
              }}
            >
              <Box sx={{ width: "10px", height: "10px", borderRadius: "50%", marginRight: "10px", backgroundColor: "#ef7d00" }}></Box>
              ID #{order.id}
            </Typography>
            <Typography sx={{ fontSize: "13px", color: order.paymentColor }}>
            <Box display="flex" alignItems="center" justifyContent="center">
            <img src="/assets/balance.svg" alt="icon" style={{ width: "16px", height: "16px", marginRight:"5px" }} />
              <span>{order.payment}</span>
            </Box>
            </Typography>

          </Box>
          <Box sx={{ padding: "7px 15px", textAlign: "end" }}>
            <Typography color="textSecondary" fontSize="12px" >{order.date}</Typography>
            <Divider sx={{ marginTop: "5px" }} />
          </Box>

          <Box sx={{ padding: "0px 15px", }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography color="#262624" fontSize="12px"  >Dine Method</Typography>
                <Typography color="textSecondary" fontSize="11px" marginLeft={"10px"} marginTop={"3px"}>{order.method},</Typography>
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
              {order.address}</Typography>

            <Typography color="textSecondary" fontSize="11px" >
              <span style={{ color: "#ef7d00", marginLeft: "10px" }}>Name : </span>
              {order.name}</Typography>

            <Typography color="textSecondary" fontSize="11px" >
              <span style={{ color: "#ef7d00", marginLeft: "10px" }}>Phone : </span>
              {order.phone}</Typography>

            <Typography color="#262624" fontSize="12px" marginTop={"7px"}>Payment Method</Typography>
            <Typography color="textSecondary" fontSize="11px" marginLeft={"10px"} marginTop={"3px"}>
              {order.payIcon} {order.paymentMethod}</Typography>

            <Box display="flex" justifyContent={"space-between"} alignItems="center">
              <Typography color="#262624" fontSize="12px" marginTop={"7px"}>Order detail</Typography>

              <Typography display={"flex"} sx={{ cursor: "pointer" }}
                onClick={() => handleOpen(order)}>

                <span class="icon-file" style={{ fontSize: "16px", color: "#ef7d00" }}></span>
                <Typography color="textSecondary" fontSize="10px">
                  <span style={{ borderBottom: "1px solid gray" }}>View</span>
                </Typography>
                <KeyboardArrowRightIcon sx={{ color: "#ef7d00", fontSize: "16px" }} />
              </Typography>
            </Box>
            <Divider sx={{ margin: "10px 0px" }} />
          </Box>

          <Box sx={{ padding: "0px 15px", }}>
            <Typography color="#2A2A28" fontSize="12px" >Total:
              <span style={{ color: "#ef7d00" }}>{order.total}</span>
              <span style={{ color: "#ef7d00", fontSize: "8px" }}> EGP</span></Typography>

            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} margin={"20px 0px 15px 0px"}>
              <Typography color="black" fontSize="12px" marginLeft={"15px"} ><span class="icon-close"></span> Cancel</Typography>
              <Button variant="contained" sx={{
                background: 'linear-gradient(to right, #fbc927, #f05a27)', padding: "5px 25px",
                color: "white", textTransform: "capitalize", borderRadius: "30px", fontSize: "12px"
              }}
              ><img src="/assets/balance.svg" alt="icon" style={{ width: "16px", height: "16px", marginRight:"5px" }} /> Cash Received</Button>
            </Box>
          </Box>
        </Card>
      ))}
    </>
  )
}
