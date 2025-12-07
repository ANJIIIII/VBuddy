import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import VisitHistoryDetails from "./VisitHistoryDetails";
import { getVisitList } from "../../store/slices/visitSlice";
import { ArrowLeft, Search, Calendar, User, Phone, DollarSign, Filter } from "lucide-react";

const SalesHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visitDetails, setVisitDetails] = useState(null);
  const [list, setList] = useState([]);

  const onClose = () => {
    setVisitDetails(null);
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (name) params.append("name", name.trim());
      if (purpose) params.append("purpose", purpose.trim());
      if (date) params.append("date", date.trim());
      const queryString = params.toString();

      setIsLoading(true);
      dispatch(getVisitList(queryString))
        .then((data) => {
          if (data?.payload?.success) {
            setList(data?.payload?.List);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [name, purpose, date, dispatch]);

  if (visitDetails) {
    return <VisitHistoryDetails visitdetails={visitDetails} onClose={onClose} />;
  }

  return (
    <div className="min-h-screen bg-secondary-50/30 p-4 md:p-8 animate-in fade-in">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-white border border-secondary-200 text-secondary-600 hover:text-primary-600 hover:border-primary-200 transition-all shadow-sm"
              aria-label="Go Back"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">Sales History</h1>
              <p className="text-secondary-500 text-sm">Track daily visits and revenue</p>
            </div>
          </div>

          {/* Date Picker */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-secondary-200 shadow-sm">
            <Calendar size={18} className="text-secondary-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-sm font-medium text-secondary-700 outline-none"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-secondary-400 w-4 h-4" />
            <input
              type="text"
              value={name}
              placeholder="Search by Pet Name..."
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-2.5 text-secondary-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Filter by Purpose..."
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-sm border border-secondary-200">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
            {!list || list.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-secondary-400">
                <Calendar size={48} className="mb-4 opacity-20" />
                <p className="text-lg font-medium text-secondary-600">No records found</p>
                <p className="text-sm">Try adjusting your filters or date.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-secondary-50 border-b border-secondary-100 text-xs uppercase tracking-wider text-secondary-500 font-semibold">
                      <th className="px-6 py-4">Pet Details</th>
                      <th className="px-6 py-4">Owner</th>
                      <th className="px-6 py-4">Purpose</th>
                      <th className="px-6 py-4 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary-100">
                    {list.map((item, idx) => (
                      <tr
                        key={idx}
                        onClick={() => setVisitDetails(item)}
                        className="hover:bg-secondary-50/50 transition-colors cursor-pointer group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-secondary-900">{item?.pet?.name}</span>
                            <span className="text-xs text-secondary-500">{item?.pet?.species}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="flex items-center gap-1.5 text-sm font-medium text-secondary-700">
                              <User size={14} className="text-secondary-400" />
                              {item?.pet?.owner?.name || "N/A"}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-secondary-500">
                              <Phone size={12} className="text-secondary-400" />
                              {item?.pet?.owner?.phone || "N/A"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
                            {item?.visitType?.purpose}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-bold text-secondary-900 flex items-center justify-end">
                            ₹{(item?.details?.price || 0).toLocaleString('en-IN')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesHistory;
