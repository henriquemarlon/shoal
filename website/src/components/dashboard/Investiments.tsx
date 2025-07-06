import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";


const investments = [
  {
    date: "12/12/2023",
    returnRate: "9%",
    bidValue: "1 ETH",
    endOfAuction: "12/12/2022",
    user: "Vitalik.eth",
    status: "pending",
  }]

export default function InvestmentsList() {
  return (
    <div>
      <div className="text-2xl font-bold">All Investments</div>
      <div className="grid grid-cols-5 gap-8 mt-4">
        {investments.map((inv, i) => (
          <Dialog key={i}>
            <DialogTrigger asChild>
              <div
                className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center min-w-[250px] max-w-[300px] mx-auto cursor-pointer hover:shadow-lg transition"
              >
                <div className="flex w-full justify-between items-end mb-2">
                  <div className="text-2xl font-bold">{inv.returnRate}</div>
                  <div className="text-2xl font-bold">{inv.bidValue}</div>
                </div>
                <div className="flex w-full justify-between text-xs text-gray-500 mb-4">
                  <span>Return rate</span>
                  <span>Bid value</span>
                </div>
                <div className="text-center my-2">
                  <div className="font-semibold">{inv.endOfAuction}</div>
                  <div className="text-xs text-gray-500">End of auction</div>
                </div>
                <div className="text-center my-2">
                  <div className="font-semibold">{inv.user}</div>
                  <div className="text-xs text-gray-500">User</div>
                </div>

                {inv.status === "accepted" && (
                  <div className="mt-4 px-4 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
                    Order Accepted
                  </div>
                )}

                {inv.status === "pending" && (
                  <div className="mt-4 px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-sm">
                    Order Pending
                  </div>
                )}

                {inv.status === "cancelled" && (
                  <div className="mt-4 px-4 py-1 rounded-full bg-red-100 text-red-700 font-semibold text-sm">
                    Order Cancelled
                  </div>
                )}

                {inv.status === "partially_accepted" && (
                  <div className="mt-4 px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-sm">
                    Order Partially Accepted
                  </div>
                )}

                {inv.status === "rejected" && (
                  <div className="mt-4 px-4 py-1 rounded-full bg-red-100 text-red-700 font-semibold text-sm">
                    Order Rejected
                  </div>
                )}

                {inv.status === "settled" && (
                  <div className="mt-4 px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-sm">
                    Order Settled
                  </div>
                )}

                {inv.status === "settled_by_collateral" && (
                  <div className="mt-4 px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-sm">
                    Order Settled by Collateral
                  </div>
                )}

              </div>
            </DialogTrigger>
            <DialogContent className="w-[300px]">
              <DialogHeader>
                <DialogTitle>Investment Details</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 justify-center items-center">
                <div className="text-md font-bold">{inv.returnRate}</div>
                <div className="text-xs text-gray-500">Return rate</div>
              </div>

              <div className="flex flex-col gap-2 justify-center items-center">
                <div className="text-lmd font-bold">{inv.bidValue}</div>
                <div className="text-xs text-gray-500">Bid value</div>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <div className="text-md font-bold">{inv.endOfAuction}</div>
                <div className="text-xs text-gray-500">End of auction</div>
              </div>

              <div className="flex flex-col gap-2 justify-center items-center">
                <div className="text-md font-bold">{inv.user}</div>
                <div className="text-xs text-gray-500">User</div>
              </div>
              </div>

              {inv.status === "pending" && (
                <button className="bg-[#FF533F] text-white px-4 py-2 rounded-md w-full cursor-pointer mt-2">Cancel Order</button>
              )}

                
            </DialogContent>
          </Dialog>
        ))}

        {investments.length === 0 && (
          <div className="text-center text-gray-500">No investments found</div>
        )}

      </div>
    </div>
  );
} 