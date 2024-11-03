import { useNavigate } from "react-router-dom";


function GoBackButton() {
    const navigate = useNavigate();

    return (
        <p onClick={() => navigate(-1)}>
            <span style={{ fontSize: "180%" }}>&larr;</span>
            {"Go back"}
        </p>
    )
}

export default GoBackButton