import { format } from "date-fns";
import PropTypes from "prop-types";
import { X, Calendar, Clock, ShoppingBag, IndianRupee, Pill } from "lucide-react";

const VisitHistoryPopup = ({ visits, onClose }) => {
  return (
    <div className="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">

        {/* Header */}
        <div className="px-6 py-4 border-b border-secondary-100 flex justify-between items-center bg-secondary-50/50">
          <div className="flex items-center gap-2">
            <div className="bg-secondary-100 p-2 rounded-lg text-secondary-600">
              <Clock size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-secondary-900">Visit History</h2>
              <p className="text-secondary-500 text-xs text-left">Previous consultations and purchases</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-secondary-400 hover:text-secondary-600 p-1 hover:bg-secondary-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {visits && visits.length > 0 ? (
            <div className="space-y-4">
              {visits.map((visit) => (
                <div key={visit._id} className="group bg-white border border-secondary-200 rounded-xl p-4 hover:border-primary-200 hover:shadow-sm transition-all shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                        <Calendar size={14} />
                      </div>
                      <div>
                        <h3 className="font-bold text-secondary-900">{visit.purpose || "General Visit"}</h3>
                        <p className="text-xs text-secondary-500 flex items-center gap-1 mt-0.5">
                          {format(new Date(visit.createdAt), "PPP")}
                          <span className="w-1 h-1 rounded-full bg-secondary-300"></span>
                          {format(new Date(visit.createdAt), "p")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-secondary-50 border border-secondary-100 text-secondary-900 font-bold text-sm">
                        <IndianRupee size={12} className="mr-0.5" />
                        {visit.price ? visit.price.toFixed(2) : '0.00'}
                      </span>
                    </div>
                  </div>

                  {visit?.itemDetails && visit.itemDetails.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-secondary-100 bg-secondary-50/30 -mx-4 px-4 pb-0">
                      <p className="text-xs font-semibold text-secondary-500 mb-2 uppercase tracking-wide flex items-center gap-1">
                        <ShoppingBag size={12} /> Items Billed
                      </p>
                      <ul className="space-y-2 pb-2">
                        {visit.itemDetails.map((item, idx) => (
                          <li key={idx} className="flex justify-between items-center text-sm">
                            <span className="text-secondary-700 flex items-center gap-2">
                              <Pill size={12} className="text-secondary-400" />
                              {item.item?.itemName || "Unknown Item"}
                            </span>
                            <span className="text-secondary-500 text-xs bg-white px-2 py-0.5 rounded border border-secondary-200">
                              {item.dose ? `${item.dose} dose` : ''}
                              {item.volumeML ? ` • ${item.volumeML}ml` : ''}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-secondary-400 opacity-60 min-h-[200px]">
              <Clock size={48} className="mb-4" />
              <p>No visit history found.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-secondary-50 p-4 border-t border-secondary-100 text-center">
          <p className="text-xs text-secondary-500">Showing {visits?.length || 0} records</p>
        </div>
      </div>
    </div>
  );
};

VisitHistoryPopup.propTypes = {
  visits: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      purpose: PropTypes.string,
      itemDetails: PropTypes.arrayOf(
        PropTypes.shape({
          item: PropTypes.shape({
            itemName: PropTypes.string,
          }),
          dose: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          volumeML: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
      ),
      price: PropTypes.number,
    })
  ),
  onClose: PropTypes.func.isRequired,
};

export default VisitHistoryPopup;
