import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { DeliveredHeader } from './DeliveredHeader'
import { DeliveredFooter } from './DeliveredFooter'
import { DeliveredBody } from './DeliveredBody/DeliveredBody'
import axios from 'axios'
import { toast } from 'react-toastify'
import { parseResponseOrderItem } from '../Order/OrderComponent/OrderBody'
import { DeliveredDetails } from './DeliveredBody/DeliveredDetails'
import { BASE_URL } from '../../../utils/helperFunction'

export const Delivered = () => {
    const [preparedOrders, setPreparedOrders] = useState([])
    const [canceledOrders, setCanceledOrders] = useState(0)
    const [deliveredOrders, setDeliveredOrders] = useState(0)
    const [totalDeliveredOrders, setTotalDeliveredOrders] = useState(0)

    const [selectedOrder, setSelectedOrder] = useState(null)
    const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)


    const delivery = {
        fetch: {
            getPerepared: 'get_prepared_orders_delivery/',
            delivered: 'Daily_Delivered_Orders/',// take param -> /:id
            totalDelivered: 'Total_Delivered_Orders/',// take param -> /:id
            canceledOrder: 'Daily_Cancaled_Orders/',// take param -> /:id
        },
        action: {
            orederDelivered: 'order_delivered',//has body 
            changeStatus: 'update_delivery_status',//has body 
        }
    }

    const getDeliveryData = async () => {
        const loginclient = JSON.parse(localStorage.getItem('UserData'));

        if (!loginclient) {
            console.log('No login');
            toast.error("User not logged in");
            return;
        }

        const deliveryId = loginclient?.user?.id;
        const token = localStorage.getItem('Token');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        try {
            
            const prepared = await axios.get(`${BASE_URL}get_prepared_orders_delivery`, { headers })
            const canceledOrder = await axios.get(`${BASE_URL}${delivery.fetch.canceledOrder}${deliveryId}`, { headers })
            const delivered = await axios.get(`${BASE_URL}${delivery.fetch.delivered}${deliveryId}`, { headers })
            const totalDelivered = await axios.get(`${BASE_URL}${delivery.fetch.totalDelivered}${deliveryId}`, { headers })

            console.log('Prepared Orders:', prepared.data);//prepared_orders[]
            console.log('Canceled Orders:', canceledOrder.data);//total_delivered_orders
            console.log('Delivered Orders:', delivered.data);//Total_Delivered_Orders
            console.log('Total Delivered Orders:', totalDelivered.data); //total_delivered_orders

            const parsedOrders = prepared.data.prepared_orders?.map(item=>parseResponseOrderItem(item)) 
            console.log('Prepared Orders after parsed', parsedOrders);

            setPreparedOrders(parsedOrders)
            setCanceledOrders(canceledOrder.data.total_Cancaled_delivered_orders)
            setDeliveredOrders( delivered.data.total_delivered_orders)
            setTotalDeliveredOrders(totalDelivered.data.Total_Delivered_Orders)

            // You can return or setState if needed here
        } catch (error) {
            console.error('Error fetching delivery data:', error);
            toast.error('Failed to fetch delivery data');
        }
    };

    useEffect(() => {
        getDeliveryData()
    }, [])

    return (

        <Box sx={{ backgroundColor: "#EBEDF3", position: 'relative' }}>
            <DeliveredHeader totalDeliveredOrders={totalDeliveredOrders} canceledOrders={canceledOrders}  deliveredOrders={deliveredOrders}/>
            <DeliveredBody preparedOrders={preparedOrders} setSelectedOrder={setSelectedOrder}   setIsOrderDetailsOpen={setIsOrderDetailsOpen} />
            <DeliveredFooter />
            <DeliveredDetails isOrderDetailsOpen={isOrderDetailsOpen} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder}  setIsOrderDetailsOpen={setIsOrderDetailsOpen}  />

        </Box>
    )
}
