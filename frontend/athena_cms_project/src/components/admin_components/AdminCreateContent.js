// frontend/src/components/PageEditor.js
import React, { useEffect, useContext } from "react";
import { useNavigate/*, useLocation*/ } from "react-router-dom";
import { SharePreviewDataContext } from "../Context_API/sharePreviewData";
import "react-quill/dist/quill.snow.css";
// import DraftEditor from "../tool_components/DraftEditor";
import ReactQuillEditor from "../tool_components/ReactQuillEditor";

const AdminCreateContent = () => {
    const navigate = useNavigate();
    const { createTitle, setCreateTitle, createBody, setCreateBody } = useContext(SharePreviewDataContext);


    // const location = useLocation();
    // location.state = {_title: "Hi", _body: "Hello"}
    // let previewCreateTitle, previewCreateBody
    // location.state.defaultID = 1
    // const previewCreateTitle = location.state._title //|| 'Default Title'
    // const previewCreateBody = location.state._body //|| 'Default Body'
    // console.log(location)

   
    
    // useEffect(() => {
    //     if (location.state.title === null) {
    //         // eslint-disable-next-line react-hooks/exhaustive-deps
    //         previewCreateTitle = undefined
    //     } else {
    //         previewCreateTitle = location.state.title
    //     }
    
    //     if (location.state.body === null) {
    //         // eslint-disable-next-line react-hooks/exhaustive-deps
    //         previewCreateBody = undefined
    //     } else {
    //         previewCreateBody = location.state.body
    //     }
    

    // },[])

    // console.log(previewCreateTitle)
    // console.log(previewCreateBody)

    // const title = _previewCreateTitle ? _previewCreateTitle : 'Default Title';

    // const previewCreateTitle = undefined;
    // const previewCreateBody = undefined;

    // console.log(location.state._previewCreateTitle, location.state._previewCreateBod)

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

            // Clear input field
            setCreateTitle("")
            setCreateBody("")
            navigate(`/admin/contents`);
        });
    };

   

    function handlePreview() {
        navigate("/previewcreatecontent", { state: { title: createTitle, body: createBody } });
        // setUpdateContentID(updateContentID)
    };


    useEffect(() => {

        if (createTitle !== "") {
            // if (previewCreateTitle !== undefined || previewCreateTitle !== null) {
                setCreateTitle(createTitle)
            // }
        }


        if (createBody !== "") {
            // if (previewCreateBody !== undefined || previewCreateBody!== null) {
                setCreateBody(createBody)
            // }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function goBackToContentList() {
        setCreateTitle("")
        setCreateBody("")
        navigate("/admin/contents")
    }

  

    return (
        <div>
            <button onClick={goBackToContentList}>Go Back</button>
            <h2>Admin Write Content</h2>
            <input 
                type="text" 
                placeholder="Title" 
                value={createTitle} 
                onChange={(e) => setCreateTitle(e.target.value)} 
            />
            {/* <ReactQuill value={createBody} onChange={setCreateBody} /> */}
            <ReactQuillEditor value={createBody} setValue={setCreateBody} />
            <button onClick={handleSave}>Save</button>
            <button onClick={handlePreview}>Preview Update</button>
            {/* <DraftEditor /> */}
        </div>
    );
};

export default AdminCreateContent;
