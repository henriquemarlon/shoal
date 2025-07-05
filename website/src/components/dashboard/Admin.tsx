import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const initialUsers = [
  {
    id: 1,
    name: "Alice Silva",
    email: "alice@email.com",
    username: "alice123",
    role: "creator",
    wallet: "0x123...abc",
  },
  {
    id: 2,
    name: "Bob Souza",
    email: "bob@email.com",
    username: "bobz",
    role: "investidor",
    wallet: "0x456...def",
  },
];

const Admin = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    role: "",
    wallet: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({
      path: "user/admin/create",
      data: {
        address: form.wallet,
        role: form.role,
      }
    });

  }

  function handleApprove(user: any) {
    // ... lógica de aprovação
  }

  return (
    <div className="flex flex-col min-h-[60vh]  w-full mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      
      <form
        className="mb-6 bg-white rounded-lg shadow p-4 w-full"
        onSubmit={handleSubmit}
      >
        <div className="text-lg font-bold mb-2">Create user manually</div>
        <div className="flex w-full gap-2 items-end"> 
          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium mb-1">Role</label>
            <Select
              value={form.role}
              onValueChange={value => setForm({ ...form, role: value })}
              required
            >
              <SelectTrigger className="border rounded px-2 w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="creator">Creator</SelectItem>
                <SelectItem value="investor">Investor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium mb-1">Wallet</label>
            <input
              name="wallet"
              value={form.wallet}
              onChange={handleChange}
              className="border rounded px-2 py-1"
              required
            />
          </div>
          <Button
            type="submit"
            className="bg-[#ff533f] text-white px-4 py-2 rounded-md hover:bg-[#ff533f]/80 w-auto"
          >
            Create
          </Button>
        </div>
      </form>

      <div className="w-full bg-gray-50 rounded-lg shadow-md p-4">
      <div className="text-lg font-bold mb-1">Approve Users</div>
        <div className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Wallet</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="break-all">{user.wallet}</TableCell>
                  <TableCell>
                    <Button
                      className="cursor-pointer bg-[#ff533f] text-white px-4 py-1 rounded-md hover:bg-[#ff533f]/80"
                      onClick={() => handleApprove(user)}
                    >
                      Approve
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
