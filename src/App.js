import React, { useEffect} from "react";
import { useSetRecoilState } from "recoil";
import Home from "./pages/home/index.tsx";
import User from "./components/common/KakaoLogin";
import Products from "./pages/products/index.tsx";
import Product from "./pages/products/[id]/index.tsx";
import Privacy from "./pages/privacy/index.tsx";
import { mobile } from "./recoil/atom";
import AuthCheck from "./pages/authCheck";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const App = () => {
    const setMobile = useSetRecoilState(mobile);
    const handleResize = () => {
        if (window.innerWidth > 1024) {
            setMobile(false);
        } else {
            setMobile(true);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [window.innerWidth]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user/kakao/auth" element={<User />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<Product />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/authCheck/:accessToken" element={<AuthCheck />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
