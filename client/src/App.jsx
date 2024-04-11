import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Search from "./pages/Search";
import Tour from "./pages/Tour";
import WishList from "./pages/WishList";
import CreateTourPage from "./pages/CreateTourPage";
import UserRole from "./pages/UserRole";
import ReviewsControle from "./pages/ReviewsControle";
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import TourControl from "./pages/TourControl";
import UpdateTour from "./pages/UpdateTour";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/Tour" element={<Search />} />
        <Route path="/tour/:tourId" element={<Tour />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/WishList" element={<WishList />} />
        </Route>


        <Route element={<PrivateAdminRoute />}>
          <Route path="/Dashboard" element={<CreateTourPage />} />
          <Route path="/users" element={<UserRole />} />
          <Route path="/tour-control" element={<TourControl/>}/>
          <Route path="/update-tour/:tourId" element={<UpdateTour/>}/>
          <Route path="/reviews" element={<ReviewsControle />} />
          <Route path="/create-tour" element={<CreateTourPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
