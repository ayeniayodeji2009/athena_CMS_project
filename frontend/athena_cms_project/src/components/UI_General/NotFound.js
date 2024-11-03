import { Link } from "react-router-dom";
import GoBackButton from "./GoBackButton";



function NotFound() {

    return (
        <>
            <h1>404</h1>
            <h3>Page Not Found</h3>
            <GoBackButton />
            <Link to="/"><p><span style={{ fontSize: "180%" }}>&larr;</span>Go back to home</p></Link>
        </>
    )
}

export default NotFound