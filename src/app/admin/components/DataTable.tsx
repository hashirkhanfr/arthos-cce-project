"use client";

import { useState, useEffect } from "react";
import { Check, Trash2, Eye } from "lucide-react";

interface DataTableProps {
  endpoint: string;
  title: string;
}

export default function DataTable({ endpoint, title }: DataTableProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/${endpoint}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "read" }),
      });
      if (res.ok) {
        setData(data.map(item => item._id === id ? { ...item, status: "read" } : item));
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
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <span className="text-sm text-gray-500">{data.length} records found</span>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading records...</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
          {data.length === 0 ? (
            <div className="p-6 text-gray-500 text-center">No records found.</div>
          ) : (
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Status</th>
                  {Object.keys(data[0])
                    .filter((key) => key !== "_id" && key !== "__v" && key !== "updatedAt" && key !== "status")
                    .map((key) => (
                      <th key={key} className="px-4 py-3 font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </th>
                    ))}
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((row, i) => (
                  <tr 
                    key={row._id || i} 
                    className={`hover:bg-gray-50/50 transition-colors ${row.status === 'unread' ? 'bg-blue-50/30' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        row.status === 'unread' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {row.status || 'unread'}
                      </span>
                    </td>
                    {Object.entries(row)
                      .filter(([key]) => key !== "_id" && key !== "__v" && key !== "updatedAt" && key !== "status")
                      .map(([key, val], j) => (
                        <td key={j} className={`px-4 py-3 whitespace-nowrap max-w-xs truncate ${row.status === 'unread' ? 'font-semibold text-gray-900' : ''}`}>
                          {formatValue(key, val)}
                        </td>
                      ))}
                    <td className="px-4 py-3 text-right space-x-2">
                      {row.status !== 'read' && (
                        <button
                          onClick={() => handleMarkAsRead(row._id)}
                          className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Mark as Read"
                        >
                          <Check size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(row._id)}
                        className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
