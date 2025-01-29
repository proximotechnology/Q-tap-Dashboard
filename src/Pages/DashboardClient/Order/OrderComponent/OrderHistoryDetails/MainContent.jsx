import React, { forwardRef } from 'react';
import { Grid, Typography, Button, Divider } from '@mui/material';
import { Box } from '@mui/system';


export const orders = [
    {
        id: '3208',
        items: 4,
        state: "Rejected",
        status: 'Unpaid',
        date: 'Sunday, August 4, 2024 3:59 PM',
        table: 'Table 02',
        total: 200.00,
        subTotal: 190.00,
        tax: 10.00,
        discount: 0.00,
        orderDetails: [
            { num: "2", item: 'Negrsco', size: 'M', extras: ['Extra sauce'], price: 50.00 },
            { num: "1", item: 'Tea', price: 10.00 },
        ],
        comment: "Don't add onions Please",
        paymentMethod: 'Cash',
        dineMethod: { type: 'Dine in', table: "T02", area: 'B02' },
        chef: 'afaf',
        cashier: "Ahmed",
        waiter: "Aya",
        preparingTime: 30,
        address: "10 Algaish St, tanta, Dakahlia, EG",
        phone: "+20101234567",
        names: "mohamed ahmed",
    },
    {
        id: '3228',
        items: 7,
        state: "Done",
        status: 'paid',
        date: 'Sunday, August 4, 2024 3:59 PM',
        table: 'Table 02',
        total: 200.00,
        subTotal: 190.00,
        tax: 10.00,
        discount: 0.00,
        orderDetails: [
            { num: "2", item: 'Negrsco', size: 'M', extras: ['Extra sauce'], price: 10.00 },
            { num: "1", item: 'Tea', price: 10.00 },
        ],
        comment: "Don't add onions Please",
        paymentMethod: 'Cash',
        dineMethod: { type: 'Dine in', table: "T02", area: 'B02' },
        chef: 'afaf',
        cashier: "Ahmed",
        waiter: "Aya",
        preparingTime: 30,
        address: "20 Algaish St, Mansoura, Dakahlia, EG",
        phone: "+20101234567",
        names: "afaf nossier",

    },
];

const MainContent =forwardRef(( ) => {
 
    const order = orders[0];

    return (
        <Grid container spacing={2} >
        <Grid item xs={4}>
            <OrderDetails order={order} />
        </Grid>

        <Divider orientation="vertical" flexItem sx={{ color: 'gray', height: "250px" }} />

        <Grid item xs={4}>
            <CommentSection order={order} />
        </Grid>

        <Divider orientation="vertical" flexItem sx={{ color: 'gray', height: "250px" }} />

        <Grid item xs={3}>
            <ChefSection order={order} />
        </Grid>
    </Grid>
);
});

const OrderDetails = ({ order }) => (
    <div>
        <Typography variant="h6" sx={{ fontSize: "12px" }}>Order details</Typography>
        <Box display={"flex"} justifyContent={"center"}>
            <Box width={"70%"}>
                {order.orderDetails.map((detail, index) => (
                    <Typography key={index} variant="body2" sx={{ fontSize: "11px", color: "#9d9d9c" }}>
                        {detail.num} x {detail.item} {detail.size && `(size: ${detail.size})`}
                        {detail.extras && ` + ${detail.extras.join(', ')}`}
                    </Typography>
                ))}
            </Box>
            <Box
                sx={{
                    height: "40px",
                    borderRight: "1px solid #ef7d00",
                    margin: "-3px 6px",
                }}
            />
            <Box width={"30%"}>
                {order.orderDetails.map((detail, index) => (
                    <Typography key={index} variant="body2" sx={{ fontSize: "11px", color: "#9d9d9c" }}>
                        {detail.price} EGP
                    </Typography>
                ))}
            </Box>
        </Box>
    </div>
);

