import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/auth"; // Import the selector from your auth slice

import "../styles/account.css"; // Create a separate CSS file for styling

const AccountPage = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [activeTab, setActiveTab] = useState("account"); // State to track the active tab

    if (!currentUser) {
        return <div>Please log in to view your account details.</div>;
    }

    const joinedDate = currentUser.metadata
        ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
        : "Date not available";

    const renderContent = () => {
        switch (activeTab) {
            case "account":
                return (
                    <>
                        <div className="account-header">
                            <img
                                className="account-background"
                                src="/images/account-background.jpg"
                                alt="Account Background" />
                            <div className="account-avatar">
                                <img
                                    className="account-avatar-img"
                                    src={currentUser.photoURL || "/images/banner-girl1.png"}
                                    alt="User Avatar" />
                            </div>

                            <button className="edit-account-button">Edit Account</button>
                        </div>
                        <div className="account-details">
                            <h2>{currentUser.displayName}</h2>
                            <p><strong>Email</strong></p>
                            <p>{currentUser.email}</p>
                            <p><strong>Address</strong></p>
                            <p>{currentUser.address || "Address not set"}</p>
                            <p><strong>Mobile</strong></p>
                            <p>{currentUser.mobile || "Mobile not set"}</p>
                            <p><strong>Date Joined</strong></p>
                            <p>{joinedDate}</p>
                        </div>
                    </>
                );
            case "wishList":
                return (
                    <div className="wish-list">
                        <h2>My Wish List</h2>
                        <p>You don't have a wish list</p>
                    </div>
                );
            case "orders":
                return (
                    <div className="orders">
                        <h2>My Orders</h2>
                        <p>You don't have any orders</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="account-container">
            <div className="account-nav">
                <div className="account-buttons">
                    <button
                        className={`button button-white account-nav-item ${activeTab === "account" ? "active" : ""}`}
                        onClick={() => setActiveTab("account")}
                    >
                        Account
                    </button>
                    <button
                        className={`button button-white account-nav-item ${activeTab === "wishList" ? "active" : ""}`}
                        onClick={() => setActiveTab("wishList")}
                    >
                        My Wish List
                    </button>
                    <button
                        className={`button button-white account-nav-item ${activeTab === "orders" ? "active" : ""}`}
                        onClick={() => setActiveTab("orders")}
                    >
                        My Orders
                    </button>
                </div>
            </div>

            <div className="account-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default AccountPage;