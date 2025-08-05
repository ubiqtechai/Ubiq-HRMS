import { useState } from "react";
import { Calendar, Clock, Plus, Filter, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LeaveRequestModal from "./LeaveRequestModal";
import { toast } from "@/hooks/use-toast";

const initialLeaveRequests = [
  {
    id: "LR001",
    employee: "John Carter",
    type: "Sick Leave",
    startDate: "2024-01-15",
    endDate: "2024-01-17",
    days: 3,
    status: "Pending",
    reason: "Medical appointment and recovery",
    avatar: "JC"
  },
  {
    id: "LR002",
    employee: "Sophie Moore",
    type: "Annual Leave",
    startDate: "2024-01-20",
    endDate: "2024-01-25",
    days: 5,
    status: "Approved",
    reason: "Family vacation",
    avatar: "SM"
  },
  {
    id: "LR003",
    employee: "Matt Cannon",
    type: "Personal Leave",
    startDate: "2024-01-18",
    endDate: "2024-01-18",
    days: 1,
    status: "Rejected",
    reason: "Personal matters",
    avatar: "MC"
  }
];

const leaveBalances = [
  {
    employee: "John Carter",
    annual: { used: 8, total: 25 },
    sick: { used: 3, total: 10 },
    personal: { used: 2, total: 5 },
    avatar: "JC"
  },
  {
    employee: "Sophie Moore",
    annual: { used: 12, total: 25 },
    sick: { used: 1, total: 10 },
    personal: { used: 1, total: 5 },
    avatar: "SM"
  }
];

const Leave = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRequest, setEditingRequest] = useState<any | null>(null);

  // Convert to stateful array to allow updates
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);

  // Approve/Reject handlers
  const handleApprove = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Approved" } : req
      )
    );
    toast({
      title: "Leave Request Approved",
      description: `The leave request ${id} has been approved.`,
    });
  };

  const handleReject = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Rejected" } : req
      )
    );
    toast({
      title: "Leave Request Rejected",
      description: `The leave request ${id} has been rejected.`,
    });
  };

  const handleEdit = (request: any) => {
    setEditingRequest(request);
    setShowEditModal(true);
  };

  const handleEditSubmit = (data: {
    reason: string;
    type: string;
    startDate: string;
    endDate: string;
    status?: string;
  }) => {
    const msPerDay = 24 * 60 * 60 * 1000;
    const days = (new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) / msPerDay + 1;
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === editingRequest.id
          ? {
              ...req,
              ...data,
              days: days > 0 ? days : 1,
              status: data.status ? data.status : req.status,
            }
          : req
      )
    );
    toast({
      title: "Leave Request Updated",
      description: `Changes saved for leave request ${editingRequest.id}.`,
    });
    setShowEditModal(false);
    setEditingRequest(null);
  };

  const handleNewLeaveSubmit = (data: {
    reason: string;
    type: string;
    startDate: string;
    endDate: string;
    employee?: string;
    status?: string;
  }) => {
    if (!data.employee) return;
    const id = `LR${(leaveRequests.length + 1).toString().padStart(3, "0")}`;
    const msPerDay = 24 * 60 * 60 * 1000;
    const days =
      (new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) /
        msPerDay +
      1;
    // Generate initials/avatar
    const empNames = data.employee.trim().split(" ");
    let avatar = "";
    if (empNames.length >= 2) {
      avatar =
        empNames[0][0]?.toUpperCase() + empNames[empNames.length - 1][0]?.toUpperCase();
    } else {
      avatar = data.employee.slice(0, 2).toUpperCase();
    }
    setLeaveRequests((prev) => [
      {
        id,
        employee: data.employee!,
        type: data.type,
        startDate: data.startDate,
        endDate: data.endDate,
        days: days > 0 ? days : 1,
        status: "Pending",
        reason: data.reason,
        avatar,
      },
      ...prev,
    ]);
    toast({
      title: "Leave Request Submitted",
      description: `New request submitted for ${data.employee}`,
    });
    setShowLeaveModal(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-400/20 text-green-400";
      case "Rejected":
        return "bg-red-400/20 text-red-400";
      default:
        return "bg-yellow-400/20 text-yellow-400";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Leave Management</h1>
          <p className="text-slate-400">Manage employee leave requests and balances</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowLeaveModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Leave Request
        </Button>
        <LeaveRequestModal open={showLeaveModal} onOpenChange={setShowLeaveModal} onSubmit={handleNewLeaveSubmit} />
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-lg backdrop-blur-xl border border-slate-700">
        {[
          { id: "requests", label: "Leave Requests", icon: Calendar }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Leave Requests Tab */}
      {activeTab === "requests" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "Total Requests", value: leaveRequests.length.toString(), color: "text-blue-400" },
              { title: "Pending", value: leaveRequests.filter(l => l.status === "Pending").length.toString(), color: "text-yellow-400" },
              { title: "Approved", value: leaveRequests.filter(l => l.status === "Approved").length.toString(), color: "text-green-400" },
              { title: "Rejected", value: leaveRequests.filter(l => l.status === "Rejected").length.toString(), color: "text-red-400" }
            ].map((stat, index) => (
              <Card key={index} className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
                <CardContent className="p-6 text-center">
                  <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                  <p className={`text-2xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Requests Table */}
          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Recent Leave Requests</CardTitle>
              <Button
                variant="outline"
                className="border-slate-600 text-slate-400"
                onClick={() => {
                  toast({
                    title: "Filter",
                    description: "Filter functionality coming soon.",
                  });
                }}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead className="border-b border-slate-700">
                    <tr className="text-left">
                      <th className="p-4 text-slate-400 font-medium">EMPLOYEE</th>
                      <th className="p-4 text-slate-400 font-medium">LEAVE TYPE</th>
                      <th className="p-4 text-slate-400 font-medium">DATES</th>
                      <th className="p-4 text-slate-400 font-medium">DAYS</th>
                      <th className="p-4 text-slate-400 font-medium">STATUS</th>
                      <th className="p-4 text-slate-400 font-medium">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequests.map((request) => (
                      <tr
                        key={request.id}
                        className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                              <span className="text-white text-sm font-semibold">{request.avatar}</span>
                            </div>
                            <div>
                              <div className="text-white font-medium">{request.employee}</div>
                              <div className="text-slate-400 text-sm">{request.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="border-slate-600 text-slate-300">
                            {request.type}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="text-slate-300">
                            <div>{request.startDate}</div>
                            <div className="text-slate-400 text-sm">to {request.endDate}</div>
                          </div>
                        </td>
                        <td className="p-4 text-slate-300">{request.days} days</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(request.status)}
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          {request.status === "Pending" && (
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApprove(request.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-600 text-red-400 hover:bg-red-600/20"
                                onClick={() => handleReject(request.id)}
                              >
                                Reject
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-blue-600 text-blue-400 hover:bg-blue-600/20"
                                onClick={() => handleEdit(request)}
                              >
                                Edit
                              </Button>
                            </div>
                          )}
                          {request.status === "Approved" && (
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-blue-600 text-blue-400 hover:bg-blue-600/20"
                                onClick={() => handleEdit(request)}
                              >
                                Edit
                              </Button>
                            </div>
                          )}
                          {request.status === "Rejected" && (
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-blue-600 text-blue-400 hover:bg-blue-600/20"
                                onClick={() => handleEdit(request)}
                              >
                                Edit
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Leave Balances Tab Removed */}
      {showEditModal && editingRequest && (
        <LeaveRequestModal
          open={showEditModal}
          onOpenChange={(v) => {
            setShowEditModal(v);
            if (!v) setEditingRequest(null);
          }}
          initialReason={editingRequest.reason}
          initialType={editingRequest.type}
          initialStartDate={editingRequest.startDate}
          initialEndDate={editingRequest.endDate}
          onSubmit={handleEditSubmit}
          isEdit
        />
      )}
    </div>
  );
};

export default Leave;
