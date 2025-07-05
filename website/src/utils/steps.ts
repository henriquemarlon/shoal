import {
    MintStep,
    ProveStep,
    SuccessStep,
    WelcomeScreen,
    InstallExtension,
  } from "../components/vlayer";
  
  export type Step = {
    kind: STEP_KIND;
    path: string;
    backUrl?: string;
    component: React.ComponentType;
    title: string;
    description: string;
    headerIcon?: string;
    index: number;
  };
  
  export enum STEP_KIND {
    WELCOME,
    CONNECT_WALLET,
    START_PROVING,
    MINT,
    INSTALL_EXTENSION,
    SUCCESS,
  }
  export const steps: Step[] = [
    {
      path: "",
      kind: STEP_KIND.WELCOME,
      component: WelcomeScreen,
      title: "Start verification on the system",
      description:
        "Start verification on the system using your Twitter account",
      headerIcon: "/nft-illustration.svg",
      index: 0,
    },
    {
      path: "start-proving",
      kind: STEP_KIND.START_PROVING,
      backUrl: "/",
      component: ProveStep,
      title: "Verify your Twitter account",
      description:
        "Verify your Twitter account to start the verification process",
      index: 1,
    },
    {
      path: "install-extension",
      kind: STEP_KIND.INSTALL_EXTENSION,
      component: InstallExtension,
      backUrl: "/",
      title: "Install the extension",
      description: `Install the extension to start the verification process`,
      index: 2,
    },
    {
      path: "mint",
      kind: STEP_KIND.MINT,
      backUrl: "/start-proving",
      component: MintStep,
      title: "Send verification",
      description: `You are all set to send your verification to the system`,
      index: 3,
    },
    {
      path: "success",
      kind: STEP_KIND.SUCCESS,
      component: SuccessStep,
      title: "Success",
      description: "Your verification has been sent to the system!",
      headerIcon: "/success-illustration.svg",
      index: 4,
    },
  ];
  