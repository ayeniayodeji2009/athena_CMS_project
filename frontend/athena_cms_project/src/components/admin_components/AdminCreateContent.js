// frontend/src/components/PageEditor.js
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AdminCreateContent = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSave = () => {
        // Submit to the backend
        fetch("http://127.0.0.1:5000/content", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, body }),
        }).then((res) => res.json()).then((data) => {
            console.log("Content saved:", data);
            alert("Content saved:", data)

            // Clear input field
            setTitle("")
            setBody("")
        });
    };

    return (
        <div>
            <h2>Admin Write Content</h2>
            <input 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />
            <ReactQuill value={body} onChange={setBody} />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default AdminCreateContent;
