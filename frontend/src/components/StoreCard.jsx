import React from 'react';
import PropTypes from 'prop-types';
import '../index.css';


export default function StoreCard({ store }) {
    return (
        <div className="bg-white shadow-md rounded-2xl p-4 mb-4 border border-gray-200 hover:shadow-lg transition duration-300">
        <h2 className="text-xl font-semibold text-gray-800">{store.name}</h2>
        <p className="text-sm text-gray-600 mb-1">
            📧 <a href={`mailto:${store.email}`} className="text-blue-600 hover:underline">{store.email}</a>
        </p>
        <p className="text-sm text-gray-600 mb-2">📍 {store.address}</p>

        {store.averageRating !== undefined && (
            <div className="text-sm text-yellow-600 font-medium">
            ⭐ {store.averageRating} ({store.totalRatings} rating{store.totalRatings !== 1 ? 's' : ''})
            </div>
        )}
        </div>)
}

StoreCard.propTypes = {
    store: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        averageRating: PropTypes.number,
        totalRatings: PropTypes.number,
    }).isRequired,
};
