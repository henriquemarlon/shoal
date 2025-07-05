import { useEffect, useState } from "react";
import { useLocation, type Location } from "react-router";
import { steps, type Step } from "@/utils/steps";

export const useCurrentStep = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState<Step | undefined>(undefined);

  useEffect(() => {
    setCurrentStep(steps.find(byPath(location)));
  }, [location.pathname]);
  return { currentStep };
};

const byPath = (location: Location<unknown>) => (step: Step) => {
  const segments = location.pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  if (last === "panel") {
    return step.path === "";
  }
  return step.path === last;
};