const CommentSection = ({ order }) => (
    <div>
        <Box sx={{ marginBottom: "6px" }}>
            <Typography variant="h6" sx={{ fontSize: "12px" }}>Comment</Typography>
            <Typography variant="body2" sx={{ fontSize: "11px", color: "gray" }}>{order.comment}</Typography>
        </Box>

        <Box sx={{ marginBottom: "6px" }}>
            <Typography variant="h6" sx={{ fontSize: "12px" }}>Payment Method</Typography>
            <Typography variant="body2" sx={{ fontSize: "11px", color: "gray" }}>{order.paymentMethod}</Typography>
        </Box>

        <Box sx={{ marginBottom: "6px" }}>
            <Typography variant="h6" sx={{ fontSize: "12px" }}>Dine Method</Typography>
            <Typography variant="body2" sx={{ fontSize: "11px", color: "gray" }}>{order.dineMethod.type}</Typography>
        </Box>

        <Typography variant="body2" sx={{ fontSize: "11px", color: "gray", padding: "3px" }}>
            <span style={{ color: "#E57C00" }}>Address :</span>{order.address}
        </Typography>

        <Typography variant="body2" sx={{ fontSize: "11px", color: "gray", padding: "3px" }}>
            <Box component="span" sx={{ color: "#E57C00" }}>Name: </Box>{order.names}
        </Typography>

        <Typography variant="body2" sx={{ fontSize: "11px", color: "gray", padding: "3px" }}>
            <Box component="span" sx={{ color: "#E57C00" }}>Phone: </Box>{order.phone}
        </Typography>


        <Button variant="contained"
            sx={{
                fontSize: "11px", backgroundColor: "#222240", borderRadius: "10px",
                textTransform: "capitalize", marginRight: "10px", marginTop: "20px",
                '&:hover': {
                    backgroundColor: '#222240',
                }
            }} startIcon={
                <span class="icon-map-1" style={{}}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span></span>
            }>
            Location
        </Button>


        <Button variant="contained"
            sx={{
                fontSize: "12px", backgroundColor: "#ef7d00", borderRadius: "10px",
                textTransform: "capitalize", marginTop: "20px",
                '&:hover': {
                    backgroundColor: '#ef7d00',
                }
            }} startIcon={
                <span class="icon-send"  ></span>
            }>
        </Button>
    </div>
);

const ChefSection = ({ order,}) => (
    <Grid container spacing={2}  >
        <Grid item xs={5}>

            <Typography variant="subtitle1" fontSize="11px" paddingTop="6px" >
                <span class="icon-chef" style={{ fontSize: "14px", marginRight: "6px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
                Chef
            </Typography>
            <Typography variant="body2" color="textSecondary" fontSize={"10px"} marginLeft={"10px"}>Chef Name</Typography>
        </Grid>


        <Grid item xs={7}>
            <Typography variant="subtitle1" fontSize="11px" paddingTop="6px" >
                <span class="icon-circular-clock" style={{ fontSize: "14px", marginRight: "6px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
                Preparing Time</Typography>
            <Typography variant="body2" color="textSecondary" fontSize={"10px"} marginLeft={"10px"}>30
                <span style={{ marginLeft: "5px" }}>Min</span>
            </Typography>
        </Grid>

        <Grid item xs={5} sx={{ marginTop: "-10px" }}>
            <Typography variant="subtitle1" fontSize="11px" paddingTop="6px" >
                <span class="icon-cashier" style={{ fontSize: "14px", marginRight: "6px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
                Cashier
            </Typography>
            <Typography variant="body2" color="textSecondary" fontSize={"10px"} marginLeft={"10px"}>Cashier Name</Typography>
        </Grid>

        <Grid item xs={7} sx={{ marginTop: "-10px" }}>
            <Typography variant="subtitle1" fontSize="11px" paddingTop="6px" >
                <span class="icon-waiter-1" style={{ fontSize: "14px", marginRight: "6px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span></span>
                Waiter
            </Typography>
            <Typography variant="body2" color="textSecondary" fontSize={"10px"} marginLeft={"10px"}>Waiter Name</Typography>
        </Grid>

        <Divider sx={{ color: 'gray', marginTop: '10px', width: "90%", marginLeft: "15px" }} />
        <Grid item xs={12}>
            <Typography variant="body2" fontSize="10px" padding="0px 3px">
                <span style={{ color: '#9d9d9c', fontSize: "10px" }}>Sub Total:</span> {order.subTotal} EGP
            </Typography>

            <Typography variant="body2" fontSize="10px" padding="0px 3px">
                <span style={{ color: '#9d9d9c', fontSize: "10px" }}>Tax:</span> {order.tax} EGP
            </Typography>

            <Typography variant="body2" fontSize="10px" padding="0px 3px">
                <span style={{ color: '#9d9d9c', fontSize: "10px" }}>Discount:</span> - {order.discount} EGP
            </Typography>

            <Typography variant="h6" sx={{ marginTop: '8px', fontSize: "10px" }}>
                <span style={{ color: '#9d9d9c' }}>TOTAL:</span> {order.total} EGP
            </Typography>
        </Grid>
    </Grid>
);

export default MainContent;
