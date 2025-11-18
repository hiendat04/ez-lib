"use client";

import LoanGrid from "@/components/dashboard/LoanGrid";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DashboardLoansPage = () => {
  const [tabSelected, setTabSelected] = useState<"active" | "history">("active"); // 'active' or 'history'
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchLoans = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/loans/${user.id}?status=${tabSelected}`);
      const data = await response.json();
      if (data.success) {
        setLoans(data.loans);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch loans.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabSelected, user]);

  const handleReturn = async (loanId: string) => {
    const toastId = toast.loading("Returning book...");
    try {
      const response = await fetch(`/api/loans/${user?.id}`, { // The PUT route doesn't use the ID in URL, but it's fine to call it this way
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loanId }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Book returned successfully!", { id: toastId });
        // Refetch loans to update the list
        fetchLoans();
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to return book.", { id: toastId });
    }
  };

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="mb-2 text-2xl font-semibold text-gray-800">My Loans</h1>
        <p className="text-gray-600">Track your borrowed books and history</p>
      </div>
      <div className="flex max-w-max gap-4 rounded-md bg-white p-1 shadow">
        <button
          className={`cursor-pointer rounded-md p-2 px-4 text-sm font-medium transition ${
            tabSelected === "active" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setTabSelected("active")}
        >
          Active Loans
        </button>
        <button
          className={`cursor-pointer rounded-md p-2 px-4 text-sm font-medium transition ${
            tabSelected === "history" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setTabSelected("history")}
        >
          Loan History
        </button>
      </div>
      {loading ? (
        <p>Loading loans...</p>
      ) : (
        <LoanGrid loans={loans} onReturn={handleReturn} activeTab={tabSelected} />
      )}
    </div>
  );
};

export default DashboardLoansPage;