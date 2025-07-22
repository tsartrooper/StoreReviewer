import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StoreCard from '../components/StoreCard.jsx';
import useAuth from '../hooks/useAuth.js';
import "../index.css";

export default function UserDashBoard() {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {jwtToken} = useAuth();

    useEffect(() => {
        const fetchStores = async () => {
        try {
            const res = await axios.get(
                'http://localhost:5000/api/v1/store/',
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
            },
            });
            if (res.data.success) {
            setStores(res.data.data);
            } else {
            setError('Failed to fetch store data');
            }
        } catch (err) {
            console.error('Error fetching stores:', err);
            setError('Error fetching store data');
        } finally {
            setLoading(false);
        }
        };

        fetchStores();
    }, [jwtToken]);

    return (
        <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">User Dashboard</h1>

        {loading && <p className="text-gray-600">Loading stores...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && stores.length === 0 && (
            <p className="text-gray-500">No stores found.</p>
        )}

        {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
        ))}
        </div>
    );
}
