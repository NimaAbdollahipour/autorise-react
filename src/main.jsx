import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home.jsx";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup.jsx";
import UserPrvider from "./contexts/UserContext.jsx";
import AuthenticatedRoutes from "./components/protected_routes/AuthenticatedRoutes.jsx";
import SellerRoutes from "./components/protected_routes/SellerRoutes.jsx";
import AdminRoutes from "./components/protected_routes/AdminRoutes.jsx";
import NewAd from "./pages/NewAd.jsx";
import AdViewer from "./pages/AdViewer.jsx";
import SavedAds from "./pages/SavedAds.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import ColorManagement from "./pages/ColorManagement.jsx";
import BrandManagement from "./pages/BrandManagement.jsx";
import MyAds from "./pages/MyAds.jsx";
import EditAd from "./pages/EditAd.jsx";
import EditImages from "./pages/EditImages.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <UserPrvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/ad-view/:id" element={<AdViewer />} />
                    <Route
                        path="/authenticated"
                        element={<AuthenticatedRoutes />}
                    >
                        <Route
                            path="/authenticated/saved-ads"
                            element={<SavedAds />}
                        />
                        <Route
                            path="/authenticated/change-email"
                            element={<Home />}
                        />
                        <Route
                            path="/authenticated/change-password"
                            element={<Home />}
                        />
                    </Route>
                    <Route path="/seller" element={<SellerRoutes />}>
                        <Route path="/seller/my-ads" element={<MyAds />} />
                        <Route path="/seller/new-ad" element={<NewAd />} />
                        <Route
                            path="/seller/edit-ad/:id"
                            element={<EditAd />}
                        />
                        <Route
                            path="/seller/edit-images/:id"
                            element={<EditImages />}
                        />
                    </Route>
                    <Route path="/admin" element={<AdminRoutes />}>
                        <Route
                            path="/admin/user-management"
                            element={<UserManagement />}
                        />
                        <Route
                            path="/admin/colors"
                            element={<ColorManagement />}
                        />
                        <Route
                            path="/admin/brands"
                            element={<BrandManagement />}
                        ></Route>
                    </Route>
                    {/* Add more routes here */}
                </Routes>
            </BrowserRouter>
        </UserPrvider>
    </StrictMode>
);
