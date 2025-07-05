import { Link } from "react-router";
export const SuccessStepPresentational = ({
  tx,
  handle,
  blockExplorer,
}: {
  tx: string;
  handle: string;
  blockExplorer?: string;
}) => {
  return (
    <>
      <p className="text-gray-500">
        @{handle} was minted to{" "}
        <a
          href={`${blockExplorer}/tx/${tx}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-500 underline"
        >
          {tx.slice(0, 6)}...{tx.slice(-4)}
        </a>
      </p>
      <p className="text-gray-500">
        <a
          href={`${blockExplorer}/tx/${tx}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold leading-4 text-center text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 inline-flex items-center"
          tabIndex={0}
        >
          See it on block explorer
        </a>
      </p>
    </>
  );
};
