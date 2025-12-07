import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoardedPetList,
  getBoardingDetails,
} from "../store/slices/deboardSlice";
import { getBoardingCategoryList } from "../store/slices/visitSlice";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, CheckCircle, Clock } from "lucide-react";

import HostelDeboard from "./Deboard/HostelDeboard";
import DogParkDeboard from "./Deboard/DogParkDeboard";
import DaySchoolDeboard from "./Deboard/DaySchoolDeboard";
import DayCareDebaord from "./Deboard/DayCareDebaord";
import PlaySchoolDeboard from "./Deboard/PlaySchoolDeboard";

const Deboard = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [boardingid, setboardingid] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { petsList, petsListLoading } = useSelector((state) => state.deboard);

  useEffect(() => {
    const params = new URLSearchParams();
    if (!selectedOption) return;
    params.append("type", selectedOption?._id);
    const queryString = params.toString();

    dispatch(getBoardedPetList(queryString));
  }, [dispatch, selectedOption]);

  useEffect(() => {
    dispatch(getBoardingCategoryList()).then((data) => {
      if (data?.payload?.success) {
        setOptions(data?.payload?.visitTypes);
        // Automatically select the first option if available to improve UX
        if (data?.payload?.visitTypes?.length > 0 && !selectedOption) {
          setSelectedOption(data.payload.visitTypes[0]);
        }
      }
    });
  }, []); // Only run on mount

  const showDeboardingPopup = (_id) => {
    switch (selectedOption?.purpose) {
      case "Dog Park": return <DogParkDeboard _id={_id} setboardingid={setboardingid} />;
      case "Day School": return <DaySchoolDeboard _id={_id} setboardingid={setboardingid} />;
      case "Play School": return <PlaySchoolDeboard _id={_id} setboardingid={setboardingid} />;
      case "Hostel": return <HostelDeboard _id={_id} setboardingid={setboardingid} />;
      case "Day Care": return <DayCareDebaord _id={_id} setboardingid={setboardingid} />;
      default: return <div></div>;
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50/30 p-4 md:p-8 animate-in fade-in">

      {/* Modal Layer */}
      {boardingid && (
        <div className="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto w-full max-w-lg">
            {showDeboardingPopup(boardingid)}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white border border-secondary-200 text-secondary-600 hover:text-primary-600 hover:border-primary-200 transition-all shadow-sm"
            aria-label="Go Back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-secondary-900 flex items-center gap-2">
              <LogOut className="text-red-500" size={24} />
              Deboarding Process
            </h1>
            <p className="text-secondary-500 text-sm">Manage pet check-outs and billing</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar / Options */}
          <div className="w-full lg:w-1/4 flex flex-col gap-2">
            <h3 className="text-xs font-semibold text-secondary-500 uppercase tracking-wide mb-2 px-1">Categories</h3>
            {options.map((option) => (
              <button
                key={option._id}
                onClick={() => setSelectedOption(option)}
                className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 text-left border ${selectedOption?._id === option?._id
                    ? "bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-600/20"
                    : "bg-white text-secondary-700 border-secondary-200 hover:bg-secondary-50 hover:border-secondary-300"
                  }`}
              >
                <span className="font-medium">{option?.purpose}</span>
                {selectedOption?._id === option?._id && <CheckCircle size={16} />}
              </button>
            ))}
            {options.length === 0 && (
              <div className="p-4 text-center text-sm text-secondary-400 bg-white rounded-xl border border-secondary-200 border-dashed">
                Loading Categories...
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:w-3/4">
            {petsListLoading ? (
              <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-sm border border-secondary-200">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent"></div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {selectedOption ? (
                  petsList && petsList.length > 0 ? (
                    petsList.map((pet) => (
                      <div
                        key={pet._id}
                        className="group bg-white rounded-xl border border-secondary-200 p-5 hover:border-primary-200 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                      >
                        <div className="flex flex-col gap-1">
                          <h3 className="text-lg font-semibold text-secondary-900">{pet?.petId?.name}</h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-secondary-600">
                            <span><span className="text-secondary-400">Owner:</span> {pet?.petId?.owner?.name}</span>
                            <span><span className="text-secondary-400">Phone:</span> {pet?.petId?.owner?.phone}</span>
                          </div>
                          <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 w-fit">
                            <Clock size={12} className="mr-1" />
                            {pet.isBoarded ? "Currently Boarded" : "Not Boarded"}
                          </div>
                        </div>

                        <button
                          onClick={() => setboardingid(pet._id)}
                          disabled={loading}
                          className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-all shadow-sm ${loading
                              ? "bg-secondary-400 cursor-not-allowed"
                              : "bg-red-500 hover:bg-red-600 shadow-red-500/20"
                            }`}
                        >
                          {loading ? "Processing..." : "Deboard & Bill"}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-secondary-200 border-dashed text-secondary-400">
                      <p>No pets currently boarded in {selectedOption?.purpose}</p>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-secondary-200 border-dashed text-secondary-400">
                    <p>Please select a boarding category to view pets.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deboard;
