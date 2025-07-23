import React from "react";

function Dashboard({ orders }) {
  return (
    <div className="dashboard">
      <h2>Orders Dashboard</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <strong>{order.name}</strong> ordered <em>{order.item}</em>
              <ul>
                {order.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
