import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './OrderSuccess.css';
import axios from 'axios';

const OrderSuccess = () => {
    const location = useLocation();
    const [orderDetails, setOrderDetails] = useState(null);
    const orderId = new URLSearchParams(location.search).get('orderId');

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/order/${orderId}`);
                if (response.data.success) {
                    setOrderDetails(response.data.data);
                } else {
                    console.error("Failed to fetch order details");
                }
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="order-success">
            <h1>Order Placed Successfully!</h1>
            <h2>Order ID: {orderDetails._id}</h2>
            <div className="order-details">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> {orderDetails.customerInfo.firstName} {orderDetails.customerInfo.lastName}</p>
                <p><strong>Email:</strong> {orderDetails.customerInfo.email}</p>
                <p><strong>Phone:</strong> {orderDetails.customerInfo.phone}</p>

                <h3>Order Items</h3>
                <ul>
                    {orderDetails.items.map(item => (
                        <li key={item._id}>
                            {item.name} - Quantity: {item.quantity}
                        </li>
                    ))}
                </ul>

                <h3>Order Summary</h3>
                <p><strong>Total Amount:</strong> ${orderDetails.amount}</p>
                <p><strong>Payment Status:</strong> {orderDetails.payment ? 'Paid' : 'Pending'}</p>
            </div>
        </div>
    );
};

export default OrderSuccess;
