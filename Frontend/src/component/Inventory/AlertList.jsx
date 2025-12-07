import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlertListOfInventory } from "../../store/slices/inventorySlice";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Package, RefreshCw } from "lucide-react";

const AlertList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inventoryList } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(getAlertListOfInventory());
  }, [dispatch]);

  const handleRefill = (id) => {
    navigate("/editInventory", { state: { id } });
  };

  return (
    <div className="min-h-screen bg-secondary-50/30 p-4 md:p-8 animate-in fade-in">
      <div className="max-w-6xl mx-auto">

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
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
          {inventoryList && inventoryList.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary-50 border-b border-secondary-100 text-xs uppercase tracking-wider text-secondary-500 font-semibold">
                    <th className="px-6 py-4">Item Name</th>
                    <th className="px-6 py-4 text-center">Remaining Stock</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-100">
                  {inventoryList.map((item, idx) => (
                    <tr key={idx} className="hover:bg-secondary-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                            <Package size={16} />
                          </div>
                          <span className="font-medium text-secondary-900">{item.itemName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
                          {item.stock} Units
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xs font-medium text-red-600 flex items-center justify-center gap-1">
                          <AlertTriangle size={12} />
                          Critical
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleRefill(item._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-secondary-200 text-secondary-700 hover:text-primary-700 hover:border-primary-200 rounded-lg text-sm font-medium transition-all shadow-sm"
                        >
                          <RefreshCw size={14} /> Refill
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-secondary-400">
              <div className="w-16 h-16 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center mb-4">
                <Package size={32} />
              </div>
              <h3 className="text-lg font-medium text-secondary-900">Good Job!</h3>
              <p className="text-sm">No inventory alerts found. Stock levels are healthy.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertList;
