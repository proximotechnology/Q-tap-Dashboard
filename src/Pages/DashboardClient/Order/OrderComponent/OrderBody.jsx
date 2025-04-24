import React, { useEffect, useState } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import Header from './Header';
import OrderCard from './OrderCard';
import Footer from './Footer';
import RejectionModal from './RejectionModal';
import OrderDetails from './OrderDetails';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import OrderDetailsNew from './OrderDetailsNew';
import Pusher from 'pusher-js';
import { toast } from 'react-toastify';



export const parseResponseOrderItem = (item, phase = '') => {
    if (!item) return null;
    
    item.meal_id = (typeof item.meal_id === "string" ? JSON.parse(item.meal_id) : item.meal_id)
    item.quantity = (typeof item.quantity === "string" ? JSON.parse(item.quantity) : item.quantity)
    item.size = (typeof item.size === "string" ? JSON.parse(item.size) : item.size)
    item.discount_code = (typeof item.discount_code === "string" ? JSON.parse(item.discount_code) : item.discount_code)
    item.extras = (typeof item.extras === "string" ? JSON.parse(item.extras) : item.extras)
    item.variants = (typeof item.variants === "string" ? JSON.parse(item.variants) : item.variants)
    item.phase = phase;

    
    return item
}

export const OrderBody = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);// used to show details panel
    const [modalOpen, setModalOpen] = useState(false); // used to show reject panel
    const [orders, setOrders] = useState([])
    const [client, setClient] = useState(null)


    const { t } = useTranslation()
    const theme = useTheme();



    // const [orders, setOrders] = useState([
    //     {
    //         id: '3208',
    //         items: 4,
    //         order: "Order Placed ,Unpaid",
    //         state: "Rejected",
    //         pay: 'Unpaid',
    //         date: 'Monday, August 4, 2024 3:59 PM',
    //         table: 'Table 02',
    //         total: 200.00,
    //         subTotal: 190.00,
    //         tax: 10.00,
    //         discount: 0.00,
    //         orderDetails: [
    //             { num: "2", item: 'Negrsco', size: 'M', extras: ['Extra sauce'], price: 50.00 },
    //             { num: "1", item: 'Tea', price: 10.00 },
    //         ],
    //         comment: "Don't add onions Please",
    //         paymentMethod: 'Cash',
    //         dineMethod: {
    //             type: 'Dine in', table: "T02", area: 'B02', name: 'Yoyo',
    //             address: '21 Algaish St, Mansoura, Dakahlia', phone: '555-1234'
    //         },
    //         chef: 'afaf',
    //         cashier: "Ahmed",
    //         waiter: "Aya",
    //         preparingTime: 30,
    //         name: '',
    //         address: '',
    //         phone: '',
    //     },
    //     {
    //         id: '32348',
    //         items: 7,
    //         order: "Order Placed ,Unpaid",
    //         state: "Done",
    //         pay: 'paid',
    //         date: 'Sunday, August 4, 2024 3:59 PM',
    //         table: 'Table 02',
    //         total: 100.00,
    //         subTotal: 190.00,
    //         tax: 10.00,
    //         discount: 0.00,
    //         orderDetails: [
    //             { num: "5", item: 'cap cake', size: 'M', extras: ['Extra chocolate'], price: 50.00 },
    //             { num: "1", item: 'coffe', price: 20.00 },
    //         ],
    //         comment: "Don't add onions Please",
    //         paymentMethod: 'Cash',
    //         dineMethod: {
    //             type: 'Delivery', table: "T02", area: 'B02', name: 'John Doe',
    //             address: '21 Algaish St, Mansoura, Dakahlia', phone: '555-1234'
    //         },
    //         chef: 'mohamed',
    //         cashier: "Ahmed",
    //         waiter: "mostafa",
    //         preparingTime: 30,


    //     },
    // ]);


    useEffect(() => {
        const loginclient = JSON.parse(localStorage.getItem('allClientData'))
        setClient(loginclient)
        console.log("loginClient ", loginclient)
        const handleClient = async () => {
            try {

                const res = await axios.get(`${orderEndPoint.BASE_URL}${orderEndPoint[loginclient.user.role].fetch[0]}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('clientToken')}`
                        },

                    }
                )

                console.log('role : ', loginclient.user.role, ' order res : ', res)

                // each request has its response data :
                ///-------------------------------------------
                // chef data.new_orders
                // cashier data.accepted_orders
                // admin data.served_orders
                // admin data.delivery_riders\
                //waiter data.prepared_orders
                let orders = []

                if (loginclient.user.role === 'chef') {

                    orders = res.data.new_orders.map((item) => parseResponseOrderItem(item, orderPhaseType.ACCEPTING))
                    console.log("parde data ", orders)
                    const savedOrder = localStorage.getItem('chefAcceptedOrder')
                    const parsedSavedOrder = savedOrder ? JSON.parse(savedOrder) : []
                    setOrders([...orders, ...parsedSavedOrder])

                } else if (loginclient.user.role === 'cashier') {

                    orders = res.data.accepted_orders.map((item) => item ? { ...parseResponseOrderItem(item, orderPhaseType.PAYING), chef: item.user } : undefined)
                    orders = orders.filter(order => order !== undefined);
                    console.log("parde data ", orders)
                    setOrders(orders)

                } else if (loginclient.user.role === 'waiter') {


                    orders = res.data.prepared_orders.map((item) => item ? { ...parseResponseOrderItem(item, orderPhaseType.SERVRING) } : undefined)
                    orders = orders.filter(order => order !== undefined);
                    console.log("waiter data ", orders)
                    setOrders(orders)

                } else if (loginclient.user.role === 'admin') {
                    orders = res.data.served_orders.map((item) => item ? { ...parseResponseOrderItem(item, orderPhaseType.DONING) } : undefined)
                    orders = orders.filter(order => order !== undefined);
                    console.log("admin data ", orders)
                    setOrders(orders)
                }

            } catch (error) {

                console.log(error)

            }
        }

        handleClient()

    }, [])
    useEffect(() => {
        const pusher = new Pusher('63b495891d2c3cff9d36', {
            cluster: 'eu',
        });

        const channel = pusher.subscribe('notify-channel');
        channel.bind('form-submitted', function (data) {
            // ✅ Show toast or handle state
            // console.log("📢 Received from Pusher:", data);

            toast.info(`📢 pusher ${data?.message?.title}: ${data?.message?.content}`);
            console.log('data app busher', data)
            // You can also store in state if you want to display in Content
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    // Function to update the phase of a specific order
    const updateOrderPhase = (orderId, newPhase, newOrder = null) => {
        console.log('updateOrderPhase functino ', orderId, " = ", newPhase, " = ", newOrder)
        setOrders(prevOrders =>
            prevOrders.map(order => {
                console.log('updateOrderPhase functino order ', order)
                if (newOrder) {
                    return order?.id === orderId ? { ...newOrder, phase: newPhase } : order;
                }
                return order?.id === orderId ? { ...order, phase: newPhase } : order;

            }

            )
        );
    };

    // Function to remove a specific order
    const removeOrder = (orderId) => {
        setOrders(prevOrders =>
            prevOrders.filter(order => order.id !== orderId)
        );
    };

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
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
                            order?.phase === orderPhaseType.ACCEPTING && (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    isSelected={selectedOrder?.id === order.id}
                                    onClick={() => handleOrderClick(order)}

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
                            (order?.phase === orderPhaseType.PAYING || order?.phase === orderPhaseType.PREPAREING || order?.phase === orderPhaseType.SERVRING || order?.phase === orderPhaseType.DONING)
                            && (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    isSelected={selectedOrder?.id === order.id}
                                    onClick={() => handleOrderClick(order)}
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
                        {orders.map((order) => order?.phase === orderPhaseType.CLOSING && (
                            (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    isSelected={selectedOrder?.id === order.id}
                                    onClick={() => handleOrderClick(order)}

                                />
                            )
                        ))}
                    </Grid>
                </Grid>

                {selectedOrder && (
                    <Box   >
                        <Box>
                            {/* <OrderDetails
                                order={selectedOrder}
                                onReject={handleModalOpen}
                                closeDetails={handleCloseOrderDetailsOnMobile}// show x button on mobile to close this details panel
                                orderPhaseType={orderPhase}
                            /> */}
                            <OrderDetailsNew
                                order={selectedOrder}
                                onReject={handleModalOpen}
                                closeDetails={handleCloseOrderDetailsOnMobile}// show x button on mobile to close this details panel
                                // order control function
                                updateOrderPhase={updateOrderPhase}
                                removeOrder={removeOrder}
                                loginUser={client}
                            />
                        </Box>
                    </Box>
                )}
            </Grid>

            <Box sx={{ marginTop: 'auto' }}>
                <Footer selectedOrder={selectedOrder} />
            </Box>
            <Box sx={{ height: '40px' }}>

            </Box>
            <RejectionModal open={modalOpen} onClose={handleModalClose} />
        </Box>
    );
};

export default OrderBody;

export const orderEndPoint = {
    BASE_URL: 'https://highleveltecknology.com/Qtap/api/',
    chef: {
        fetch: ['get_new_orders'],
        action: {
            accept: 'accept_order',//has body 
            prepared: 'order_prepared'
        }
    },
    cashier: {
        fetch: ['get_accepted_orders'],
        action: {
            receivePayment: 'payment_received',//has body 
        }
    },
    waiter: {
        fetch: ['get_prepared_orders'],
        action: {
            serve: 'order_served',//has body 
        }
    },
    admin: {
        fetch: ['get_served_orders', 'get_delivery_available'],
        action: {
            orderDone: 'order_done',
            chooseDelivery: 'choose_delivery',
            orders: 'orders'
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

export const orderPhaseType = {
    ACCEPTING: 'accept',//accept the order',
    PAYING: 'pay',//pay the order',
    PREPAREING: 'perpare',//prepare the order',
    SERVRING: 'served',//order ready to serve',
    DONING: 'done',//order served'
    CLOSING: 'close'
}