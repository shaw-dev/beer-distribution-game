// src/pages/Wholesaler.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wholesaler = () => {
    const [inventory, setInventory] = useState(100);
    const [orders, setOrders] = useState([]);
    const [shipped, setShipped] = useState(0);
    const [newOrder, setNewOrder] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/game');
            setInventory(response.data.retailer.inventory);
        };
        fetchData();
    }, []);

    const handleOrderChange = (e) => {
        setNewOrder(Number(e.target.value));
    };

    const handleOrder = () => {
        // Handle placing an order
        setOrders(prev => [...prev, newOrder]);
        setInventory(prev => prev - newOrder);
        setShipped(prev => prev + newOrder);
        setNewOrder(0);
    };

    return (
        <div style={styles.container}>
            <h1>Wholesaler Dashboard</h1>
            <div style={styles.infoBox}>
                <p><strong>Inventory:</strong> {inventory}</p>
                <p><strong>Shipped:</strong> {shipped}</p>
                <p><strong>Pending Orders:</strong> {orders.length}</p>
            </div>
            <div style={styles.inputBox}>
                <input 
                    type="number"
                    value={newOrder}
                    onChange={handleOrderChange}
                    placeholder="Order Quantity"
                    style={styles.input}
                />
                <button onClick={handleOrder} style={styles.button}>
                    Fulfill Order
                </button>
            </div>
            <div style={styles.orderList}>
                <h3>Order List</h3>
                <ul>
                    {orders.map((order, index) => (
                        <li key={index}>Order {index + 1}: {order} units</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center'
    },
    infoBox: {
        marginBottom: '20px'
    },
    inputBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        padding: '10px',
        marginRight: '10px',
        width: '150px'
    },
    button: {
        padding: '10px 20px',
        cursor: 'pointer',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
    },
    orderList: {
        marginTop: '20px',
        textAlign: 'left'
    }
};

export default Wholesaler;
