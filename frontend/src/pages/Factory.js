// src/pages/Factory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Factory = () => {
    const [inventory, setInventory] = useState(300);
    const [production, setProduction] = useState(0);
    const [shipped, setShipped] = useState(0);
    const [newProduction, setNewProduction] = useState(0);
    const [outgoingStock, setOutgoingStock] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/game');
            setInventory(response.data.retailer.inventory);
        };
        fetchData();
    }, []);

    const handleProductionChange = (e) => {
        setNewProduction(Number(e.target.value));
    };

    const handleOutgoingStockChange = (e) => {
        setOutgoingStock(Number(e.target.value));
    };

    const produceGoods = () => {
        setProduction(prev => prev + newProduction);
        setInventory(prev => prev + newProduction);
        setNewProduction(0);
    };

    const shipGoods = () => {
        setInventory(prev => prev - outgoingStock);
        setShipped(prev => prev + outgoingStock);
        setOutgoingStock(0);
    };

    return (
        <div style={styles.container}>
            <h1>Factory Dashboard</h1>
            <div style={styles.infoBox}>
                <p><strong>Inventory:</strong> {inventory}</p>
                <p><strong>Production:</strong> {production}</p>
                <p><strong>Shipped:</strong> {shipped}</p>
            </div>
            <div style={styles.inputBox}>
                <input 
                    type="number"
                    value={newProduction}
                    onChange={handleProductionChange}
                    placeholder="Produce Goods"
                    style={styles.input}
                />
                <button onClick={produceGoods} style={styles.button}>
                    Produce
                </button>
            </div>
            <div style={styles.outgoingStockBox}>
                <h3>Ship Goods</h3>
                <input 
                    type="number"
                    value={outgoingStock}
                    onChange={handleOutgoingStockChange}
                    placeholder="Outgoing Stock"
                    style={styles.input}
                />
                <button onClick={shipGoods} style={styles.button}>
                    Ship
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
        backgroundColor: '#6f42c1',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
    },
    outgoingStockBox: {
        marginTop: '20px'
    }
};

export default Factory;
