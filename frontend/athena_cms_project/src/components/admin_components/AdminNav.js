// frontend/src/components/Dashboard.js
import React from "react";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <nav>
                <ul>
                    <li><NavLink to="/admin/dashboard">Admin Dashboard</NavLink></li>
                    <li><NavLink to="/admin/contents">Admin Contents</NavLink></li>
                    <li><NavLink to="/admin/createcontent">Create New Content</NavLink></li>
                    {/* <li><Link to="admin/updatecontent">Update Content</Link></li> */}
                    {/* <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/faq">FAQ</Link></li>
                    <li><Link to="/policies">Policies</Link></li> */}
                </ul>
            </nav>
        </div>
    );
};

export default AdminNav;
