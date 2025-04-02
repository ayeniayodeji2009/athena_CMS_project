// AdminUpdateContainer.js
import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SharePreviewDataContext } from "../Context_API/sharePreviewData";
import ReactQuillEditor from "../tool_components/ReactQuillEditor";
import ImageUpload from "../tool_components/ImageUpload";
import Loading from "../UI_General/Loading";
import "react-quill/dist/quill.snow.css";
import "./styles/admin_components.scss";

export default function AdminUpdate() {
    const {
        updateTitle,
        updateBody,
        updateContentID,
        category,
        tags,
        metaDescription,
        setUpdateTitle,
        updateImage,
        setUpdateImage,
        setUpdateBody,
        setUpdateContentID,
        setCategory,
        setTags,
        setMetaDescription,
        navigateStatus,
        setNavigateStatus,
    } = useContext(SharePreviewDataContext);

    const [loading, setLoading] = useState(true);
    const [databaseTitle, setDatabaseTitle] = useState("");
    const [databaseImage, setDatabaseImage] = useState({ "image_code": "" });
    const [databaseBody, setDatabaseBody] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const isFirstRender = useRef(true);

    const content_id = location.state.contentID;
    console.log(content_id)
    // This keeps the Content ID without changing for stability
    if (content_id) {
        console.log(content_id)
        setUpdateContentID(content_id)
    }

    const navType = navigateStatus === "navigate" ? "navigate" : "reload";
    console.log(navType)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/content/${updateContentID}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setDatabaseTitle(data.title);
                setDatabaseImage({ "image_code": data.image_url });
                setDatabaseBody(data.body);
                setCategory(data.category);
                setTags(data.tags);
                setMetaDescription(data.meta_description);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching content:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [updateContentID, setCategory, setTags, setMetaDescription]);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/content/${updateContentID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: updateTitle,
                    image_url: updateImage.image_code,
                    body: updateBody,
                    category,
                    tags,
                    meta_description: metaDescription,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            await response.json();
            alert("Content updated successfully!");

            setUpdateTitle();
            setUpdateImage({ "image_code": "" })
            setUpdateBody();
            setCategory();
            setTags();
            setMetaDescription();

            localStorage.removeItem("localUpdateTitle");
            localStorage.removeItem("localUpdateImage");
            localStorage.removeItem("localUpdateImageCopy");
            localStorage.removeItem("localUpdateBody");
            localStorage.removeItem('localUpdateContentID')

            navigate(`/admin/contents`);
        } catch (error) {
            console.error("Error updating content:", error);
        }
    };

    const handlePreview = () => {
        navigate("/previewupdatecontent", { state: { title: updateTitle, body: updateBody, content_ID: updateContentID } });
        // setUpdateContentID(localStorage.getItem('localUpdateContentID'))
        setNavigateStatus("navigate");
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        //First load data from database to UI
        if (!updateTitle) {
            setUpdateTitle(databaseTitle);
        }

        if (!updateImage.image_code) {
             setUpdateImage({ image_code: databaseImage.image_code });
        }

        if (!updateBody) {
            setUpdateBody(databaseBody);
        }


        // Store UI data if true to local storage
        if (updateTitle) {
            localStorage.setItem("localUpdateTitle", updateTitle);
        }
        if (updateImage.image_code) {
            localStorage.setItem("localUpdateImage", updateImage.image_code);
        }
        // if (updateImage.image_code) {
        //      localStorage.setItem("localUpdateImageCopy", updateImage.image_code);
        // }
        if (updateBody) {
            localStorage.setItem("localUpdateBody", updateBody);
        }

        if (updateContentID === content_id) {
             localStorage.setItem("localUpdateContentID", updateContentID);
        }



        // Restore data from local storage to UI after reloading web page
        if (navType === "reload") {
            if (!updateTitle) {
                setUpdateTitle(localStorage.getItem("localUpdateTitle") || "");
            }
            if (!updateImage.image_code) {
                const localImage = localStorage.getItem("localUpdateImage") || "";
                if(localImage){
                  setUpdateImage({image_code: localImage})
                }
            }
        //    if (!updateImage.image_code) {
        //        const localImage = localStorage.getItem("localUpdateImageCopy") || "";
        //        if(localImage){
        //          setUpdateImage({image_code: localImage})
        //        }
        //    }
            if (!updateBody) {
                setUpdateBody(localStorage.getItem("localUpdateBody") || "");
            }

            if (!updateContentID) {
                setUpdateContentID(localStorage.getItem("localUpdateContentID") || "");
            }

           
            console.log("Current Page has just Reloaded")
            setLoading(false);
        } else if (navType === "navigate") {
            console.log("Current Page was now Navigated")
            setLoading(false);
        }
    }, [databaseBody, databaseImage.image_code, databaseTitle, navType, setUpdateBody, setUpdateImage, setUpdateTitle, updateBody, updateImage.image_code, updateTitle, content_id, updateContentID, setUpdateContentID]);

    if (loading) return <Loading />;

    return (
        <AdminUpdateChild
            content_id={updateContentID}
            updateTitle={updateTitle}
            updateBody={updateBody}
            setUpdateTitle={setUpdateTitle}
            setUpdateBody={setUpdateBody}
            updateImage={updateImage}
            setUpdateImage={setUpdateImage}
            handleUpdate={handleUpdate}
            handlePreview={handlePreview}
            category={category}
            setCategory={setCategory}
            tags={tags}
            setTags={setTags}
            metaDescription={metaDescription}
            setMetaDescription={setMetaDescription}
        />
    );
}

// AdminUpdate.js
function AdminUpdateChild({ content_id, updateTitle, updateBody, updateImage, setUpdateImage, setUpdateTitle, setUpdateBody, handleUpdate, handlePreview, category, setCategory, tags, setTags, metaDescription, setMetaDescription }) {
    const navigate = useNavigate();

    const goBackToContentList = () => {
        setUpdateTitle();
        setUpdateImage({ image_code: "" });
        setUpdateBody();
        setCategory();
        setTags();
        setMetaDescription();
        localStorage.removeItem("localUpdateTitle");
        localStorage.removeItem("localUpdateImage");
        localStorage.removeItem("localUpdateImageCopy");
        localStorage.removeItem("localUpdateBody");
        localStorage.removeItem('localUpdateContentID')
        navigate("/admin/contents");
    };

    const handleChange = (e) => setUpdateTitle(e.target.value);

    return (
        <div className="admin_update_container">
            <button onClick={goBackToContentList} className="admin_update-button">Go Back</button>
            <h2>Edit Content</h2>
            <input type="text" placeholder="Title" value={updateTitle} onChange={handleChange} />
            <ImageUpload setCurrentImageUpload={setUpdateImage} currentImageUpload={updateImage} />
            <ReactQuillEditor value={updateBody} setValue={setUpdateBody} />
            <br />
            <br />
            <div>
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div>
                <input type="text" placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>
            <div>
                <input type="text" placeholder="Meta Description" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
            </div>
            <br />
            <br />
            <br />
            <div className="admin_update_container-button">
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handlePreview}>Preview Update</button>
            </div>
            <br />
            <br />
        </div>
    );
}
