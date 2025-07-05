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
        "Start verification on the system",
      headerIcon: "/nft-illustration.svg",
      index: 0,
    },
    {
      path: "start-proving",
      kind: STEP_KIND.START_PROVING,
      backUrl: "/",
      component: ProveStep,
      title: "Start verification on the system",
      description:
        "Start verification on the system",
      index: 1,
    },
    {
      path: "install-extension",
      kind: STEP_KIND.INSTALL_EXTENSION,
      component: InstallExtension,
      backUrl: "/",
      title: "Start verification on the system",
      description: `Start verification on the system`,
      index: 2,
    },
    {
      path: "mint",
      kind: STEP_KIND.MINT,
      backUrl: "/start-proving",
      component: MintStep,
      title: "X NFT",
      description: `You are all set to mint your unique X NFT, a true reflection of your verified identity.`,
      index: 3,
    },
    {
      path: "success",
      kind: STEP_KIND.SUCCESS,
      component: SuccessStep,
      title: "Success",
      description: "",
      headerIcon: "/success-illustration.svg",
      index: 4,
    },
  ];
  