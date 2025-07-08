import { useSearchParams } from "react-router";
import { useAccount } from "wagmi";
import { SuccessStepPresentational } from "./Presentational";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SuccessStep = () => {
  const { chain } = useAccount();
  const [searchParams] = useSearchParams();
  const tx = searchParams.get("tx") || "";
  const handle = searchParams.get("handle") || "";
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("verified", "true");
      navigate("/panel", { replace: true });
    }, 2000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <SuccessStepPresentational
      tx={tx}
      handle={handle}
      blockExplorer={chain?.blockExplorers?.default?.url}
    />
  );
};
