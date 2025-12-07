import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVisit } from "../../store/slices/visitSlice";
import { getAllInventory } from "../../store/slices/inventorySlice";
import PropTypes from "prop-types";
import { X, Calendar, Clock, Clipboard, IndianRupee, Trash2, Plus, Stethoscope, Pill, AlertCircle } from "lucide-react";

const NewVisitPopup = ({ pet, onClose }) => {
  const dispatch = useDispatch();
  const { inventoryList } = useSelector((state) => state.inventory);

  const [visitForm, setVisitForm] = useState({
    purpose: "",
    nextFollowUp: "",
    followUpTime: "",
    followUpPurpose: "",
    customerType: "Customer", // Default changed to Customer as likely more common
    itemDetails: [],
  });

  const [otherPurpose, setOtherPurpose] = useState("");
  const [minDate, setMinDate] = useState("");

  const purposes = [
    "Select",
    "Inquiry",
    "Dog park",
    "Veterinary",
    "Boarding",
    "Day care",
    "Day school",
    "Play school",
    "Grooming",
    "Shop",
    "Others",
  ];

  useEffect(() => {
    dispatch(getAllInventory());

    // Set minimum date to today (IST)
    const today = new Date();
    const istOffset = 5.5 * 60;
    today.setMinutes(today.getMinutes() + today.getTimezoneOffset() + istOffset);
    setMinDate(today.toISOString().split("T")[0]);
  }, [dispatch]);

  const addItemRow = () => {
    setVisitForm((prev) => ({
      ...prev,
      itemDetails: [
        ...prev.itemDetails,
        { item: "", dose: "", volumeML: "", maxVolume: 0 },
      ],
    }));
  };

  const updateItemDetails = (index, field, value) => {
    const updatedItems = [...visitForm.itemDetails];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    // If updating item, set maxVolume from inventory
    if (field === "item") {
      const selectedItem = inventoryList.find((inv) => inv._id === value);
      updatedItems[index].maxVolume = selectedItem?.totalVolume || 0;
    }

    setVisitForm((prev) => ({ ...prev, itemDetails: updatedItems }));
  };

  const deleteItemRow = (index) => {
    setVisitForm((prev) => ({
      ...prev,
      itemDetails: prev.itemDetails.filter((_, i) => i !== index),
    }));
  };

  const handlePurposeChange = (e) => {
    const selectedPurpose = e.target.value;
    setVisitForm((prev) => ({ ...prev, purpose: selectedPurpose }));
    if (selectedPurpose !== "Others") setOtherPurpose("");
  };

  const calculateTotalPrice = () => {
    return visitForm.itemDetails.reduce((total, item) => {
      const inventoryItem = inventoryList.find((inv) => inv._id === item.item);
      if (!inventoryItem) return total;

      const unitPrice =
        visitForm.customerType === "NGO"
          ? inventoryItem.unitMinRetailPriceNGO
          : inventoryItem.unitMaxRetailPriceCustomer;

      const volPrice = item.volumeML / inventoryItem.volumeML;
      const price = unitPrice * (volPrice || 0);
      return total + (isNaN(price) ? 0 : price);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!visitForm.followUpPurpose) {
      alert("Please provide a purpose for the next follow-up.");
      return;
    }

    if (visitForm?.itemDetails?.length > 0) {
      if (visitForm.itemDetails.some((item) => !item.item || !item.dose)) {
        alert("Please complete all item details.");
        return;
      }
    }

    try {
      const formData = {
        petId: pet._id,
        visitForm: {
          ...visitForm,
          purpose: visitForm.purpose === "Others" ? otherPurpose : visitForm.purpose,
          itemDetails: visitForm.itemDetails.map(({ maxVolume, ...item }) => item),
        },
        totalPrice: calculateTotalPrice(),
      };

      const res = await dispatch(addVisit(formData));
      if (res?.payload?.success) {
        alert("Visit saved successfully!");
        onClose();
      }
    } catch (error) {
      alert("Failed to save visit. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">

        {/* Header */}
        <div className="px-6 py-4 border-b border-secondary-100 flex justify-between items-center bg-secondary-50/50">
          <div className="flex items-center gap-2">
            <div className="bg-primary-100 p-2 rounded-lg text-primary-600">
              <Stethoscope size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-secondary-900">New Consultation</h2>
              <p className="text-secondary-500 text-xs">For pet <span className="font-semibold text-secondary-700">{pet?.name || 'Unknown'}</span></p>
            </div>
          </div>
          <button onClick={onClose} className="text-secondary-400 hover:text-secondary-600 p-1 hover:bg-secondary-100 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <form id="visit-form" onSubmit={handleSubmit} className="space-y-6">

            {/* Visit Details Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide mb-1 block">Purpose of Visit *</label>
                <select
                  value={visitForm.purpose}
                  onChange={handlePurposeChange}
                  className="w-full px-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all appearance-none"
                >
                  {purposes.map((purpose) => (
                    <option key={purpose} value={purpose}>{purpose}</option>
                  ))}
                </select>
                {visitForm.purpose === "Others" && (
                  <input
                    type="text"
                    value={otherPurpose}
                    onChange={(e) => setOtherPurpose(e.target.value)}
                    placeholder="Specify details..."
                    className="mt-2 w-full px-4 py-2 border border-secondary-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                    required
                  />
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide mb-1 block">Client Type *</label>
                <select
                  value={visitForm.customerType}
                  onChange={(e) => setVisitForm({ ...visitForm, customerType: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                >
                  <option value="Customer">Standard Customer</option>
                  <option value="NGO">NGO (Subsidy)</option>
                </select>
              </div>
            </div>

            {/* Treatment / Items Section */}
            <div className="bg-secondary-50 rounded-xl p-4 border border-secondary-100">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-secondary-800 flex items-center gap-2">
                  <Pill size={16} className="text-primary-500" />
                  Medication & Services
                </h3>
                <button type="button" onClick={addItemRow} className="text-xs font-medium text-primary-600 hover:text-primary-700 hover:underline flex items-center gap-1">
                  <Plus size={14} /> Add Item
                </button>
              </div>

              <div className="space-y-3">
                {visitForm.itemDetails.length === 0 ? (
                  <div className="text-center py-4 text-secondary-400 text-sm italic border-2 border-dashed border-secondary-200 rounded-lg">
                    No items added yet. Click "Add Item" to bill services.
                  </div>
                ) : (
                  visitForm.itemDetails.map((item, index) => (
                    <div key={index} className="flex flex-wrap sm:flex-nowrap gap-2 items-center bg-white p-2 rounded-lg border border-secondary-200 shadow-sm">
                      <select
                        value={item.item}
                        onChange={(e) => updateItemDetails(index, "item", e.target.value)}
                        required
                        className="flex-grow min-w-[150px] px-3 py-1.5 border border-secondary-200 rounded text-sm focus:ring-1 focus:ring-primary-500 outline-none"
                      >
                        <option value="">Select Item</option>
                        {inventoryList
                          .filter((inv) => inv.totalVolume > 0 || inv.totalVolume > 100)
                          .map((inv) => (
                            <option key={inv._id} value={inv._id}>{inv.itemName}</option>
                          ))}
                      </select>
                      <input
                        type="number"
                        value={item.dose}
                        onChange={(e) => updateItemDetails(index, "dose", e.target.value)}
                        placeholder="Dose"
                        required
                        className="w-20 px-3 py-1.5 border border-secondary-200 rounded text-sm focus:ring-1 focus:ring-primary-500 outline-none"
                      />
                      <div className="relative w-24">
                        <input
                          type="number"
                          value={item.volumeML}
                          onChange={(e) => updateItemDetails(index, "volumeML", e.target.value)}
                          placeholder="mL"
                          required
                          className="w-full px-3 py-1.5 border border-secondary-200 rounded text-sm focus:ring-1 focus:ring-primary-500 outline-none pr-8"
                        />
                        <span className="absolute right-2 top-1.5 text-xs text-secondary-400">ml</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteItemRow(index)}
                        className="p-1.5 text-secondary-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Follow Up Section */}
            <div className="bg-white rounded-xl border border-secondary-200 p-4 space-y-4">
              <h3 className="text-sm font-bold text-secondary-800 flex items-center gap-2">
                <Clipboard size={16} className="text-primary-500" />
                Follow-up Plan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-secondary-500 mb-1 block">Next Appointment Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 text-secondary-400 w-4 h-4" />
                    <input
                      type="date"
                      value={visitForm.nextFollowUp}
                      onChange={(e) => setVisitForm({ ...visitForm, nextFollowUp: e.target.value })}
                      min={minDate}
                      required
                      className="w-full pl-9 pr-4 py-2 border border-secondary-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-secondary-500 mb-1 block">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 text-secondary-400 w-4 h-4" />
                    <input
                      type="time"
                      value={visitForm.followUpTime}
                      onChange={(e) => setVisitForm({ ...visitForm, followUpTime: e.target.value })}
                      required
                      className="w-full pl-9 pr-4 py-2 border border-secondary-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-secondary-500 mb-1 block">Reason for Follow-up</label>
                <input
                  type="text"
                  value={visitForm.followUpPurpose}
                  onChange={(e) => setVisitForm({ ...visitForm, followUpPurpose: e.target.value })}
                  placeholder="e.g. Vaccination booster, Stitch removal..."
                  className="w-full px-4 py-2 border border-secondary-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  required
                />
              </div>
            </div>

          </form>
        </div>

        {/* Footer with Actions */}
        <div className="px-6 py-4 border-t border-secondary-100 bg-secondary-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Estimated Total</span>
            <span className="text-2xl font-bold text-secondary-900 flex items-center">
              <IndianRupee size={20} className="mt-1" />
              {calculateTotalPrice().toFixed(2)}
            </span>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 text-secondary-600 bg-white border border-secondary-300 rounded-lg font-medium hover:bg-secondary-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="visit-form"
              className="flex-1 sm:flex-none px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium shadow-lg shadow-primary-600/20 hover:bg-primary-700 transition-all text-sm"
            >
              Confirm & Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

NewVisitPopup.propTypes = {
  pet: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewVisitPopup;
