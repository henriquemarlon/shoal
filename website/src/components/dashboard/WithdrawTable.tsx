import { Button } from "@/components/ui/button";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";

const WithdrawTable = () => {

    return (
        <div className="w-1/2 bg-gray-50 rounded-lg shadow-md p-4">
            <div className="font-semibold text-2xl mb-4">Withdraw</div>
            <div className="w-full">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Amount</TableHead>
                            <TableHead>Token</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {/* TODO: Add withdrawals */}

                        <TableRow>
                            <TableCell>100</TableCell>
                            <TableCell>ETH</TableCell>
                            <TableCell>
                                <Button className="cursor-pointer bg-[#ff533f] text-white px-4 py-1 rounded-md hover:bg-[#ff533f]/80">Withdraw</Button>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default WithdrawTable; 