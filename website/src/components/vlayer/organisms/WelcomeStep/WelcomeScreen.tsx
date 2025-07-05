import { Link } from "react-router";
import { isMobile } from "../../../../utils";

export const WelcomeScreen = () => {
  return (
    <>
      {isMobile && (
        <p className="text-red-400 w-full block mt-3">
          Mobile is not supported. <br /> Please use desktop browser.
        </p>
      )}
      {!isMobile && (
        <div className="mt-5 flex justify-center">
          <Link
            to="/panel/verify/start-proving"
            id="nextButton"
            data-testid="start-page-button"
          >
            Start
          </Link>
        </div>
      )}
    </>
  );
};
