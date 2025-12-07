import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllInventory, deleteInventoryItem } from "../../store/slices/inventorySlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Search, Plus, Trash2, Edit2, AlertTriangle, Package, ChevronDown } from "lucide-react";

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getAllInventoryLoading, deleteInventoryLoading } = useSelector((state) => state.inventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [initialInventory, setInitialInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    dispatch(getAllInventory())
      .then((data) => {
        if (data?.payload?.success) {
          setInitialInventory(data?.payload?.items);
          setInventory(data?.payload?.items);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const currentList = [...initialInventory];
    if (searchTerm) {
      const filteredList = currentList.filter((item) =>
        item?.itemName.trim().toLowerCase().startsWith(searchTerm.trim().toLowerCase())
      );
      setInventory(filteredList);
    } else setInventory(initialInventory);
  }, [searchTerm]);

  const toggleItemDetails = (itemId) => {
    setSelectedItem(selectedItem === itemId ? null : itemId);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setDeleteItemId(id);
      dispatch(deleteInventoryItem(id))
        .then((response) => {
          if (response?.payload?.success) {
            const updatedInventory = inventory.filter(item => item._id !== id);
            setInventory(updatedInventory);
            setInitialInventory(updatedInventory);
          } else {
            alert("Failed to delete item!");
          }
        })
        .catch((error) => console.error(error))
        .finally(() => setDeleteItemId(null));
    }
  };

  const handleEdit = (id) => {
    navigate(`/editInventory`, { state: { id } });
  };

  if (getAllInventoryLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">

      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
        </div>
        <div className="flex gap-3">
          <Link to="/alertlist">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-secondary-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors shadow-sm text-sm font-medium">
              <AlertTriangle size={16} />
              Low Stock Alerts
            </button>
          </Link>
          <Link to="/inventory">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md shadow-primary-600/20 text-sm font-medium">
              <Plus size={16} />
              Add Item
            </button>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-secondary-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by item name..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-secondary-200 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-secondary-900 placeholder:text-secondary-400 transition-all"
        />
      </div>

      {/* Inventory List */}
      <div className="space-y-3">
        {inventory.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-secondary-200 border-dashed">
            <Package size={48} className="mx-auto text-secondary-300 mb-3" />
            <h3 className="text-lg font-medium text-secondary-900">No Items Found</h3>
            <p className="text-secondary-500 text-sm">Try adjusting your search or add a new item.</p>
          </div>
        ) : (
          inventory.map((item) => (
            <div key={item._id} className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${selectedItem === item._id ? 'border-primary-500 shadow-md ring-1 ring-primary-500' : 'border-secondary-200 hover:border-primary-300'}`}>

              {/* List Item Header (Clickable) */}
              <div
                onClick={() => toggleItemDetails(item._id)}
                className="p-4 cursor-pointer flex justify-between items-center group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${selectedItem === item._id ? 'bg-primary-50 text-primary-600' : 'bg-secondary-50 text-secondary-400 group-hover:text-primary-600 group-hover:bg-simple-50'}`}>
                    <Package size={20} />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-sm ${selectedItem === item._id ? 'text-primary-700' : 'text-secondary-900'}`}>{item.itemName}</h3>
                    <p className="text-xs text-secondary-500">Vol: {item.volumeML}ml • Total: {item.totalVolume}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 md:gap-8">
                  <div className="text-right">
                    <p className="text-xs text-secondary-500 uppercase font-medium">Stock</p>
                    <p className={`font-bold ${item.stockUnit < 10 ? 'text-red-600' : 'text-secondary-900'}`}>{item.stockUnit}</p>
                  </div>
                  <div className="hidden sm:block text-right min-w-[80px]">
                    <p className="text-xs text-secondary-500 uppercase font-medium">Type</p>
                    <p className="text-sm text-secondary-900 bg-secondary-100 px-2 py-0.5 rounded-full inline-block mt-0.5">{item.itemType}</p>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-secondary-400 transition-transform duration-300 ${selectedItem === item._id ? 'rotate-180 text-primary-600' : ''}`}
                  />
                </div>
              </div>

              {/* Details Drawer */}
              {selectedItem === item._id && (
                <div className="border-t border-secondary-100 bg-secondary-50/50 p-6 animate-in slide-in-from-top-2 fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-2">Item Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-lg border border-secondary-100 shadow-sm">
                          <span className="text-xs text-secondary-500 block">Rec. Doses</span>
                          <span className="text-sm font-semibold text-secondary-900">{item.recommendedDoses || 'N/A'}</span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-secondary-100 shadow-sm">
                          <span className="text-xs text-secondary-500 block">Volume</span>
                          <span className="text-sm font-semibold text-secondary-900">{item.volumeML} ML</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-2">Pricing Information</h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white p-3 rounded-lg border border-secondary-100 shadow-sm">
                          <span className="text-xs text-secondary-500 block">Cost</span>
                          <span className="text-sm font-semibold text-secondary-900">${item.unitCostPrice}</span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-secondary-100 shadow-sm">
                          <span className="text-xs text-secondary-500 block">NGO</span>
                          <span className="text-sm font-semibold text-secondary-900">${item.unitMinRetailPriceNGO}</span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-secondary-100 shadow-sm">
                          <span className="text-xs text-secondary-500 block">Retail</span>
                          <span className="text-sm font-semibold text-secondary-900">${item.unitMaxRetailPriceCustomer}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-secondary-200">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleEdit(item._id); }}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-secondary-200 text-secondary-700 rounded-lg hover:bg-secondary-100 hover:text-primary-700 hover:border-primary-200 transition-all text-sm font-medium shadow-sm"
                    >
                      <Edit2 size={16} /> Edit Details
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }}
                      disabled={deleteInventoryLoading && deleteItemId === item._id}
                      className="flex items-center gap-2 px-4 py-2 bg-red-50    border border-red-100 text-red-600 rounded-lg hover:bg-red-100 hover:border-red-200 transition-all text-sm font-medium shadow-sm"
                    >
                      {deleteInventoryLoading && deleteItemId === item._id ? (
                        <span className="animate-spin h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full"></span>
                      ) : (
                        <Trash2 size={16} />
                      )}
                      Delete Item
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InventoryList;