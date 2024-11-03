import React from 'react';

function HTMLContentConverter({ htmlString }) {
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
    )
};

export default HTMLContentConverter;
