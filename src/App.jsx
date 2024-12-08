import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import Home from "./pages/Home";
import Header from "./component/Header";
import ExplorePage from "./pages/ExplorePage";
import SearchPage from "./pages/SearchPage";
import Footer from "./component/Footer";
import { useDispatch } from "react-redux";
import MobileNavigation from "./component/MobileNavigation";
import { setBannerData, setImageUrl } from "./store/movieSlice";
const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen pb-14 lg:pb-0">
      <Header />
      <div className="flex-grow mt-20 min-h-[90vh]">
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const fetchTrendingData = async () => {
    try {
      const res = await axios.get("/trending/all/week");
      dispatch(setBannerData(res.data.results));
      // console.log(res.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get("/configuration");
      dispatch(setImageUrl(response.data.images.secure_base_url + "original"));
      // console.log(
      //   "configuration data",
      //   response.data.images.secure_base_url + "original"
      // );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: ":explore",
          element: <ExplorePage />,
        },
        {
          path: ":explore/:id",
          element: <DetailsPage />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
