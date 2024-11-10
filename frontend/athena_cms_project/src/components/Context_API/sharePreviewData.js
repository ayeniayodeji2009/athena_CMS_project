import React, { createContext, useState } from 'react';

export const SharePreviewDataContext = createContext();

export const SharePreviewDataProvider = ({ children }) => {
    const [updateTitle, setUpdateTitle] = useState('');
    const [updateBody, setUpdateBody] = useState('');
    const [updateContentID, setUpdateContentID] = useState('')

    const [createTitle, setCreateTitle] = useState("");
    const [createBody, setCreateBody] = useState("");

    return (
        <SharePreviewDataContext.Provider value={{ updateTitle, setUpdateTitle, updateContentID, updateBody, setUpdateBody, setUpdateContentID, createTitle, setCreateTitle, createBody, setCreateBody }}>
            {children}
        </SharePreviewDataContext.Provider>
    );
};
