// frontend/src/components/DeleteContent.js
import React, { /*useEffect*/ } from 'react';
import { /*useParams, useNavigate*/ } from 'react-router-dom';

const AdminDelete = ({ content_id, contentList, setContentList }) => {
    // const { content_id = 1 } = useParams(); // Get content_id from URL parameters
    // console.log(content_id)
    // const navigate = useNavigate();

    const handleDelete = (para_content_id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this content and all its versions?");

        if (confirmDelete) {
            fetch(`http://127.0.0.1:5000/content/${para_content_id}`, {
                method: "DELETE",
            })
                .then((res) => {
                    // Server Response
                    if (res.status === 204) {
                        alert("Content and all versions deleted successfully!");
                        //navigate('/admin/contents'); // Refresh content list

                         // Delete from UI
                        const updateContentList = contentList.filter(content => content.id !== content_id)
                        setContentList(updateContentList)
                    } else {
                        alert("Failed to delete content.");
                    }
                })
                .catch((error) => console.error("Error deleting content:", error));
        }
    };


   

    return (
        <div>
            <button onClick={() => handleDelete(content_id)} style={{ color: 'red' }}>
                Delete Content
            </button>
        </div>
    );
};

export default AdminDelete;
