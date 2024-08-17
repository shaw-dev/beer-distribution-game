// src/pages/Retailer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Retailer = () => {
    const [inventory, setInventory] = useState(50);
    const [ordered, setOrdered] = useState(0);
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
        setOrdered(prev => prev + newOrder);
        setInventory(prev => prev - newOrder);
        setNewOrder(0);
    };

    return (
        <div style={styles.container}>
            <h1>Retailer Dashboard</h1>
            <div style={styles.infoBox}>
                <p><strong>Inventory:</strong> {inventory}</p>
                <p><strong>Ordered:</strong> {ordered}</p>
                <p><strong>Shipped:</strong> {shipped}</p>
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
                    Place Order
                </button>
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
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
    }
};

export default Retailer;
