import React, { useState } from "react";
import { addInventoryItem } from "../../store/slices/inventorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Package, Tag, Layers, Beaker, IndianRupee, Save, Archive, AlertCircle, ArrowLeft } from "lucide-react";

const InventoryForm = () => {
  const { addInventoryLoading } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: "",
    stockUnit: 0,
    itemType: "disposable",
    volumeML: 0,
    totalVolume: 0,
    recommendedDoses: 0,
    unitCostPrice: 0,
    unitMinRetailPriceNGO: 0,
    unitMaxRetailPriceCustomer: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addInventoryItem(formData))
      .then((data) => {
        if (data?.payload?.success) {
          alert("Inventory item added successfully!");
          resetForm();
          navigate(-1);
        } else alert(data?.payload?.message || "Error adding item");
      })
      .catch((err) => {
        alert("Failed to add inventory item");
      });
  };

  const resetForm = () => {
    setFormData({
      itemName: "",
      stockUnit: 0,
      itemType: "disposable",
      volumeML: 0,
      totalVolume: 0,
      recommendedDoses: 0,
      unitCostPrice: 0,
      unitMinRetailPriceNGO: 0,
      unitMaxRetailPriceCustomer: 0,
    });
  }

  return (
    <div className="min-h-screen bg-secondary-50/30 p-4 md:p-8 animate-in fade-in">
      <div className="max-w-4xl mx-auto">
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

        {addInventoryLoading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-sm border border-secondary-200">
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent"></div>
              <p className="text-secondary-500 text-sm">Saving to inventory...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-secondary-100 bg-secondary-50/50 flex items-center gap-2">
              <Archive className="text-primary-500" size={20} />
              <h2 className="font-semibold text-secondary-900">Item Details</h2>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Basic Info */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Item Name *</label>
                <div className="relative">
                  <Package className="absolute left-3 top-2.5 text-secondary-400 w-4 h-4" />
                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    required
                    className="w-full pl-9 pr-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-secondary-300"
                    placeholder="e.g. Paracetamol 500mg"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Category *</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-2.5 text-secondary-400 w-4 h-4" />
                  <select
                    name="itemType"
                    value={formData.itemType}
                    onChange={handleChange}
                    required
                    className="w-full pl-9 pr-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all appearance-none"
                  >
                    <option value="disposable">Disposable</option>
                    <option value="syringe">Syringe</option>
                    <option value="medicine">Medicine</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Stock Quantity *</label>
                <div className="relative">
                  <Layers className="absolute left-3 top-2.5 text-secondary-400 w-4 h-4" />
                  <input
                    type="number"
                    name="stockUnit"
                    value={formData.stockUnit}
                    onChange={handleChange}
                    required
                    className="w-full pl-9 pr-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    placeholder="0"
                  />
                </div>
              </div>

              {formData.itemType !== "medicine" && (
                <div className="md:col-span-2 bg-secondary-50 border border-secondary-100 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-bottom-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Volume (ml)</label>
                    <div className="relative">
                      <Beaker className="absolute left-3 top-2.5 text-secondary-400 w-4 h-4" />
                      <input
                        type="number"
                        name="volumeML"
                        value={formData.volumeML}
                        onChange={handleChange}
                        className="w-full pl-9 pr-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Total Volume</label>
                    <input
                      type="number"
                      name="totalVolume"
                      value={formData.totalVolume}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Rec. Doses</label>
                    <input
                      type="number"
                      name="recommendedDoses"
                      value={formData.recommendedDoses}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="md:col-span-2 pt-4 border-t border-secondary-100">
                <h3 className="text-sm font-bold text-secondary-900 flex items-center gap-2 mb-4">
                  <IndianRupee size={16} className="text-primary-500" /> Pricing Configuration
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Cost Price</label>
                    <input
                      type="number"
                      name="unitCostPrice"
                      value={formData.unitCostPrice}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Min Price (NGO)</label>
                    <input
                      type="number"
                      name="unitMinRetailPriceNGO"
                      value={formData.unitMinRetailPriceNGO}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Max Price (Customer)</label>
                    <input
                      type="number"
                      name="unitMaxRetailPriceCustomer"
                      value={formData.unitMaxRetailPriceCustomer}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="px-6 py-4 bg-secondary-50 border-t border-secondary-100 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 font-medium text-sm"
              >
                <Save size={18} />
                Add to Inventory
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default InventoryForm;
