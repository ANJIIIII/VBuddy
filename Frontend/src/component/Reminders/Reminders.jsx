import React, { useEffect, useState } from "react";
import RemindersTable from "./RemindersTable";
import BirthdayTable from "./BirthdayTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { ArrowLeft, Calendar, Bell, ClipboardCheck } from "lucide-react";

const Reminders = () => {
  const [list, setList] = useState([]);
  const [section, setSection] = useState("today");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getVisits = async (sectionType) => {
    const params = new URLSearchParams();
    if (sectionType) params.append("type", sectionType);
    const queryString = params.toString();

    const token = localStorage.getItem("authtoken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/getvisits?${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          }
        }
      );

      if (response?.status === 401) {
        return dispatch(logout());
      }

      const data = await response.json();
      setList(data?.List || []);
    } catch (error) {
      console.error("Failed to fetch visits", error);
    }
  };

  const remindAll = async () => {
    const res = confirm("Reminders will be sent to the listed people. Continue?");
    if (!res) return;

    const List = list.map((item) => ({
      name: item?.pet?.name,
      breed: item?.pet?.breed,
      species: item?.pet?.species,
      ownerName: item?.pet?.owner?.name,
      ownerEmail: item?.pet?.owner?.email,
      date: item?.nextFollowUp,
    }));

    const token = localStorage.getItem("authtoken") || "";
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/reminders/sendreminders`,
        {
          method: "POST",
          headers: {
            "Authorization": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ List }),
        }
      );

      if (response?.status === 401) dispatch(logout());
      await response.json();
      alert("Reminders sent successfully!");
    } catch (error) {
      alert("Failed to send reminders");
    }
  };

  useEffect(() => {
    if (section !== "birthday") getVisits(section);
  }, [section, dispatch]);

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
            <div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 text-secondary-400 w-4 h-4" />
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-700 shadow-sm focus:ring-2 focus:ring-primary-500 outline-none appearance-none cursor-pointer"
              >
                <option value="today">Today's Reminders</option>
                <option value="next week">Upcoming (Next Week)</option>
                <option value="birthday">Birthday Reminders</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-secondary-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            <button
              onClick={() => navigate("/attendance")}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary-900 text-white rounded-lg hover:bg-secondary-800 transition-all shadow-md shadow-secondary-900/20 text-sm font-medium"
            >
              <ClipboardCheck size={16} />
              Attendance
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden min-h-[400px]">
          {section !== "birthday" ? (
            <RemindersTable list={list} remindAll={remindAll} />
          ) : (
            <BirthdayTable />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reminders;
