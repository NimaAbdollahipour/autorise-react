import { useState, useContext } from "react";
import companyLogo from "../assets/logo.png";
import { KeyIcon, MailIcon, MessageCircleWarningIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../api/auth";
import { UserContext } from "../contexts/UserContext";
import { getUserInfo } from "../api/allUsers";
export default function SignIn() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const { setRole, setUserId, setEmail } = useContext(UserContext);

    const navigate = useNavigate();

    function handleChange(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

    function handleSubmit(e) {
        setErrorMessage("");
        e.preventDefault();
        if (
            credentials.hasOwnProperty("email") &&
            credentials.hasOwnProperty("password")
        ) {
            if (validateEmail(credentials.email)) {
                if (credentials.password.length >= 8) {
                    signIn({
                        email: credentials.email,
                        password: credentials.password,
                    }).then(({ status }) => {
                        if (status === "success") {
                            getUserInfo().then(({ data }) => {
                                setRole(data.role);
                                setUserId(data.userId);
                                setEmail(data.email);
                            });
                            navigate("/");
                        } else {
                            setErrorMessage("Invalid credentials.");
                        }
                    });
                } else {
                    setErrorMessage("Password must be at least 8 characters");
                }
            } else {
                setErrorMessage("Invalid email");
            }
        } else {
            setErrorMessage("Fields can not be empty");
        }
    }

    return (
        <div className="w-full">
            <form
                className="card p-8 w-full sm:w-[360px] gap-3 m-auto"
                onSubmit={handleSubmit}
            >
                <div className="flex w-full justify-center mt-20">
                    <Link to={"/"}>
                        <img src={companyLogo} className="w-40" />
                    </Link>
                </div>

                <label className="input input-bordered flex items-center gap-2">
                    <MailIcon className="text-gray-400" size={20} />
                    <input
                        type="text"
                        className="grow"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <KeyIcon className="text-gray-400" size={20} />
                    <input
                        type="password"
                        className="grow"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                    />
                </label>
                {errorMessage && (
                    <div role="alert" className="alert alert-error">
                        <MessageCircleWarningIcon />
                        <span>{errorMessage}</span>
                    </div>
                )}
                <button className="btn btn-warning" type="submit">
                    Sign in
                </button>
                <Link to={"/signup"} className="w-full">
                    <button className="btn btn-neutral w-full" type="button">
                        Sign up
                    </button>
                </Link>
            </form>
        </div>
    );
}
