
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "company-profile", label: "Company Profile" },
  { id: "departments", label: "Department Creation" },
  { id: "leave-policies", label: "Custom Leave Policies" },
  { id: "holidays", label: "Holiday Calendar" },
];

export default function SettingsPage() {
  const [selectedTab, setSelectedTab] = useState("company-profile");

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings & Configuration</h1>
        <p className="text-slate-400">Manage your organization's settings and configurations</p>
      </div>
      
      <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Configuration Options</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tab Buttons */}
          <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-lg backdrop-blur-xl border border-slate-700 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all text-sm ${
                  selectedTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-4">
            {selectedTab === "company-profile" && (
              <div>
                <h2 className="text-lg font-semibold text-slate-200 mb-2">Company Profile</h2>
                <p className="text-slate-400 mb-1">Manage your organization’s details, logo, industry, and contact information here.</p>
                <div className="rounded bg-slate-700/50 p-4 text-slate-300">
                  {/* Placeholder content */}
                  <div className="mb-2">Company Name: <span className="font-semibold">[Your Company Name]</span></div>
                  <div className="mb-2">Industry: <span>[e.g., Technology]</span></div>
                  <div className="mb-2">Contact Email: <span>info@example.com</span></div>
                  <div>Address: <span>123 Corporate Address, City, Country</span></div>
                </div>
              </div>
            )}
            {selectedTab === "departments" && (
              <div>
                <h2 className="text-lg font-semibold text-slate-200 mb-2">Department Creation</h2>
                <p className="text-slate-400 mb-3">
                  Add, edit, or remove company departments.
                </p>
                <div className="rounded bg-slate-700/50 p-4 text-slate-300">
                  {/* Placeholder department list */}
                  <ul className="list-disc pl-6">
                    <li>Human Resources</li>
                    <li>Engineering</li>
                    <li>Sales & Marketing</li>
                  </ul>
                  <div className="mt-4 text-xs text-slate-400">Department management UI will appear here.</div>
                </div>
              </div>
            )}
            {selectedTab === "leave-policies" && (
              <div>
                <h2 className="text-lg font-semibold text-slate-200 mb-2">Custom Leave Policies</h2>
                <p className="text-slate-400 mb-3">
                  Set up company-specific leave types and policies.
                </p>
                <div className="rounded bg-slate-700/50 p-4 text-slate-300">
                  {/* Placeholder leave policy list */}
                  <ul className="list-disc pl-6">
                    <li>Paid Leave: 18 days/year</li>
                    <li>Sick Leave: 12 days/year</li>
                    <li>Casual Leave: 6 days/year</li>
                  </ul>
                  <div className="mt-4 text-xs text-slate-400">Leave policy customization UI will appear here.</div>
                </div>
              </div>
            )}
            {selectedTab === "holidays" && (
              <div>
                <h2 className="text-lg font-semibold text-slate-200 mb-2">Holiday Calendar</h2>
                <p className="text-slate-400 mb-3">
                  View or set official company holidays.
                </p>
                <div className="rounded bg-slate-700/50 p-4 text-slate-300">
                  {/* Placeholder holiday list */}
                  <ul className="list-disc pl-6">
                    <li>01 Jan - New Year's Day</li>
                    <li>26 Jan - Republic Day</li>
                    <li>15 Aug - Independence Day</li>
                  </ul>
                  <div className="mt-4 text-xs text-slate-400">Holiday management UI will appear here.</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
