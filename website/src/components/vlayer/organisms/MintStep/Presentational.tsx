export const MintStepPresentational = ({
  handleMint,
  isMinting,
}: {
  handleMint: () => void;
  isMinting: boolean;
}) => {
  return (
    <>
      <div className="mt-7 flex justify-center flex-col items-center">
        <button disabled={isMinting} id="nextButton" onClick={handleMint} className="bg-[#FF533F] text-white px-4 py-2 rounded-lg cursor-pointer">
          {isMinting ? "Minting..." : "Start Minting"}
        </button>
      </div>
    </>
  );
};
