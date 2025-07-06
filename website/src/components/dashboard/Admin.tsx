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
import { useWallets } from "@privy-io/react-auth";
import { chains, getClient, getWalletClient } from "@/utils/chain";
import { toHex, type Hex, fromHex, createWalletClient, custom } from "viem";
import { walletActionsL1 } from "@cartesi/viem";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { parseChainId } from "@/utils/chain";


const initialUsers = [
  {
    id: 1,
    name: "Emanuele Morais",
    email: "emanuele.lmorais@gmail.com",
    username: "emanuele.lmorais",
    role: "admin",
    wallet: "0x8DF58A2C9D22B3B3FF647e0dEdbBc914f7224f71",
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
  const {wallets} = useWallets();
  const wallet = wallets[0];
  const chainId = wallet?.chainId;

  const [form, setForm] = useState({
    role: "",
    wallet: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function addInput(str: string): Promise<boolean> {
    const parsedChainId = parseChainId(chainId);
    if (!parsedChainId || !import.meta.env.VITE_CARTESI_APPLICATION_ADDRESS) return false;

    // Tenta usar o embedded wallet do Privy
    let walletClient = null;
    let address = null;
    let provider = null;
    const privyWallet = wallets.find(w => w.walletClientType === 'privy');
    
    if (privyWallet) {
      provider = await privyWallet.getEthereumProvider();
      address = privyWallet.address as `0x${string}`;
      walletClient = createWalletClient({
        account: address,
        chain: chains[parsedChainId],
        transport: custom(provider),
      }).extend(walletActionsL1());
    } else {
      // fallback para o comportamento antigo (ex: metamask)
      walletClient = await getWalletClient(parsedChainId);
      if (walletClient) {
        [address] = await walletClient.requestAddresses();
        address = address as `0x${string}`;
      }
    }

    const client = await getClient(parsedChainId);
    if (!client || !walletClient || !address) return false;

    try {
      const payload = toHex(str);
      const txHash = await walletClient.addInput({
        application: import.meta.env.VITE_CARTESI_APPLICATION_ADDRESS,
        payload,
        account: address as `0x${string}`,
        chain: chains[parsedChainId],
      });
      await client.waitForTransactionReceipt({ hash: txHash });
      toast.success("User created successfully!");
      return true;
    } catch (e) {
      console.log(e);
      toast.error("Failed to create user");
      return false;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // {"path":"user/admin/create","data":{"address":"%s","role":"creator"}}

    const success = await addInput(JSON.stringify({
      path: "user/admin/create",
      data: {
        address: form.wallet,
        role: form.role,
      }
    }));

    // Limpar o formulário apenas se a requisição foi bem-sucedida
    if (success) {
      setForm({
        role: "",
        wallet: "",
      });
    }
  }

  function handleApprove(user: any) {
    console.log({
      path: "user/admin/create",
      data: {
        address: user.wallet,
        role: user.role,
      }
    });
  }

  return (
    <div className="flex flex-col min-h-[60vh]  w-full mx-auto px-4">
      <Toaster />
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
