import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { getPetDetails, getPetHistory } from "../../store/slices/petSlice";
import NewVisitPopup from "./VisitForm";
import VisitHistoryPopup from "./visitHistoryPopUp";
import VaccinationPopup from "../PetOwnerMaster/VaccinationPopup";
import PropTypes from "prop-types";
import { ArrowLeft, User, Phone, Mail, MapPin, Calendar, Activity, Syringe, Clock, FileText } from "lucide-react";

const PetDetails = ({ petId, onBack }) => {
  const [pet, setPet] = useState(null);
  const [visitHistory, setVisitHistory] = useState([]);
  const [showNewVisit, setShowNewVisit] = useState(false);
  const [showVisitHistory, setShowVisitHistory] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const petResponse = await dispatch(getPetDetails(petId));
        setPet(petResponse?.payload?.pet);

        const historyResponse = await dispatch(getPetHistory(petId));
        setVisitHistory(historyResponse?.payload?.visits || []);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };

    fetchPetData();
  }, [petId, dispatch]);

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin h-10 w-10 border-4 border-primary-500 border-t-transparent rounded-full" />
          <p className="text-secondary-500 text-sm font-medium">Loading details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50/50 py-8 animate-in fade-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-white border border-secondary-200 text-secondary-600 hover:text-primary-600 hover:border-primary-200 transition-all shadow-sm"
            aria-label="Go Back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Patient Profile</h1>
            <p className="text-secondary-500 text-sm">View comprehensive details and history</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Pet & Owner Summary */}
          <div className="space-y-6">

            {/* Pet Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-secondary-200 overflow-hidden relative">
              <div className="h-24 bg-gradient-to-r from-primary-500 to-primary-600"></div>
              <div className="px-6 pb-6 mt-[-3rem]">
                <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-md mx-auto lg:mx-0">
                  <div className="w-full h-full bg-secondary-100 rounded-xl flex items-center justify-center text-4xl">
                    {pet.species === 'cat' ? '🐱' : pet.species === 'dog' ? '🐶' : '🐾'}
                  </div>
                </div>

                <div className="mt-4 text-center lg:text-left">
                  <h2 className="text-2xl font-bold text-secondary-900">{pet.name}</h2>
                  <p className="text-secondary-500 font-medium">{pet.breed} • {pet.species}</p>

                  <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary-100 text-secondary-700 uppercase tracking-wide">
                      {pet.sex || 'Unknown Sex'}
                    </span>
                    {pet.color && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary-100 text-secondary-700 uppercase tracking-wide">
                        {pet.color}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-secondary-100 bg-secondary-50/50 grid grid-cols-2 gap-4">
                <div className="text-center lg:text-left">
                  <span className="text-xs text-secondary-400 block uppercase tracking-wider font-semibold">Born</span>
                  <span className="text-sm font-medium text-secondary-800">{format(new Date(pet.dob), "PP")}</span>
                </div>
                <div className="text-center lg:text-left">
                  <span className="text-xs text-secondary-400 block uppercase tracking-wider font-semibold">Age</span>
                  <span className="text-sm font-medium text-secondary-800">
                    {Math.floor((new Date() - new Date(pet.dob)) / (365.25 * 24 * 60 * 60 * 1000))} years
                  </span>
                </div>
              </div>
            </div>

            {/* Owner Card */}
            {pet.owner && (
              <div className="bg-white rounded-2xl shadow-sm border border-secondary-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-secondary-100 bg-secondary-50/30 flex items-center gap-2">
                  <User className="text-primary-500" size={18} />
                  <h3 className="font-semibold text-secondary-900">Owner Details</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-500 flex-shrink-0">
                      <User size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-secondary-900">{pet.owner.name}</p>
                      <p className="text-xs text-secondary-500">Full Name</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-500 flex-shrink-0">
                      <Phone size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-secondary-900">{pet.owner.phone}</p>
                      <p className="text-xs text-secondary-500">Phone</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-500 flex-shrink-0">
                      <Mail size={14} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium text-secondary-900 truncate">{pet.owner.email}</p>
                      <p className="text-xs text-secondary-500">Email</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-500 flex-shrink-0">
                      <MapPin size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-secondary-900">{pet.owner.address}</p>
                      <p className="text-xs text-secondary-500">Address</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Actions & History */}
          <div className="lg:col-span-2 space-y-6">

            {/* Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setShowNewVisit(true)}
                className="p-6 bg-white border border-primary-200 rounded-xl shadow-sm hover:shadow-md hover:border-primary-300 transition-all group flex flex-col items-center text-center gap-3 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                  <Activity size={24} />
                </div>
                <div className="z-10">
                  <h3 className="font-bold text-secondary-900">New Visit</h3>
                  <p className="text-xs text-secondary-500 mt-1">Start a new consultation or check-up</p>
                </div>
              </button>

              <button
                onClick={() => setShowVisitHistory(true)}
                className="p-6 bg-white border border-secondary-200 rounded-xl shadow-sm hover:shadow-md hover:border-primary-200 transition-all group flex flex-col items-center text-center gap-3 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                  <Clock size={24} />
                </div>
                <div className="z-10 w-full">
                  <div className="flex justify-between items-center w-full mb-1">
                    <h3 className="font-bold text-secondary-900 mx-auto">Visit History</h3>
                  </div>
                  <p className="text-xs text-secondary-500 mt-1">{visitHistory?.length || 0} past visits recorded</p>
                </div>
              </button>
            </div>

            {/* Vaccinations Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-secondary-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-secondary-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <Syringe size={18} />
                  </div>
                  <h3 className="font-bold text-secondary-900">Vaccination Record</h3>
                </div>
                <button
                  onClick={() => setIsOpen(true)}
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  View Full Record
                </button>
              </div>
              <div className="p-6">
                {pet.vaccinations?.length > 0 ? (
                  <div className="space-y-3">
                    {pet.vaccinations.slice(0, 3).map((v, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary-50 border border-secondary-100 hover:border-primary-200 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="font-medium text-secondary-800 text-sm">{v.name}</span>
                        </div>
                        <span className="text-xs font-mono text-secondary-500 bg-white px-2 py-1 rounded border border-secondary-200">
                          {v.date ? format(new Date(v.date), "MMM dd, yyyy") : 'No Date'}
                        </span>
                      </div>
                    ))}
                    {pet.vaccinations.length > 3 && (
                      <p className="text-center text-xs text-secondary-400 mt-2">
                        +{pet.vaccinations.length - 3} more records
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 text-secondary-400">
                    <Syringe size={32} className="mx-auto mb-2 opacity-20" />
                    <p className="text-sm">No vaccination records found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity Mini-List (Optional placeholder for robustness) */}
            <div className="bg-white rounded-2xl shadow-sm border border-secondary-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-secondary-100 flex items-center gap-2">
                <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                  <FileText size={18} />
                </div>
                <h3 className="font-bold text-secondary-900">Recent Notes</h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-secondary-500 italic">No recent clinical notes available.</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Popups */}
      {showNewVisit && (
        <NewVisitPopup
          pet={pet}
          onClose={() => setShowNewVisit(false)}
        />
      )}

      {showVisitHistory && (
        <VisitHistoryPopup
          visits={visitHistory}
          onClose={() => setShowVisitHistory(false)}
        />
      )}

      <VaccinationPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        vaccinations={pet.vaccinations || []}
      />

    </div>
  );
};

PetDetails.propTypes = {
  petId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default PetDetails;