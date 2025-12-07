import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterPetsByNameAndPhone, getPetDetails } from "../../store/slices/petSlice";
import { Search, Plus, Filter, Edit, User, Phone, Mail, MapPin, Activity, Syringe, ChevronRight, Save } from "lucide-react";
import VaccinationPopup from "./VaccinationPopup";
import EditPetInfo from "./EditPetInfo";
import EditOwnerInfo from "./EditOwnerDetails";

const DogHistory = () => {
  const { petList, getPetListLoading, petDetails } = useSelector((state) => state.pets);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state for filters
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // UI State
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [showVaccinationPopup, setShowVaccinationPopup] = useState(false);
  const [showEditPet, setShowEditPet] = useState(false);
  const [showEditOwner, setShowEditOwner] = useState(false);

  // Debounced Filter
  useEffect(() => {
    let timeout = setTimeout(() => {
      const params = new URLSearchParams();
      params.append("name", name.trim());
      params.append("phone", phone.trim());
      const queryString = params.toString();
      dispatch(filterPetsByNameAndPhone(queryString)).catch(err => console.error(err));
    }, 500);
    return () => clearTimeout(timeout);
  }, [name, phone, dispatch]);

  const fetchDogDetails = async (id) => {
    setSelectedPetId(id);
    dispatch(getPetDetails(id));
  };

  const navigateToVisit = (_id) => {
    navigate(`/nvisit2`, { state: { _id } });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] gap-6 p-1">
      {/* Header Actions */}
      {/* Header Actions */}
      <div className="flex justify-end items-center gap-4">
        <div className="flex items-center gap-3">

          <Link to="/pet">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md shadow-primary-600/20 text-sm font-medium">
              <Plus size={16} />
              Add New Pet
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 min-h-0">

        {/* Left Panel: Pet List */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-col bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
          {/* Search Header */}
          <div className="p-4 border-b border-secondary-100 space-y-3 bg-secondary-50/50">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-secondary-400 w-4 h-4" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Search by name..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 text-secondary-400 w-4 h-4" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Search by phone..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              />
            </div>
            <div className="text-xs text-secondary-500 font-medium px-1">
              {petList ? `Found ${petList.length} pets` : 'Loading...'}
            </div>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {getPetListLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent"></div>
              </div>
            ) : petList?.length > 0 ? (
              petList.map((pet) => (
                <button
                  key={pet._id}
                  onClick={() => fetchDogDetails(pet._id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 group relative
                    ${selectedPetId === pet._id
                      ? 'bg-primary-50 border-primary-200 shadow-sm ring-1 ring-primary-200'
                      : 'hover:bg-secondary-50 border border-transparent'}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className={`font-semibold text-sm ${selectedPetId === pet._id ? 'text-primary-900' : 'text-secondary-900'}`}>{pet.name}</h3>
                      <p className="text-xs text-secondary-500 mt-0.5">{pet.breed || pet.species || 'Unknown Breed'}</p>
                    </div>
                    {selectedPetId === pet._id && <ChevronRight size={16} className="text-primary-500" />}
                  </div>
                  {pet.owner && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-secondary-400">
                      <User size={10} />
                      <span className="truncate max-w-[120px]">{pet.owner.name}</span>
                    </div>
                  )}
                </button>
              ))
            ) : (
              <div className="text-center py-10 px-4 text-secondary-400 text-sm">
                No pets found. Try adjusting filters.
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Pet Details */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden min-h-[500px]">
          {petDetails ? (
            <div className="flex flex-col h-full">
              {/* Toolbar */}
              <div className="px-6 py-4 border-b border-secondary-100 flex justify-between items-center bg-secondary-50/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-xl">
                    {petDetails.species === 'cat' ? '🐱' : petDetails.species === 'dog' ? '🐶' : '🐾'}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-secondary-900">{petDetails.name}</h2>
                    <div className="flex items-center gap-2 text-sm text-secondary-500">
                      <span className="capitalize">{petDetails.species}</span>
                      <span>•</span>
                      <span>{petDetails.breed}</span>
                      {petDetails.neutered && (
                        <>
                          <span>•</span>
                          <span className="text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full text-xs font-medium">Neutered</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigateToVisit(petDetails._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary-900 text-white rounded-lg hover:bg-secondary-800 transition-colors shadow-md shadow-secondary-900/10 text-sm font-medium"
                  >
                    <Activity size={16} />
                    New Visit
                  </button>
                  {!showEditPet && !showEditOwner && (
                    <button
                      onClick={() => setShowEditPet(true)}
                      className="p-2 text-secondary-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="Edit Pet">
                      <Edit size={18} />
                    </button>
                  )}
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {showEditPet ? (
                  <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-secondary-900">Edit Pet Details</h3>
                      <button
                        onClick={() => setShowEditPet(false)}
                        className="px-4 py-2 text-secondary-600 bg-secondary-50 hover:bg-secondary-100 rounded-lg text-sm font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                    <EditPetInfo pet={petDetails} onCancel={() => setShowEditPet(false)} />
                  </div>
                ) : showEditOwner ? (
                  <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-secondary-900">Edit Owner Details</h3>
                      <button
                        onClick={() => setShowEditOwner(false)}
                        className="px-4 py-2 text-secondary-600 bg-secondary-50 hover:bg-secondary-100 rounded-lg text-sm font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                    <EditOwnerInfo owner={petDetails.owner} onCancel={() => setShowEditOwner(false)} />
                  </div>
                ) : (
                  <>
                    {/* Pet Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="p-4 bg-secondary-50 rounded-xl border border-secondary-100">
                        <span className="text-xs font-medium text-secondary-500 uppercase tracking-wider">Sex</span>
                        <p className="mt-1 font-semibold text-secondary-900">{petDetails.sex || 'Unknown'}</p>
                      </div>
                      <div className="p-4 bg-secondary-50 rounded-xl border border-secondary-100">
                        <span className="text-xs font-medium text-secondary-500 uppercase tracking-wider">Color</span>
                        <p className="mt-1 font-semibold text-secondary-900">{petDetails.color || 'Unknown'}</p>
                      </div>
                      <div className="p-4 bg-secondary-50 rounded-xl border border-secondary-100">
                        <span className="text-xs font-medium text-secondary-500 uppercase tracking-wider">Age</span>
                        <p className="mt-1 font-semibold text-secondary-900">
                          {petDetails.dob ?
                            `${Math.floor((new Date() - new Date(petDetails.dob)) / (365.25 * 24 * 60 * 60 * 1000))} years`
                            : 'Unknown'}
                        </p>
                      </div>
                      <div className="p-4 bg-secondary-50 rounded-xl border border-secondary-100">
                        <span className="text-xs font-medium text-secondary-500 uppercase tracking-wider">DOB</span>
                        <p className="mt-1 font-semibold text-secondary-900">
                          {petDetails.dob ? new Date(petDetails.dob).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Owner Info Card */}
                      <div className="bg-white rounded-xl border border-secondary-200 shadow-sm overflow-hidden h-fit">
                        <div className="px-5 py-3 border-b border-secondary-100 bg-secondary-50/50 flex justify-between items-center">
                          <h3 className="font-semibold text-secondary-800 flex items-center gap-2">
                            <User size={18} className="text-primary-500" /> Owner Details
                          </h3>
                          <button
                            onClick={() => setShowEditOwner(true)}
                            className="text-xs font-medium text-primary-600 hover:text-primary-700"
                          >
                            Edit
                          </button>
                        </div>
                        {petDetails.owner ? (
                          <div className="p-5 space-y-4">
                            <div className="flex items-start gap-3">
                              <User className="text-secondary-400 mt-0.5" size={16} />
                              <div>
                                <p className="text-sm font-medium text-secondary-900">{petDetails.owner.name}</p>
                                <p className="text-xs text-secondary-500">Name</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Phone className="text-secondary-400 mt-0.5" size={16} />
                              <div>
                                <p className="text-sm font-medium text-secondary-900">{petDetails.owner.phone}</p>
                                <p className="text-xs text-secondary-500">Phone</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Mail className="text-secondary-400 mt-0.5" size={16} />
                              <div>
                                <p className="text-sm font-medium text-secondary-900 break-all">{petDetails.owner.email}</p>
                                <p className="text-xs text-secondary-500">Email</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <MapPin className="text-secondary-400 mt-0.5" size={16} />
                              <div>
                                <p className="text-sm font-medium text-secondary-900">{petDetails.owner.address || "No address provided"}</p>
                                <p className="text-xs text-secondary-500">Address</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-5 text-center text-secondary-400">No owner information</div>
                        )}
                      </div>

                      {/* Vaccinations Card */}
                      <div className="bg-white rounded-xl border border-secondary-200 shadow-sm overflow-hidden h-fit">
                        <div className="px-5 py-3 border-b border-secondary-100 bg-secondary-50/50 flex justify-between items-center">
                          <h3 className="font-semibold text-secondary-800 flex items-center gap-2">
                            <Syringe size={18} className="text-primary-500" /> Vaccinations
                          </h3>
                          <button
                            onClick={() => setShowVaccinationPopup(true)}
                            className="text-xs font-medium text-primary-600 hover:text-primary-700"
                          >
                            View All
                          </button>
                        </div>
                        <div className="p-5">
                          {petDetails.vaccinations && petDetails.vaccinations.length > 0 ? (
                            <div className="space-y-3">
                              {petDetails.vaccinations.slice(0, 3).map((v, i) => (
                                <div key={i} className="flex justify-between items-center p-2 rounded bg-secondary-50">
                                  <span className="text-sm font-medium text-secondary-700">{v.name}</span>
                                  <span className="text-xs bg-white border border-secondary-200 px-2 py-1 rounded text-secondary-600 shadow-sm">
                                    {v.date ? new Date(v.date).toLocaleDateString() : 'N/A'}
                                  </span>
                                </div>
                              ))}
                              {petDetails.vaccinations.length > 3 && (
                                <p className="text-xs text-center text-secondary-500 mt-2">
                                  +{petDetails.vaccinations.length - 3} more vaccinations
                                </p>
                              )}
                            </div>
                          ) : (
                            <div className="text-center py-4">
                              <p className="text-sm text-secondary-400 mb-2">No vaccinations recorded</p>
                              <button onClick={() => setShowEditPet(true)} className="text-xs text-primary-600 hover:underline">Add Record</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-secondary-50/30">
              <div className="bg-white p-6 rounded-full shadow-md mb-4">
                <Dog size={48} className="text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-secondary-800">Select a Pet</h3>
              <p className="text-secondary-500 max-w-sm mt-2">
                Click on a pet from the list on the left to view their detailed records, owner information, and vaccination history.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Popup Component */}
      <VaccinationPopup
        isOpen={showVaccinationPopup}
        onClose={() => setShowVaccinationPopup(false)}
        vaccinations={petDetails?.vaccinations || []}
      />
    </div>
  );
};

// Helper component for Icon (since lucide Dog conflicts with component name if not careful, but here it's fine)
const Dog = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 5.172C10 3.782 8.423 2.5 6.5 2.5c-1.923 0-3.5 1.282-3.5 2.672 0 .647.348 1.238.92 1.67C2.436 7.55 1.5 8.944 1.5 10.5c0 2.21 2.239 4 5 4s5-1.79 5-4c0-1.556-.936-2.95-2.42-3.658.572-.432.92-1.023.92-1.67Z" />
    <path d="M13.5 10.5c0-2.21-2.239-4-5-4" />
    <path d="M17.5 5.172C17.5 3.782 19.077 2.5 21 2.5c1.923 0 3.5 1.282 3.5 2.672 0 .647-.348 1.238-.92 1.67 1.484.708 2.42 2.102 2.42 3.658 0 2.21-2.239 4-5 4s-5-1.79-5-4c0-1.556.936-2.95 2.42-3.658-.572-.432-.92-1.023-.92-1.67Z" />
    <path d="M22.5 14.5c0 2.21-2.239 4-5 4s-5-1.79-5-4" />
    <path d="M12 16.5c2.761 0 5 1.79 5 4s-2.239 4-5 4-5-1.79-5-4 2.239-4 5-4Z" />
  </svg>
)

export default DogHistory;
