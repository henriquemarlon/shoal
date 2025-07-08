import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useTwitterAccountProof } from "../../../../hooks/useTwitterAccountProof";
import { ProveStepPresentational } from "./Presentational";
import { useAccount } from "wagmi";

export const ProveStep = () => {
  const navigate = useNavigate();
  const { address } = useAccount();
  const [disabled, setDisabled] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  const {
    requestWebProof,
    webProof,
    callProver,
    isPending,
    isCallProverIdle,
    result,
    error,
  } = useTwitterAccountProof();

  useEffect(() => {
    if (webProof && isCallProverIdle) {
      void callProver([webProof, address, import.meta.env.VITE_CARTESI_APPLICATION_ADDRESS]);
      
    }
  }, [webProof, address, callProver, isCallProverIdle]);

  useEffect(() => {
    if (result) {
      void navigate("/panel/mint");
    }
  }, [result, navigate]);

  useEffect(() => {
    modalRef.current?.showModal();
  }, []);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return (
    <ProveStepPresentational
      requestWebProof={requestWebProof}
      isPending={isPending}
      disabled={disabled}
      setDisabled={setDisabled}
    />
  );
};
