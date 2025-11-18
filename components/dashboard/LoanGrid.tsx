"use client";
import React from "react";

type Loan = {
  id: string;
  checkOutDate: string;
  dueDate: string;
  status: string;
  book: {
    title: string;
    bookAuthors: { author: { name: string } }[]; 
  };
};

interface LoanGridProps {
  loans: Loan[];
  onReturn: (loanId: string) => void;
  activeTab: 'active' | 'history';
}

const LoanGrid = ({ loans, onReturn, activeTab }: LoanGridProps) => {
  if (loans.length === 0) {
    return <div className="mt-8 rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500 shadow-md">No loans to display.</div>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
      <div className="grid grid-cols-12 bg-primary/10 p-4 font-semibold text-gray-700">
        <p className="col-span-4">Book Title</p>
        <p className="col-span-2">Checkout Date</p>
        <p className="col-span-2">Due Date</p>
        <p className="col-span-2">Status</p>
        <p className="col-span-2 text-center">Actions</p>
      </div>

      {loans.map((loan) => (
        <div
          key={loan.id}
          className="grid grid-cols-12 items-center border-t border-primary/20 p-4 text-sm text-gray-800 hover:bg-gray-50"
        >
          <div className="col-span-4">
            <p className="font-medium">{loan.book.title}</p>
            <p className="text-xs text-gray-500">{loan.book.bookAuthors.map(a => a.author.name).join(', ')}</p>
          </div>
          <p className="col-span-2">{new Date(loan.checkOutDate).toLocaleDateString()}</p>
          <p className="col-span-2">{new Date(loan.dueDate).toLocaleDateString()}</p>
          <p className={`col-span-2 font-medium ${loan.status === "LATE" ? "text-red-600" : "text-green-600"}`}>
            {loan.status}
          </p>
          <div className="col-span-2 text-center">
            {activeTab === 'active' && (
              <button onClick={() => onReturn(loan.id)} className="rounded bg-primary px-3 py-1 text-xs font-semibold text-white hover:bg-primary/80">
                Return
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoanGrid;