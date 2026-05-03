"use client";

import { useState, useEffect } from "react";
import { Check, Trash2, Eye, X, MailOpen, Mail, Loader2 } from "lucide-react";

interface DataTableProps {
  endpoint: string;
  title: string;
}

export default function DataTable({ endpoint, title }: DataTableProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch(`/api/${endpoint}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
      setData([]);
    }
    setLoading(false);
  }

  const formatValue = (key: string, val: any) => {
    if (key === "createdAt" || key === "updatedAt" || key.toLowerCase().includes("date")) {
      try {
        return new Date(val).toLocaleString('en-PK', {
          dateStyle: 'medium',
          timeStyle: 'short'
        });
      } catch (e) {
        return String(val);
      }
    }
    if (typeof val === "boolean") return val ? "Yes" : "No";
    if (typeof val === "object" && val !== null) return JSON.stringify(val);
    return String(val);
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "read" ? "unread" : "read";
    try {
      const res = await fetch(`/api/${endpoint}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setData(data.map(item => item._id === id ? { ...item, status: newStatus } : item));
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/${endpoint}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setData(data.filter(item => item._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete record", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
            {title}
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
            {data.length} Total Records
          </p>
        </div>
        <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Live Database</span>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 text-[#1F6F3D] animate-spin" />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Fetching Records...</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
          {data.length === 0 ? (
            <div className="p-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye size={32} className="text-gray-200" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No records found</h3>
              <p className="text-gray-400 text-sm">When new applications arrive, they will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    {Object.keys(data[0])
                      .filter((key) => key !== "_id" && key !== "__v" && key !== "updatedAt" && key !== "status")
                      .map((key) => (
                        <th key={key} className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </th>
                      ))}
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.map((row, i) => {
                    const isUnread = row.status !== 'read';
                    return (
                      <tr 
                        key={row._id || i} 
                        className={`group transition-all duration-300 hover:bg-gray-50/80 ${isUnread ? 'bg-[#1F6F3D]/[0.02]' : ''}`}
                      >
                        {Object.entries(row)
                          .filter(([key]) => key !== "_id" && key !== "__v" && key !== "updatedAt" && key !== "status")
                          .map(([key, val], j) => (
                            <td key={j} className={`px-6 py-5 whitespace-nowrap max-w-xs truncate transition-all ${
                              isUnread ? 'font-bold text-gray-900' : 'text-gray-500'
                            }`}>
                              {formatValue(key, val)}
                            </td>
                          ))}
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                                onClick={() => setSelectedRow(row)}
                                className="p-2 text-gray-400 hover:text-[#1F6F3D] hover:bg-[#1F6F3D]/5 rounded-xl transition-all"
                                title="View Details"
                            >
                                <Eye size={18} />
                            </button>
                            <button
                              onClick={() => handleToggleStatus(row._id, row.status)}
                              className={`p-2 rounded-xl transition-all ${
                                isUnread 
                                  ? 'text-blue-600 hover:bg-blue-50 shadow-sm hover:shadow-blue-200/50' 
                                  : 'text-gray-400 hover:bg-gray-100'
                              }`}
                              title={isUnread ? "Mark as Read" : "Mark as Unread"}
                            >
                              {isUnread ? <Mail size={18} /> : <MailOpen size={18} />}
                            </button>
                            <button
                              onClick={() => handleDelete(row._id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all shadow-sm hover:shadow-red-200/50"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
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

      {/* Detail Modal */}
      {selectedRow && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>Application Details</h3>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Full Record Information</p>
                    </div>
                    <button 
                        onClick={() => setSelectedRow(null)}
                        className="p-3 bg-white hover:bg-gray-100 text-gray-400 hover:text-gray-900 rounded-2xl transition-all shadow-sm"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Object.entries(selectedRow)
                            .filter(([key]) => key !== "_id" && key !== "__v")
                            .map(([key, val]) => (
                                <div key={key}>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                                    <div className="text-sm font-bold text-gray-900 bg-gray-50 p-4 rounded-2xl border border-gray-100/50">
                                        {formatValue(key, val)}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3">
                    <button 
                        onClick={() => setSelectedRow(null)}
                        className="px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl hover:bg-gray-100 transition-all border border-gray-200"
                    >
                        Close
                    </button>
                    <button 
                        onClick={() => {
                            handleToggleStatus(selectedRow._id, selectedRow.status);
                            setSelectedRow(null);
                        }}
                        className={`px-8 py-4 font-bold rounded-2xl transition-all shadow-xl ${
                            selectedRow.status !== 'read'
                            ? 'bg-[#1F6F3D] text-white hover:bg-[#14532D] shadow-green-900/10'
                            : 'bg-gray-200 text-gray-900 hover:bg-gray-300 shadow-gray-900/5'
                        }`}
                    >
                        {selectedRow.status !== 'read' ? 'Mark as Read' : 'Mark as Unread'}
                    </button>
                </div>
            </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
          border: 2px solid #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #1F6F3D;
        }
      `}</style>
    </div>
  );
}
