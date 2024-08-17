// src/pages/Distributor.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Distributor = () => {
    const [inventory, setInventory] = useState(200);
    const [orders, setOrders] = useState([]);
    const [shipped, setShipped] = useState(0);
    const [incomingStock, setIncomingStock] = useState(0);
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

    const handleIncomingStock = (e) => {
        setIncomingStock(Number(e.target.value));
    };

    const receiveStock = () => {
        setInventory(prev => prev + incomingStock);
        setIncomingStock(0);
    };

    return (
        <div style={styles.container}>
            <h1>Distributor Dashboard</h1>
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
            <div style={styles.incomingStockBox}>
                <h3>Incoming Stock</h3>
                <input 
                    type="number"
                    value={incomingStock}
                    onChange={handleIncomingStock}
                    placeholder="Incoming Stock"
                    style={styles.input}
                />
                <button onClick={receiveStock} style={styles.button}>
                    Receive Stock
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
        backgroundColor: '#ffc107',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
    },
    incomingStockBox: {
        marginTop: '20px'
    },
    orderList: {
        marginTop: '20px',
        textAlign: 'left'
    }
};

export default Distributor;
