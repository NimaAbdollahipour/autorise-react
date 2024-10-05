import companyLogo from "../../assets/logo.png";
import profileImage from "../../assets/profile.png";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
export default function AdminHeader() {
    const { signOutUser, role, email } = useContext(UserContext);
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link to="/">Homepage</Link>
                        </li>
                        <li>
                            <Link to="/seller/new-ad">New Ad</Link>
                        </li>
                        <li>
                            <Link to="/seller/my-ads">My Ads</Link>
                        </li>
                        <li>
                            <Link to="/authenticated/saved-ads">Saved Ads</Link>
                        </li>
                        <li>
                            <Link to="/admin/user-management">
                                User Management
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/brands">Brands</Link>
                        </li>
                        <li>
                            <Link to="/admin/colors">Colors</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link to="/" className="btn btn-ghost text-xl p-0">
                    <img src={companyLogo} className="h-full w-auto" />
                </Link>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle btn-md p-0 avatar flex justify-center items-center"
                    >
                        <img src={profileImage} />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <span className="text-gray-500">{email}</span>
                        </li>
                        <li>
                            <span className="text-gray-500">Role: {role}</span>
                        </li>
                        <li>
                            <a className="justify-between">Change Email</a>
                        </li>
                        <li>
                            <a className="justify-between">Change Password</a>
                        </li>
                        <li>
                            <button
                                className="btn btn-ghost py-1 btn-sm text-left justify-start"
                                onClick={signOutUser}
                            >
                                Sign out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
