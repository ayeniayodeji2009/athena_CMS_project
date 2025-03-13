import React, { useState } from "react";

const SearchContent = ({ onSearch }) => {
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [keyword, setKeyword] = useState("");

    const handleSearch = () => {
        onSearch({ category, tags, keyword });
    };

    return (
        <div>
            <h3>Search Content</h3>
            <div>
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchContent;
