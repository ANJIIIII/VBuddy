import React, { useEffect, useState } from "react";
import { getAttendance, updateAttendance } from "../../store/slices/attendanceSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Save, Bell, ClipboardCheck, User, Phone } from "lucide-react";

const Attendance = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const { attendanceListLoading } = useSelector((state) => state.attendance);
  const [presentIds, setPresentIds] = useState([]);
  const [absentIds, setAbsentIds] = useState([]);
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateAttendance = async (date) => {
    dispatch(updateAttendance({ date, presentIds, absentIds }))
      .then((data) => {
        if (data?.payload?.success) {
          setList(data?.payload?.List);
          alert("Attendance updated successfully");
        } else alert(data?.payload?.message || "Failed to update attendance");
      })
      .catch((err) => {
        alert("Error updating attendance");
      });
  };

  const remindAll = async () => {
    const res = confirm("Reminders will be sent to all absentees. Continue?");
    if (!res) return;

    const token = localStorage.getItem("authtoken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/reminders/sendoverduereminders`,
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
            "Accept-Type": "application/json",
          },
          body: JSON.stringify({ date }),
        }
      );

      if (response.status === 401) return dispatch(logout());

      const data = await response.json();
      if (data?.success) {
        alert("Reminders sent successfully to absentees");
      } else {
        alert("Error sending reminders");
      }
    } catch (e) {
      alert("Error sending reminders");
    }
  };

  const handleCheckboxChange = (id) => {
    const updatedList = list.map((item) => {
      if (item._id === id) {
        const updatedPresent = !item.present;
        // Update present and absent lists
        if (updatedPresent) {
          setPresentIds((prev) => [...prev, id]);
          setAbsentIds((prev) => prev.filter((pid) => pid !== id));
        } else {
          setAbsentIds((prev) => [...prev, id]);
          setPresentIds((prev) => prev.filter((pid) => pid !== id));
        }
        return { ...item, present: updatedPresent };
      }
      return item;
    });
    setList(updatedList);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(getAttendance(date)).then((data) => {
        if (data?.payload?.success) {
          setList(data?.payload?.List || []);
        } else setList([]);
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [date, dispatch]);

  return (
    <div className="min-h-screen bg-secondary-50/30 p-4 md:p-8 animate-in fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-white border border-secondary-200 text-secondary-600 hover:text-primary-600 hover:border-primary-200 transition-all shadow-sm"
              aria-label="Go Back"
            >
              <ArrowLeft size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-secondary-200 shadow-sm w-full md:w-auto">
            <Calendar size={18} className="text-secondary-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-sm font-medium text-secondary-700 outline-none w-full"
            />
          </div>
        </div>

        {/* Content */}
        {attendanceListLoading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-sm border border-secondary-200">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
            {!list || list.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-secondary-400">
                <ClipboardCheck size={48} className="mb-4 opacity-20" />
                <p className="text-lg font-medium text-secondary-600">No scheduled visits</p>
                <p className="text-sm">No follow-ups found for this date.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-secondary-900 border-b border-secondary-100 text-xs uppercase tracking-wider text-white font-semibold">
                        <th className="px-6 py-4">Pet Info</th>
                        <th className="px-6 py-4">Owner</th>
                        <th className="px-6 py-4">Purpose</th>
                        <th className="px-6 py-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary-100">
                      {list.map((item, idx) => (
                        <tr key={idx} className="hover:bg-secondary-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-semibold text-secondary-900">{item?.petId?.name}</span>
                              <span className="text-xs text-secondary-500">{item?.petId?.species}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              <span className="flex items-center gap-1.5 text-sm font-medium text-secondary-700">
                                <User size={14} className="text-secondary-400" />
                                {item?.petId?.owner?.name}
                              </span>
                              <span className="flex items-center gap-1.5 text-xs text-secondary-500">
                                <Phone size={12} className="text-secondary-400" />
                                {item?.petId?.owner?.phone}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
                              {item?.purpose}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <label className="inline-flex items-center cursor-pointer relative">
                              <input
                                type="checkbox"
                                checked={item?.present}
                                onChange={() => handleCheckboxChange(item?._id)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                              <span className="ml-3 text-sm font-medium text-secondary-700">{item?.present ? 'Present' : 'Absent'}</span>
                            </label>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Sticky Footer for Actions */}
                <div className="bg-secondary-50 p-4 border-t border-secondary-100 flex flex-col sm:flex-row justify-end gap-3 sticky bottom-0">
                  <button
                    onClick={remindAll}
                    className="flex items-center justify-center gap-2 px-6 py-2 bg-white border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-100 transition-all font-medium text-sm shadow-sm"
                  >
                    <Bell size={18} />
                    Remind Absentees
                  </button>
                  <button
                    onClick={() => handleUpdateAttendance(date)}
                    className="flex items-center justify-center gap-2 px-6 py-2 bg-secondary-900 text-white rounded-lg hover:bg-secondary-800 transition-all shadow-md shadow-secondary-900/20 font-medium text-sm"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
