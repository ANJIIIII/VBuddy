import { useEffect, useState } from "react";
import { getAllVisitType } from "../../store/slices/visitSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Stethoscope, ChevronDown } from "lucide-react";

// Sub-components
import Inquiry from "./VisitPurpose/Inquiry";
import DogPark from "./VisitPurpose/DogPark";
import Hostel from "./VisitPurpose/Hostel";
import Grooming from "./VisitPurpose/Grooming";
import DayCare from "./VisitPurpose/DayCare";
import DaySchool from "./VisitPurpose/DaySchool";
import PlaySchool from "./VisitPurpose/PlaySchool";
import Shop from "./VisitPurpose/Shop";
import Veterinary from "./VisitPurpose/Veterinary";
import BuySubscription from "./VisitPurpose/BuySubscription";

const NewVisitForm2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [visitTypes, setVisitTypes] = useState([]);
  const [purpose, setPurpose] = useState("Inquiry");

  useEffect(() => {
    dispatch(getAllVisitType()).then((data) => {
      if (data?.payload?.success) {
        setVisitTypes(data.payload.visitTypes);
      }
    });
  }, [dispatch]);

  const { _id } = location?.state || "";

  const VisitPurposeDetails = visitTypes?.length
    ? visitTypes.find((p) => p.purpose === purpose)
    : null;

  const renderForm = () => {
    switch (purpose) {
      case "Select": return <div className="text-center p-8 text-secondary-500">Please select a purpose to proceed.</div>;
      case "Inquiry": return <Inquiry _id={_id} visitPurposeDetails={VisitPurposeDetails} />;
      case "Dog Park": return <DogPark _id={_id} visitPurposeDetails={VisitPurposeDetails} />;
      case "Veterinary": return <Veterinary _id={_id} visitPurposeDetails={VisitPurposeDetails} />;
      case "Hostel": return <Hostel _id={_id} visitPurposeDetails={VisitPurposeDetails} />;
      case "Day Care": return <DayCare _id={_id} visitPurposeDetails={VisitPurposeDetails} />;
      case "Day School": return <DaySchool _id={_id} visitPurposeDetails={VisitPurposeDetails} />;
      case "Play School": return <PlaySchool _id={_id} visitPurposeDetails={VisitPurposeDetails} />;
      case "Grooming": return <Grooming _id={_id} visitPurposeDetails={VisitPurposeDetails} />;
      case "Shop": return <Shop _id={_id} visitPurposeDetails={VisitPurposeDetails} />;
      case "Buy Subscription": return <BuySubscription _id={_id} visitPurposeDetails={VisitPurposeDetails} />
      default: return <div className="text-center p-8 text-red-500">Form not available for this selection.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50/30 p-4 md:p-8 animate-in fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white border border-secondary-200 text-secondary-600 hover:text-primary-600 hover:border-primary-200 transition-all shadow-sm"
            aria-label="Go Back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">New Visit Entry</h1>
            <p className="text-secondary-500 text-sm">Select purpose and record visit details</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
          {/* Purpose Selector */}
          <div className="p-6 border-b border-secondary-100 bg-secondary-50/50">
            <label className="block text-xs font-bold text-secondary-500 uppercase tracking-wide mb-2">
              Purpose of Visit
            </label>
            <div className="relative max-w-md">
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-white border border-secondary-200 rounded-xl text-base text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all appearance-none shadow-sm cursor-pointer"
              >
                {visitTypes?.map((item, idx) => (
                  <option key={idx} value={item?.purpose}>
                    {item?.purpose}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-secondary-500">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          {/* Dynamic Form Content */}
          <div className="p-6 min-h-[400px]">
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVisitForm2;
