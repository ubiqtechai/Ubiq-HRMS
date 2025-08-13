import { useState, useEffect } from "react";
import { Calendar, Clock, Plus, Filter, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LeaveRequestModal from "./LeaveRequestModal";
import { toast } from "@/hooks/use-toast";
import { 
  LeaveRequest, 
  addLeaveRequest, 
  subscribeToLeaveRequests, 
  updateLeaveRequest,
  deleteLeaveRequest 
} from "@/lib/firebase";


const Leave = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRequest, setEditingRequest] = useState<LeaveRequest | null>(null);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Subscribe to real-time updates from Firebase
  useEffect(() => {
    const unsubscribe = subscribeToLeaveRequests((requests) => {
      setLeaveRequests(requests);
    });

    return () => unsubscribe();
  }, []);

  // Approve/Reject handlers
  const handleApprove = async (id: string) => {
    try {
      console.log('Approving leave request with ID:', id);
      await updateLeaveRequest(id, { status: "Approved" });
      toast({
        title: "Leave Request Approved",
        description: `The leave request has been approved.`,
      });
    } catch (error) {
      console.error("Error approving leave request:", error);
      toast({
        title: "Error",
        description: `Failed to approve leave request: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      console.log('Rejecting leave request with ID:', id);
      await updateLeaveRequest(id, { status: "Rejected" });
      toast({
        title: "Leave Request Rejected",
        description: `The leave request has been rejected.`,
      });
    } catch (error) {
      console.error("Error rejecting leave request:", error);
      toast({
        title: "Error",
        description: `Failed to reject leave request: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLeaveRequest(id);
      toast({
        title: "Leave Request Deleted",
        description: "The leave request has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting leave request:", error);
      toast({
        title: "Error",
        description: "Failed to delete leave request.",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (request: LeaveRequest) => {
    setEditingRequest(request);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (data: {
    reason: string;
    type: string;
    startDate: string;
    endDate: string;
    status?: string;
  }) => {
    if (!editingRequest?.id) {
      toast({
        title: "Error",
        description: "No request selected for editing.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const msPerDay = 24 * 60 * 60 * 1000;
      const days = (new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) / msPerDay + 1;
      
      const updateData: any = {
        reason: data.reason,
        type: data.type,
        startDate: data.startDate,
        endDate: data.endDate,
        days: days > 0 ? days : 1,
      };

      // Only update status if provided
      if (data.status) {
        updateData.status = data.status;
      }
      
      console.log('Updating leave request with ID:', editingRequest.id, 'Data:', updateData);
      
      await updateLeaveRequest(editingRequest.id, updateData);
      
      toast({
        title: "Leave Request Updated",
        description: `Changes saved successfully.`,
      });
      setShowEditModal(false);
      setEditingRequest(null);
    } catch (error) {
      console.error("Error updating leave request:", error);
      toast({
        title: "Error",
        description: `Failed to update leave request: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    }
  };

  const handleNewLeaveSubmit = async (data: {
    reason: string;
    type: string;
    startDate: string;
    endDate: string;
    employee?: string;
    status?: string;
  }) => {
    if (!data.employee) return;
    
    try {
      const msPerDay = 24 * 60 * 60 * 1000;
      const days = (new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) / msPerDay + 1;
      
      // Generate initials/avatar
      const empNames = data.employee.trim().split(" ");
      let avatar = "";
      if (empNames.length >= 2) {
        avatar = empNames[0][0]?.toUpperCase() + empNames[empNames.length - 1][0]?.toUpperCase();
      } else {
        avatar = data.employee.slice(0, 2).toUpperCase();
      }
      
      await addLeaveRequest({
        employee: data.employee,
        type: data.type,
        startDate: data.startDate,
        endDate: data.endDate,
        days: days > 0 ? days : 1,
        status: "Pending",
        reason: data.reason,
        avatar,
      });
      
      toast({
        title: "Leave Request Submitted",
        description: `New request submitted for ${data.employee}`,
      });
      setShowLeaveModal(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit leave request.",
        variant: "destructive"
      });
    }
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

  const filteredLeaveRequests = filterStatus === "all" 
    ? leaveRequests 
    : leaveRequests.filter(request => request.status.toLowerCase() === filterStatus.toLowerCase());

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
              { title: "Total Requests", value: filteredLeaveRequests.length.toString(), color: "text-blue-400" },
              { title: "Pending", value: filteredLeaveRequests.filter(l => l.status === "Pending").length.toString(), color: "text-yellow-400" },
              { title: "Approved", value: filteredLeaveRequests.filter(l => l.status === "Approved").length.toString(), color: "text-green-400" },
              { title: "Rejected", value: filteredLeaveRequests.filter(l => l.status === "Rejected").length.toString(), color: "text-red-400" }
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
              <div className="flex items-center gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-slate-700 border border-slate-600 text-slate-300 rounded px-3 py-1 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <Button
                  variant="outline"
                  className="border-slate-600 text-slate-400"
                  onClick={() => setFilterStatus("all")}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Clear Filter
                </Button>
              </div>
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
                    {filteredLeaveRequests.map((request) => (
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
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-600 text-red-400 hover:bg-red-600/20"
                                onClick={() => handleDelete(request.id)}
                              >
                                Delete
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
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-600 text-red-400 hover:bg-red-600/20"
                                onClick={() => handleDelete(request.id)}
                              >
                                Delete
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
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-600 text-red-400 hover:bg-red-600/20"
                                onClick={() => handleDelete(request.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredLeaveRequests.length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    No leave requests found {filterStatus !== "all" && `with status "${filterStatus}"`}
                  </div>
                )}
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
