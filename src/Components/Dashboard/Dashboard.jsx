import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>Total Recipes</h3>
                    <p>25</p>
                </div>
                <div className="stat-card">
                    <h3>Favorites</h3>
                    <p>8</p>
                </div>
                <div className="stat-card">
                    <h3>Categories</h3>
                    <p>6</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;