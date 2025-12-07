import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dog,
  Package,
  ShoppingCart,
  Calendar,
  Bell,
  Activity,
  ArrowRight
} from 'lucide-react';
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  // Simplified Card Component - Removed Gradients/Multiple Colors
  const SectionCard = ({ title, icon: Icon, actions }) => (
    <motion.div
      variants={item}
      className="bg-white rounded-2xl shadow-sm border border-secondary-200 overflow-hidden hover:border-primary-300 hover:shadow-md transition-all duration-300"
    >
      <div className="p-2 pt-4">
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => action.path ? navigate(action.path) : null}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary-50 transition-colors group text-left"
          >
            <span className="text-sm font-medium text-secondary-600 group-hover:text-primary-700 transition-colors">
              {action.label}
            </span>
            <div className="flex items-center gap-2">
              {action.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-50 text-red-600 border border-red-100 uppercase tracking-wider">
                  {action.badge}
                </span>
              )}
              <ArrowRight size={14} className="text-secondary-300 group-hover:text-primary-500 transform group-hover:translate-x-1 transition-all" />
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );

  const modules = [
    {
      title: "Pet Management",
      icon: Dog,
      actions: [
        { label: "Quick Add Pet", path: "/pet" },
        { label: "Patient Records", path: "/history" },
        { label: "Breed Master", path: "/BreedManagement" },
      ]
    },
    {
      title: "Inventory",
      icon: Package,
      actions: [
        { label: "Add Item", path: "/inventory" },
        { label: "Stock List", path: "/inventoryList" },
        { label: "Low Stock Alerts", path: "/alertlist", badge: "Action" },
      ]
    },
    {
      title: "Sales & Billing",
      icon: ShoppingCart,
      actions: [
        { label: "New Visit (POS)", path: "/petByDate" },
        { label: "Sales History", path: "/saleshistory" },
        { label: "Subscriptions", path: "/buysubscription" },
      ]
    },
    {
      title: "Clinic Operations",
      icon: Activity,
      actions: [
        { label: "Staff Attendance", path: "/attendance" },
        { label: "Reminders", path: "/reminders" },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-secondary-200 pb-6">
        
        <div className="hidden sm:block">
          <span className="text-sm font-medium text-secondary-600 bg-secondary-50 px-4 py-2 rounded-lg border border-secondary-200 flex items-center gap-2">
            <Calendar size={16} className="text-primary-500" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {modules.map((module, idx) => (
          <SectionCard key={idx} {...module} />
        ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;