import { useLocation, useNavigate } from "react-router-dom";

export function VerificationBanner({ verified }: { verified: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();
  const notOnProfile = location.pathname !== "/panel/profile";

  return (
    <div
      className={`w-full px-6 flex items-center justify-between
        rounded-xl border-1 mb-8
        ${verified
          ? "border-green-700 bg-green-100 text-green-800"
          : "border-orange-700 bg-orange-100 text-orange-800"
        }
      `}
      style={{ minHeight: 48 }}
    >
      <span className="font-medium text-md">
        {verified
          ? "✅ Você já está verificado no sistema!"
          : "⚠️ É necessário se verificar no sistema."}
      </span>
      {!verified && notOnProfile && (
        <button
          onClick={() => navigate("/panel/profile")}
          className="ml-4 px-4 py-1 cursor-pointer rounded-lg bg-[#ff533f] text-white shadow hover:bg-[#ff533f]/80 transition"
        >
          Ir para verificação
        </button>
      )}
    </div>
  );
}