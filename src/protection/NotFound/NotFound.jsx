import { Link } from "react-router-dom";
import Assets from "../../assets";
import { PageNotFoundStyled } from "./styles";

const PageNotFound = () => {
    const isLoggedIn =
        localStorage.getItem("userToken") ??
        localStorage.getItem("userToken");

    return (
        <PageNotFoundStyled>
            <div className="top">
                <img src={Assets.Images.PageNotFound} alt="404 Error" />
            </div>
            <div className="bottom">
                <h1>Page Not Found!</h1>
                <p>
                    The Page you are looking for might have been removed had
                    it’s name changed or is temporarily unavailable
                </p>
                <Link to={isLoggedIn ? "/dashboard" : "/"}>Back To Home</Link>
            </div>
        </PageNotFoundStyled>
    );
};

export default PageNotFound;
