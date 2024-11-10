import React, { /*useEffect,*/ useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SharePreviewDataContext } from "../Context_API/sharePreviewData";




function PreviewCreateContent() {
    const { createTitle, createBody, setCreateTitle, setCreateBody } = useContext(SharePreviewDataContext);

    const navigate = useNavigate();
    const location = useLocation();
    const previewCreateTitle = location.state.title;
    const previewCreateBody = location.state.body;

    console.log(previewCreateTitle, previewCreateBody)

    const handleSave = () => {
        // Submit to the backend
        fetch("http://127.0.0.1:5000/content", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: createTitle, body: createBody }),
        }).then((res) => res.json()).then((data) => {
            console.log("Content saved:", data);
            alert("Content saved:", data)

            //Clear input field
            setCreateTitle("")
            setCreateBody("")

            // Go back to list
            navigate(`/admin/contents`);
        });
    };



    function handleBackToAdminCreate() {
        // navigate("/admin/createcontent", { state: { title: previewCreateTitle, body: previewCreateBody } });
        navigate("/admin/createcontent", { state: { _title: previewCreateTitle, _body: previewCreateBody } });

        // setUpdateContentID(content_ID)
        // setUpdateTitle(updateTitle) 
        // setUpdateBody(updateBody)
    };


    return (
        <div>
            {/* <GoBackButton /> */}
            <button onClick={handleBackToAdminCreate}>Go Back</button>
            <h2>Preview Content</h2>
            <h3>{createTitle}</h3>
            <div dangerouslySetInnerHTML={{ __html: createBody }} />
            {/* <button onClick={() => navigate("/admin/update")}>Go Back</button> */}
            <button onClick={handleSave}>Save</button>
        </div>
    )
}

export default PreviewCreateContent