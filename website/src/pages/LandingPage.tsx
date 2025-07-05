import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const carouselItems = [1, 2, 3]; // Placeholder para os cards do carrossel

const LandingPage: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F5f5f5] flex flex-col items-center w-full">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-6">
        <div className="flex items-center text-2xl font-bold">
          Shoel<span className="text-red-400 ml-1">_</span>
        </div>
        <nav className="flex gap-12 py-3 px-12 rounded-full shadow-md shadow-[#fca9ad]">
          <button className="text-base font-normal">Home</button>
          <button className="text-base font-normal">About us</button>
          <button className="text-base font-normal">Contact us</button>
        </nav>
        <button className="rounded-xl px-6 py-2 text-base font-semibold bg-red-400 hover:bg-red-500 shadow-md text-white" onClick={() => navigate("/login")}>Launch App →</button>
      </header>

      {/* Banner/Highlight */}
      <div className="flex flex-col items-center mt-8 w-full max-w-3xl">
        <Button className="bg-red-400 hover:bg-red-500 rounded-full px-6 py-2 mb-6 text-base font-normal">Lorem ipsum dolet sit amet</Button>
        <h1 className="text-5xl md:text-6xl font-bold text-center leading-tight mb-2">
          Lorem Ipsum dolet sia<br />
          amet lorem - <span className="text-red-400">Ipsum</span>
        </h1>
        <p className="text-center text-gray-500 mt-4 mb-8 max-w-2xl text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br />
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br />
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <div className="flex gap-4 mb-10">
          <Button variant="secondary" className="rounded-xl px-6 py-2 text-base font-normal">
            Documentation <span className="ml-2">↗</span>
          </Button>
          <Button className="rounded-xl px-6 py-2 text-base font-semibold bg-red-400 hover:bg-red-500">
            Launch App →
          </Button>
        </div>
      </div>

      {/* Carousel Section */}
      <section className="w-full flex flex-col items-center mt-8 mb-16">
        <div className="w-full max-w-5xl">
          <Carousel>
            <CarouselContent>
              {carouselItems.map((item, idx) => (
                <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4">
                    <Card className="h-40 flex items-center justify-center bg-gray-200">
                      <CardContent className="flex items-center justify-center h-full">
                        <span className="text-2xl text-gray-400 font-semibold">Card {item}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 