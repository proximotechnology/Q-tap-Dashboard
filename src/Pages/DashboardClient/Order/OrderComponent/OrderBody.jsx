import React, { useEffect, useState } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import Header from './Header';
import OrderCard from './OrderCard';
import Footer from './Footer';
import RejectionModal from './RejectionModal';
import OrderDetails from './OrderDetails';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export const OrderBody = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [acceptedOrders, setAcceptedOrders] = useState([]);
    const [paidOrders, setPaidOrders] = useState([]);
    const [servedOrders, setServedOrders] = useState([]);
    const [doneOrders, setDoneOrders] = useState([]);
    const [closeOrders, setCloseOrders] = useState([]);
    const { t } = useTranslation()
    const theme = useTheme();
    // const [orders, setOrders] = useState([])
    const [orders, setOrders] = useState([
        {
            id: '3208',
            items: 4,
            order: "Order Placed ,Unpaid",
            state: "Rejected",
            pay: 'Unpaid',
            date: 'Monday, August 4, 2024 3:59 PM',
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
            dineMethod: {
                type: 'Dine in', table: "T02", area: 'B02', name: 'Yoyo',
                address: '21 Algaish St, Mansoura, Dakahlia', phone: '555-1234'
            },
            chef: 'afaf',
            cashier: "Ahmed",
            waiter: "Aya",
            preparingTime: 30,
            name: '',
            address: '',
            phone: '',
        },
        {
            id: '32348',
            items: 7,
            order: "Order Placed ,Unpaid",
            state: "Done",
            pay: 'paid',
            date: 'Sunday, August 4, 2024 3:59 PM',
            table: 'Table 02',
            total: 100.00,
            subTotal: 190.00,
            tax: 10.00,
            discount: 0.00,
            orderDetails: [
                { num: "5", item: 'cap cake', size: 'M', extras: ['Extra chocolate'], price: 50.00 },
                { num: "1", item: 'coffe', price: 20.00 },
            ],
            comment: "Don't add onions Please",
            paymentMethod: 'Cash',
            dineMethod: {
                type: 'Delivery', table: "T02", area: 'B02', name: 'John Doe',
                address: '21 Algaish St, Mansoura, Dakahlia', phone: '555-1234'
            },
            chef: 'mohamed',
            cashier: "Ahmed",
            waiter: "mostafa",
            preparingTime: 30,


        },
    ]);
   
    useEffect(() => {
        const client = JSON.parse(localStorage.getItem('allClientData'))
        const handleClient = async () => {
            try {
                const res = await axios.get('https://highleveltecknology.com/Qtap/api/get_new_orders',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('clientToken')}`
                        },

                    }
                )
                console.log('order res', res)

                // setOrders(res.data.new_orders)
            } catch (error) {
                console.log(error)
            }
        }
        handleClient()
    },[])
    
    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleAcceptOrder = () => {
        if (selectedOrder) {
            const updatedOrders = orders.map(order =>
                order.id === selectedOrder.id ? { ...order, status: 'Accepted' } : order
            );
            setOrders(updatedOrders);
            setAcceptedOrders([...acceptedOrders, selectedOrder.id]);
            setSelectedOrder({ ...selectedOrder, status: 'Accepted' });
        }
    };

    const handlePayment = () => {
        if (selectedOrder) {
            const updatedOrders = orders.map(order =>
                order.id === selectedOrder.id ? { ...order, status: 'Paid' } : order
            );
            setOrders(updatedOrders);
            setPaidOrders([...paidOrders, selectedOrder.id]);
            setSelectedOrder({ ...selectedOrder, status: 'Paid' });
        }
    };

    const handleServeOrder = () => {
        if (selectedOrder) {
            const updatedOrders = orders.map(order =>
                order.id === selectedOrder.id ? { ...order, status: 'Served' } : order
            );
            setOrders(updatedOrders);
            setServedOrders([...servedOrders, selectedOrder.id]);
            setSelectedOrder({ ...selectedOrder, status: 'Served' });
        }
    };

    const handleDoneOrder = () => {
        if (selectedOrder) {
            const updatedOrders = orders.map(order =>
                order.id === selectedOrder.id ? { ...order, status: 'Done' } : order
            );
            setOrders(updatedOrders);
            setDoneOrders([...doneOrders, selectedOrder.id]);
            setSelectedOrder({ ...selectedOrder, status: 'Done' });
        }
    };

    const handleCloseOrder = () => {
        if (selectedOrder) {
            const updatedOrders = orders.map(order =>
                order.id === selectedOrder.id ? { ...order, status: 'Closed' } : order
            );
            setOrders(updatedOrders);
            setCloseOrders([...closeOrders, selectedOrder.id]);
            setSelectedOrder({ ...selectedOrder, status: 'Closed' });
        }
    };

    const handleCloseOrderDetailsOnMobile = () => {
        setSelectedOrder(null)
    }

    return (
        <Box sx={{
            width: { xs: "100%", md: selectedOrder ? "78%" : "100%" }, transition: "width 0.3s ease-in-out",
            backgroundColor: "#EBEDF3", minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden'
        }}>
            <Header />

            <Grid container>
                <Grid container item xs={12} sx={{ display: "flex" }}>
                    <Grid item xs={12} md={4} sx={{ marginBottom: '20px' }}>
                        <Box
                            sx={{
                                position: "relative", color: "black",
                                backgroundColor: "white", width: "80%", zIndex: 1000, textTransform: "capitalize",
                                margin: "-20px 10% 5% 10%", height: "45px", borderBottom: "4px solid #ef7d00",
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center", fontSize: "14px",
                                fontFamily: "sans-serif",
                                "&.Mui-selected": {
                                    color: theme.palette.orangePrimary.main,
                                },
                                marginRight: "60px",
                                borderRadius: "5px",
                            }} >
                            {t("newOrder")}
                        </Box>


                        {orders.map((order) => (
                            !([...acceptedOrders, ...paidOrders, ...servedOrders, ...doneOrders, ...closeOrders].includes(order.id)) && (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    isSelected={selectedOrder?.id === order.id}
                                    onClick={() => handleOrderClick(order)}
                                    isAccepted={acceptedOrders.includes(order.id)}
                                    isPayment={paidOrders.includes(order.id)}
                                    isServed={servedOrders.includes(order.id)}
                                    isDone={doneOrders.includes(order.id)}
                                    isClose={closeOrders.includes(order.id)}
                                />
                            )
                        ))}

                    </Grid>

                    <Grid item xs={12} md={4} sx={{ marginBottom: '20px' }}>
                        <Box
                            sx={{
                                position: "relative", color: "black",
                                backgroundColor: "white", width: "80%", zIndex: 1000, textTransform: "capitalize",
                                margin: "-20px 10% 5% 10%", height: "45px", borderBottom: "4px solid #ef7d00",
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center", fontSize: "14px",
                                fontFamily: "sans-serif",
                                "&.Mui-selected": {
                                    color: theme.palette.orangePrimary.main,
                                },
                                marginRight: "60px",
                                borderRadius: "5px",
                            }} >
                            {t("accepted")}
                        </Box>
                        {orders.map((order) => (
                            ([...acceptedOrders, ...paidOrders, ...servedOrders, ...doneOrders].includes(order.id)) &&
                            (!(closeOrders.includes(order.id)))
                            &&
                            (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    isSelected={selectedOrder?.id === order.id}
                                    onClick={() => handleOrderClick(order)}
                                    isAccepted={acceptedOrders.includes(order.id)}
                                    isPayment={paidOrders.includes(order.id)}
                                    isServed={servedOrders.includes(order.id)}
                                    isDone={doneOrders.includes(order.id)}
                                    isClose={closeOrders.includes(order.id)}
                                />
                            )
                        ))}
                    </Grid>

                    <Grid item xs={12} md={4} sx={{ marginBottom: '20px' }}>
                        <Box
                            sx={{
                                position: "relative", color: "black",
                                backgroundColor: "white", width: "80%", zIndex: 1000, textTransform: "capitalize",
                                margin: "-20px 10% 5% 10%", height: "45px", borderBottom: "4px solid #ef7d00",
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center", fontSize: "14px",
                                fontFamily: "sans-serif",
                                "&.Mui-selected": {
                                    color: theme.palette.orangePrimary.main,
                                },
                                marginRight: "60px",
                                borderRadius: "5px",
                            }} >
                            {t("done")}
                        </Box>
                        {orders.map((order) => (
                            ([...closeOrders].includes(order.id)) && (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    isSelected={selectedOrder?.id === order.id}
                                    onClick={() => handleOrderClick(order)}
                                    isAccepted={acceptedOrders.includes(order.id)}
                                    isPayment={paidOrders.includes(order.id)}
                                    isServed={servedOrders.includes(order.id)}
                                    isDone={doneOrders.includes(order.id)}
                                    isClose={closeOrders.includes(order.id)}
                                />
                            )
                        ))}
                    </Grid>
                </Grid>

                {selectedOrder && (
                    <Box   >
                        <Box>
                            <OrderDetails
                                order={selectedOrder}
                                onReject={handleModalOpen}
                                onAccept={handleAcceptOrder}
                                onPayment={handlePayment}
                                onServe={handleServeOrder}
                                onDone={handleDoneOrder}
                                onClose={handleCloseOrder}
                                isAccepted={acceptedOrders.includes(selectedOrder.id)}
                                isPayment={paidOrders.includes(selectedOrder.id)}
                                isServed={servedOrders.includes(selectedOrder.id)}
                                isDone={doneOrders.includes(selectedOrder.id)}
                                isClose={closeOrders.includes(selectedOrder.id)}
                                closeDetails={handleCloseOrderDetailsOnMobile}
                            />
                        </Box>
                    </Box>
                )}
            </Grid>

            <Box sx={{ marginTop:'auto' }}>
                <Footer selectedOrder={selectedOrder}
                    isAccepted={selectedOrder && acceptedOrders.includes(selectedOrder.id)}
                    isServed={selectedOrder && servedOrders.includes(selectedOrder.id)}
                    isDone={selectedOrder && doneOrders.includes(selectedOrder.id)}
                    isClose={selectedOrder && closeOrders.includes(selectedOrder.id)}
                />
            </Box>
            <RejectionModal open={modalOpen} onClose={handleModalClose} />
        </Box>
    );
};

export default OrderBody;

const orderEndPoint = {
    chef: {
        fetch: 'get_new_orders',
        action: {
            accept: 'accept_order',//has body 
            prepared: 'order_prepared'
        }
    },
    cashier: {
        fetch: 'get_accepted_orders',
        action: {
            receivePayment: 'payment_received',//has body 
        }
    },
    waiter: {
        fetch: 'get_prepared_orders',
        action: {
            receivePayment: 'order_served',//has body 
        }
    },
    delivery: {
        fetch: {
            getPerepared: 'get_prepared_orders_delivery',
            delivered: 'Daily_Delivered_Orders/',// take param -> /:id
            totalDelivered: 'Total_Delivered_Orders/',// take param -> /:id
            canceledOrder: 'Daily_Cancaled_Orders/8',// take param -> /:id
        },
        action: {
            orederDelivered: 'order_delivered',//has body 
            changeStatus: 'update_delivery_status',//has body 
        }
    }
}