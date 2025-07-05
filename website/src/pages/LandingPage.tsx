import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import LogoShoal from "@/images/LogoShoal";
import { Sparkle, Github } from 'lucide-react';
import Shine from "@/images/Shine";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const LandingPage: FC = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center w-full px-16 relative">
      {/* Header */}
      <header className="w-full flex items-center justify-between py-6">
        <LogoShoal width={120} height={50} />
        
        <button className="cursor-pointer rounded-xl px-6 py-2 text-base font-semibold bg-[#FF533F] shadow-md text-white ml-4" onClick={() => navigate("/login")}>
          Launch App →
        </button>
      </header>

      {/* Banner/Highlight */}
      <div className="flex flex-col items-center justify-center mt-8 w-full max-w-3xl">
        <div className="bg-white border border-[#FF533F] shadow shadow-[#FF533F] shadow-md text-[#FF533F] font-semibold rounded-full px-6 py-2 mb-6 text-base font-normal flex items-center gap-1">
          <Shine width={20} height={20} />
          V1 is now live!
          </div>
        
        <h1 className="text-7xl font-bold text-center leading-tight mb-2">
        Where followers <br/>become <span className="text-[#FF533F] font-semibold">financiers</span>
        </h1>
        <p className="text-center text-gray-500 mt-4 mb-8 max-w-[800px] text-xl">
          Debt issuance through reverse campaign mechanism with collateralization.
        </p>

        <div className="flex gap-4 mb-10">
          <Button variant="secondary" className="rounded-xl px-6 py-2 text-base font-normal bg-white shadow cursor-pointer">
            Documentation <span className="ml-2">↗</span>
          </Button>
          <Button onClick={() => navigate("/login")} className="rounded-xl px-6 py-2 text-base font-semibold bg-[#FF533F] hover:bg-[#FF533F]/80 cursor-pointer shadow">
            Launch App →
          </Button>
        </div>
      </div>

      <div className="text-center text-4xl font-bold mt-4">How Shoal is transforming the creators economy</div>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full py-8">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-100 hover:shadow-xl transition">
          <div className="bg-[#FF533F] rounded-full w-12 h-12 flex items-center justify-center mb-4">
            {/* Substitua pelo seu ícone */}
            <svg width={28} height={28} fill="#fff" stroke="#fff" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
          </div>
          <div className="text-lg font-semibold mb-2">Campaign Management</div>
          <div className="text-gray-600">
          Creators can create campaigns with specific collateralization requirements, interest rates, and funding goals. The platform manages the lifecycle of these campaigns from creation to settlement.
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-100 hover:shadow-xl transition">
          <div className="bg-[#FF533F] rounded-full w-12 h-12 flex items-center justify-center mb-4">
            {/* Substitua pelo seu ícone */}
            <svg width={28} height={28} fill="#fff" stroke="#fff" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
          </div>
          <div className="text-lg font-semibold mb-2">Order Processing</div>
          <div className="text-gray-600">
          Investors can place orders to participate in campaigns, specifying their investment amount and desired interest rate. The system matches orders based on campaign requirements and market conditions.
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-100 hover:shadow-xl transition">
          <div className="bg-[#FF533F] rounded-full w-12 h-12 flex items-center justify-center mb-4">
            {/* Substitua pelo seu ícone */}
            <svg width={28} height={28} fill="#fff" stroke="#fff" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
          </div>
          <div className="text-lg font-semibold mb-2">Collateral Management</div>
          <div className="text-gray-600">
          The system manages collateral tokens and ensures proper liquidation mechanisms are in place to protect investors while enabling creators to access capital.
          </div>
        </div>
      </div>

      <div className="text-center text-4xl font-bold mt-16 mb-8">Frequently Asked Questions</div>
      
      <div className="w-full mb-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b border-gray-200">
            <AccordionTrigger className="text-left text-lg font-semibold py-6 hover:text-[#FF533F] cursor-pointer">
              How does Shoal's reverse campaign mechanism work?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pb-6 text-lg">
              Shoal's reverse campaign mechanism allows creators to issue debt directly to their followers. 
              Followers can invest in campaigns with specific collateralization requirements and interest rates. 
              The platform manages the entire lifecycle from campaign creation to settlement, ensuring transparency 
              and security for all participants.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2" className="border-b border-gray-200">
            <AccordionTrigger className="text-left text-lg font-semibold py-6 hover:text-[#FF533F] cursor-pointer">
              What types of collateral are accepted?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pb-6 text-lg">
              Shoal accepts various forms of digital collateral including cryptocurrencies, NFTs, and other 
              digital assets. The platform implements robust liquidation mechanisms to protect investors 
              while enabling creators to access capital through their digital assets.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3" className="border-b border-gray-200">
            <AccordionTrigger className="text-left text-lg font-semibold py-6 hover:text-[#FF533F] cursor-pointer">
              How are interest rates determined?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pb-6 text-lg">
              Interest rates are determined through a market-driven mechanism where investors can specify 
              their desired rates when placing orders. The system matches orders based on campaign requirements, 
              market conditions, and the creator's collateralization ratio.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4" className="border-b border-gray-200">
            <AccordionTrigger className="text-left text-lg font-semibold py-6 hover:text-[#FF533F] cursor-pointer">
              Is my investment secure on the platform?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pb-6 text-lg">
              Yes, Shoal implements multiple security measures including smart contract-based collateral 
              management, automated liquidation mechanisms, and transparent order matching. All transactions 
              are recorded on the blockchain, ensuring immutability and transparency for all participants.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
        
    </div>
    <footer className="bg-white w-full border-t border-gray-200 py-4 px-16">
    <div className="flex items-center justify-between">
      <LogoShoal width={100} height={40} />
      <a 
        href="https://github.com/henriquemarlon/shoal" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-gray-600 hover:text-[#FF533F] transition-colors cursor-pointer"
      >
        <Github size={20} />
        <span className="font-medium">GitHub</span>
      </a>
    </div>
  </footer>
  </>
  );
};

export default LandingPage; 