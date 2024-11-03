import React, { createContext, useState } from 'react';

export const SharePreviewDataContext = createContext();

export const SharePreviewDataProvider = ({ children }) => {
    const [updateTitle, setUpdateTitle] = useState('');
    const [updateBody, setUpdateBody] = useState('');
    const [updateContentID, setUpdateContentID] = useState('')

    return (
        <SharePreviewDataContext.Provider value={{ updateTitle, setUpdateTitle, updateContentID, updateBody, setUpdateBody, setUpdateContentID }}>
            {children}
        </SharePreviewDataContext.Provider>
    );
};
