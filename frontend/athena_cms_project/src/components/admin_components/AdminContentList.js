import React, { useEffect, useContext, useState } from "react";
import AdminDelete from "./AdminDelete";
// import AdminUpdate from "./AdminUpdate"
import { SharePreviewDataContext } from "../Context_API/sharePreviewData";
import { useNavigate } from "react-router-dom";
import "./styles/admin_components.scss"


const AdminContentList = () => {
    const [contentList, setContentList] = useState([]);
    const { setUpdateContentID, setNavigateStatus } = useContext(SharePreviewDataContext);
    const navigate = useNavigate();


    // Navigate to Update component
    const navigateToUpdatePage = (content_id) => {
        navigate(`/admin/updatecontent/`, { state: {contentID: content_id} }); // from const navigate above
        setUpdateContentID(content_id);
        setNavigateStatus("navigate");
        // console.log(content_id)
    };



    // Navigate to View content component
    const navigateToViewPage = (content_id) => {
        navigate(`/viewcontent`, { state: content_id }); // from const navigate above
    };
  

    // Get content list from Database and save it to state
    useEffect(() => {
        fetch("http://127.0.0.1:5000/contents")
            .then((res) => res.json())
            .then((data) => setContentList(data));
    }, []);

    return (
        <div className="admin_content_container">
            <h2>Admin Content List</h2>
            <ol>
                {contentList.map((content) => (
                    <li key={content.id} className={"admin_content_container_item"}>
                        <div className={"admin_content_container_item_a"}>
                        <img src={content.image_url} alt={content.image_url} width={"10%"} height={"10%"} />
                        <h3>{content.title} <button onClick={() => navigateToViewPage(content.id)}>view</button></h3>
                        <button onClick={() => { navigateToUpdatePage(content.id)}}>Update Content</button>
                        <AdminDelete content_id={content.id} contentList={contentList} setContentList={setContentList} />
                        </div>
                        <div className={"admin_content_container_item_b"}>
                        <p>Cathegory: {content.category}</p>
                        </div>
                    </li>
                )).reverse()}
            </ol>
        </div>
    );
};

export default AdminContentList;

