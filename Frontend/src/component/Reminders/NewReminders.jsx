import React, { useEffect, useState } from "react";
import "../../App.css";
import {
  getRemindersList,
  sendReminders,
} from "../../store/slices/remindersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Bell, Calendar } from "lucide-react";

const NewReminders = () => {
  const { List } = useSelector((state) => state.reminders);
  const [date, setdate] = useState(new Date().toISOString().split("T")[0]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const remindAll = () => {

    setIsLoading(true);
    dispatch(sendReminders(date))
      .then((data) => {
        if (data?.payload?.success) {
          alert("Reminders will be sent");
        } else alert("Error in sending reminders");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(true);
      dispatch(getRemindersList(date))
        .then((data) => {

        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [date, dispatch]);
  return (
    <div className="min-h-screen bg-secondary-50/30 p-4 md:p-8 animate-in fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">

          {/* Date Panel on Left */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-secondary-200 shadow-sm w-full md:w-auto">
            <Calendar size={18} className="text-secondary-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setdate(e.target.value)}
              className="text-sm font-medium text-secondary-700 outline-none w-full"
            />
          </div>

          {/* Remind All Button on Right */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={remindAll}
              disabled={isLoading || !List || List.length === 0}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-secondary-900 text-white rounded-lg hover:bg-secondary-800 transition-all shadow-md shadow-secondary-900/20 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
            >
              <Bell size={18} />
              Remind All
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-sm border border-secondary-200">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
            {!List || List?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-secondary-400">
                <Bell size={48} className="mb-4 opacity-20" />
                <p className="text-lg font-medium text-secondary-600">No Reminders for Chosen Date</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-secondary-900 border-b border-secondary-100 text-xs uppercase tracking-wider text-white font-semibold">
                      <th className="px-6 py-4 text-center">No.</th>
                      <th className="px-6 py-4 text-center">Pet Name</th>
                      <th className="px-6 py-4 text-center">Owner Name</th>
                      <th className="px-6 py-4 text-center">Contact</th>
                      <th className="px-6 py-4 text-center">Purpose</th>
                      <th className="px-6 py-4 text-center">Scheduled Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary-100">
                    {List?.map((item, idx) => {
                      return (
                        <tr className="hover:bg-secondary-50/50 transition-colors" key={idx}>
                          <td className="px-6 py-4 text-center">{idx + 1}</td>
                          <td className="px-6 py-4 text-center font-medium text-secondary-900">
                            {item?.petName}
                          </td>
                          <td className="px-6 py-4 text-center text-secondary-700">
                            {item?.ownerName}
                          </td>
                          <td className="px-6 py-4 text-center text-secondary-500">
                            {item?.contact}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
                              {item?.purpose}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center text-secondary-500">
                            {item?.scheduledDate?.substring(0, 10) || "NA"}
                          </td>
                        </tr>
                      );
                    })}
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

export default NewReminders;
