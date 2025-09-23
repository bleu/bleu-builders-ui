import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useCommandState } from "cmdk";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Badge,
  Button,
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "#/components/ui";
import { cn } from "#/lib/utils";

const SubItem = ({
  tags,
  onSelect,
  triggerAlert,
  alertDescription,
  ...props
}) => {
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [pendingTag, setPendingTag] = React.useState(null);
  const search = useCommandState((state) => state.search);

  if (!search) return null;

  const tagExists = tags.some((tag) => tag.value === search);
  if (tagExists) return null;

  const handleSelect = () => {
    if (triggerAlert) {
      setPendingTag(search as any);
      setIsAlertOpen(true);
    } else {
      onSelect({ tag: search });
    }
  };

  const handleConfirm = () => {
    onSelect({ tag: pendingTag });
    setIsAlertOpen(false);
    setPendingTag(null);
  };

  const handleCancel = () => {
    setIsAlertOpen(false);
    setPendingTag(null);
  };

  return (
    <>
      <CommandItem onSelect={handleSelect} {...props}>
        {search}
      </CommandItem>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {alertDescription || "This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export const TaggablePopover = ({
  tags,
  selectedTags,
  onSelect,
  triggerAlert = false,
  alertDescription = "This action cannot be undone.",
}) => {
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [pendingSelection, setPendingSelection] = React.useState(null);

  const handleSelect = ({ tag }) => {
    if (triggerAlert) {
      setPendingSelection(tag);
      setIsAlertOpen(true);
    } else {
      onSelect({ tag });
    }
  };

  const handleConfirm = () => {
    onSelect({ tag: pendingSelection });
    setIsAlertOpen(false);
    setPendingSelection(null);
  };

  const handleCancel = () => {
    setIsAlertOpen(false);
    setPendingSelection(null);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="my-4 h-8 border-dashed dark:border-2"
          >
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            Tags
            {selectedTags?.length > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  color="secondary"
                  className="rounded-sm px-1 font-normal lg:hidden"
                >
                  {selectedTags.length}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedTags.length > 2 ? (
                    <Badge
                      color="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {selectedTags.length} tags
                    </Badge>
                  ) : (
                    tags
                      .filter((option) => selectedTags.includes(option.value))
                      .map((option) => (
                        <Badge
                          color="secondary"
                          key={option.value}
                          className="rounded-sm px-1 font-normal"
                        >
                          {option.label}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="tags" />
            <CommandList>
              {tags
                .sort(
                  (a, b) =>
                    selectedTags.includes(b.value) -
                      selectedTags.includes(a.value) ||
                    a.label.localeCompare(b.label)
                )
                .map((option) => {
                  const isSelected = selectedTags.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelect({ tag: option.value })}
                    >
                      <div
                        className={cn(
                          "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className={cn("h-4 w-4")} />
                      </div>
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              <SubItem
                tags={tags}
                onSelect={handleSelect}
                triggerAlert={triggerAlert}
                alertDescription={alertDescription}
              />
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {alertDescription || "This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
