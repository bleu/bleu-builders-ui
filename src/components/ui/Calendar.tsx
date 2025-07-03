import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "#/lib/utils";
import { buttonVariants } from "#/components/ui/Button";

const TimePicker = ({ value, setValue, className = "" }) => (
  <div
    className={cn(
      "flex items-center space-y-2 p-3 sm:space-x-4 sm:space-y-0",
      className
    )}
  >
    <label htmlFor="time" className="text-sm font-medium">
      <span className="pr-2">Pick a time:</span>
      <input
        id="time"
        type="time"
        value={value}
        onChange={setValue}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "form-input text-sm font-medium transition duration-200 ease-in-out",
          "focus:border-accent h-9 rounded-md border dark:border-2 bg-transparent p-2 focus:outline-none"
        )}
      />
    </label>
  </div>
);

const DateInput = ({ value, onChange, className = "" }) => {
  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    // Use local date to avoid timezone issues
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (e) => {
    const dateString = e.target.value;
    if (!dateString) {
      onChange(undefined);
      return;
    }

    // Parse the date string manually to avoid timezone issues
    const [year, month, day] = dateString.split("-").map(Number);
    const newDate = new Date(year, month - 1, day); // month is 0-indexed

    if (!Number.isNaN(newDate.getTime())) {
      onChange(newDate);
    }
  };

  return (
    <div className={cn("flex items-center space-y-2 p-3", className)}>
      <label htmlFor="date-input" className="text-sm font-medium">
        Type a date:
        <input
          id="date-input"
          type="date"
          value={formatDateForInput(value)}
          onChange={handleDateChange}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "form-input text-sm font-medium transition duration-200 ease-in-out",
            "focus:border-accent h-9 rounded-md border dark:border-2 bg-transparent p-2 focus:outline-none ml-2"
          )}
        />
      </label>
    </div>
  );
};

const IconLeft = () => <ChevronLeftIcon className="h-4 w-4" />;
const IconRight = () => <ChevronRightIcon className="h-4 w-4" />;

function Calendar({
  withTime = true,
  withDateInput = true,
  className,
  classNames,
  showOutsideDays = true,
  selected,
  onSelect: setSelected,
  ...props
}) {
  const [timeValue, setTimeValue] = React.useState<string>(
    selected
      ? `${new Date(selected)
          .getHours()
          .toString()
          .padStart(2, "0")}:${new Date(selected)
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      : "00:00"
  );

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    let [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));

    // If the input is not a valid time, set the time to 00:00
    // This will handle 00 being inputed on 12h format
    hours = !Number.isFinite(hours) || hours < 0 || hours > 23 ? 0 : hours;
    minutes =
      !Number.isFinite(minutes) || minutes < 0 || minutes > 59 ? 0 : minutes;

    const validatedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    if (!selected) {
      setTimeValue(validatedTime);
      return;
    }

    const selectedDate = new Date(selected);
    const newSelectedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      hours,
      minutes
    );
    setSelected(newSelectedDate);
    setTimeValue(validatedTime);
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      setSelected(date);
      return;
    }
    const [hours, minutes] = timeValue
      .split(":")
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    );
    setSelected(newDate);
  };

  const handleDateInputChange = (date: Date | undefined) => {
    if (!date) {
      setSelected(undefined);
      return;
    }

    if (!withTime) {
      setSelected(date);
      return;
    }

    // Preserve the time when changing the date
    const [hours, minutes] = timeValue
      .split(":")
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    );
    setSelected(newDate);
  };

  const footerContent = React.useMemo(() => {
    const components: React.ReactElement[] = [];

    if (withDateInput) {
      components.push(
        <DateInput
          key="date-input"
          value={selected}
          onChange={handleDateInputChange}
        />
      );
    }

    if (withTime) {
      components.push(
        <TimePicker
          key="time-picker"
          value={timeValue}
          setValue={handleTimeChange}
        />
      );
    }

    return components.length > 0 ? (
      <div className="border-t">{components}</div>
    ) : null;
  }, [withDateInput, withTime, selected, timeValue]);

  return (
    <div>
      <DayPicker
        mode="single"
        showOutsideDays={showOutsideDays}
        selected={selected}
        onSelect={handleDaySelect}
        className={cn("p-3", className)}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          ),
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft,
          IconRight,
        }}
        footer={footerContent}
        {...props}
      />
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
