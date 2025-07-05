import React, {
    createContext,
    useCallback,
    useEffect,
    useRef,
    useState,
  } from "react";

  import { useCurrentStep } from "../../hooks/useCurentStep";
  
  export const modalContext = createContext({
    showModal: () => {},
    closeModal: () => {},
  });
  
  export const Modal = ({ children }: { children: React.ReactNode }) => {
    const modalRef = useRef<HTMLDialogElement>(null);
  
    const showModal = useCallback(() => {
      modalRef.current?.showModal();
    }, [modalRef]);
  
    const closeModal = useCallback(() => {
      modalRef.current?.close();
    }, [modalRef]);
  
    useEffect(() => {
      showModal();
    }, [showModal]);
    const { currentStep } = useCurrentStep();  
  
    const [description, setDescription] = useState("");
    useEffect(() => {

      setTimeout(() => {
        setDescription(currentStep?.description || "");
      }, 300);
    }, [currentStep?.description]);
  
    return (
        <div className="w-[50%] h-72 bg-white rounded-2xl shadow flex flex-col gap-4 justify-center items-center p-8">      
          
          {currentStep?.title && (
            <h3 className="text-2xl font-semibold">{currentStep?.title}</h3>
          )}
          <p className="text-sm text-gray-500 text-center">{description}</p>

            <modalContext.Provider value={{ showModal, closeModal }}>
              {children}
            </modalContext.Provider>
        </div>
    );
  };
  