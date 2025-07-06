import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

function formatDate(date: Date | undefined) {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
}

function isValidDate(date: Date | undefined) {
    if (!date) return false;
    return !isNaN(date.getTime());
}

export default function CalendarField({ label, value, setValue }: { label: string, value: Date | undefined, setValue: (d: Date | undefined) => void }) {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(value || undefined);
    const [month, setMonth] = React.useState<Date | undefined>(date);
    const [inputValue, setInputValue] = React.useState(formatDate(date));
    React.useEffect(() => { setInputValue(formatDate(date)); }, [date]);
    return (
      <div className="flex flex-col gap-3">
        <label htmlFor={label} className="px-1">{label}</label>
        <div className="relative flex gap-2">
          <input
            id={label}
            value={inputValue}
            placeholder="June 01, 2025"
            className="bg-background pr-10 border rounded-lg px-2 py-1 w-full"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const d = new Date(e.target.value);
              setInputValue(e.target.value);
              if (isValidDate(d)) {
                setDate(d);
                setMonth(d);
                setValue(d);
              }
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setOpen(true);
              }
            }}
          />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id="date-picker"
                variant="ghost"
                className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              >
                <CalendarIcon className="size-3.5" />
                <span className="sr-only">Select date</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                month={month}
                onMonthChange={setMonth}
                onSelect={(d) => {
                  setDate(d);
                  setValue(d);
                  setInputValue(formatDate(d));
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  }