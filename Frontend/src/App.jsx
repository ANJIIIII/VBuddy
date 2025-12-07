import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./index.css";

// Layouts
import MainLayout from "./component/layout/MainLayout";
import PublicLayout from "./component/layout/PublicLayout";
import CheckAuth from "./component/CheckAuth";

// Pages & Components
import Dashboard from "./component/Dashboard";
import Home from "./component/home";
import UserLoginPage from "./pages/UserLogin";
import SignupPage from "./pages/Signup";
import AboutUs from "./pages/AboutPage";

// Pet Owner Master
import PetForm from "./component/PetOwnerMaster/PetForm";
import DogHistory from "./component/PetOwnerMaster/DogHistory";
import BreedManagement from "./component/PetOwnerMaster/BreedManagement";

// Inventory
import InventoryForm from "./component/Inventory/inventoryForm";
import InventoryList from "./component/Inventory/inventoryList";
import EditInventory from "./component/Inventory/EditInventory";
import AlertList from "./component/Inventory/AlertList";

// Sales
import SalesSection from "./component/salesSection";
import SalesHistory from "./component/SalesSection/SalesHistory";
import PetByDate from "./component/SalesSection/PetByDate";
import NewVisitForm from "./component/SalesSection/NewVisitForm";
import NewVisitForm2 from "./component/SalesSection/NewVisitForm2";
import Hostel from "./component/SalesSection/VisitPurpose/Hostel";
import BuySubscription from "./component/SalesSection/VisitPurpose/BuySubscription";

// Reminders & Attendance
import NewReminders from "./component/Reminders/NewReminders";
import Attendance from "./component/Reminders/Attendance";

// Others
import Deboard from "./component/Deboard";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="w-screen overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          {/* Independent Home Page (Controls its own Navbar) */}
          <Route path="/" element={<Home />} />

          {/* Public Routes with PublicLayout */}
          <Route element={<PublicLayout />}>
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Login Route (Guest Only) */}
            <Route element={<CheckAuth isAuthenticated={isAuthenticated} />}>
              <Route path="/login" element={<UserLoginPage />} />
            </Route>
          </Route>

          {/* Protected Routes with MainLayout */}
          <Route element={<CheckAuth isAuthenticated={isAuthenticated} />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Pet Master */}
              <Route path="/pet" element={<PetForm />} />
              <Route path="/history" element={<DogHistory />} />
              <Route path="/BreedManagement" element={<BreedManagement />} />

              {/* Inventory */}
              <Route path="/inventory" element={<InventoryForm />} />
              <Route path="/inventoryList" element={<InventoryList />} />
              <Route path="/editinventory" element={<EditInventory />} />
              <Route path="/alertlist" element={<AlertList />} />

              {/* Sales */}
              <Route path="/salesSection" element={<SalesSection />} />
              <Route path="/saleshistory" element={<SalesHistory />} />
              <Route path="/petByDate" element={<PetByDate />} />
              <Route path="/nvisit" element={<NewVisitForm />} />
              <Route path="/nvisit2" element={<NewVisitForm2 />} />
              <Route path="/fill" element={<Hostel />} />
              <Route path="/buysubscription" element={<BuySubscription />} />

              {/* Reminders & Attendance */}
              <Route path="/reminders" element={<NewReminders />} />
              <Route path="/attendance" element={<Attendance />} />

              {/* Other */}
              <Route path="/deboard" element={<Deboard />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;