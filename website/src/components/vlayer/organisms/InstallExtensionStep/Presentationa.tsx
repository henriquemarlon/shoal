import { vlayerPovingExtensionId } from "../../../../utils";

export const InstallExtensionPresentational = () => {
  return (
    <>
      <div className="mt-7 flex justify-center">
        <button
          className="bg-[#FF533F] text-white px-4 py-2 rounded-lg cursor-pointer"
          id="nextButton"
          onClick={() => {
            window.open(
              `https://chromewebstore.google.com/detail/vlayer/${vlayerPovingExtensionId}/reviews`,
              "_blank",
            );
          }}
        >
          Install Extension
        </button>
      </div>
    </>
  );
};
