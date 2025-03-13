import React, { createContext, useState } from 'react';

export const SharePreviewDataContext = createContext();

export const SharePreviewDataProvider = ({ children }) => {
    const [updateTitle, setUpdateTitle] = useState('');
    const [updateBody, setUpdateBody] = useState('');
    const [updateContentID, setUpdateContentID] = useState('');
   

    const [createTitle, setCreateTitle] = useState("");
    const [createBody, setCreateBody] = useState("");

    const [createImage, setCreateImage] = useState({"image_code": null});
    const [updateImage, setUpdateImage] = useState({"image_code": ""})


    const [imagePreview, setImagePreview] = useState("");

    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [metaDescription, setMetaDescription] = useState("");

    const [navigateStatus, setNavigateStatus] = useState("")

    return (
        <SharePreviewDataContext.Provider value={{ updateContentID, updateTitle, setUpdateTitle, imagePreview, setImagePreview, updateBody, setUpdateBody, setUpdateContentID, createTitle, setCreateTitle, createBody, setCreateBody, category, setCategory, tags, setTags, metaDescription, setMetaDescription, createImage, setCreateImage, updateImage, setUpdateImage, navigateStatus, setNavigateStatus}}>
            {children}
        </SharePreviewDataContext.Provider>
    );
};
