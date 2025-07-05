import { FC } from "react";

const Admin: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h1>
      <p className="text-gray-600">Bem-vindo, admin! Selecione uma opção no menu ao lado.</p>
    </div>
  );
};

export default Admin;
