import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "../../components/ui/Form";
import { LayoutedFormBuilder } from "../../components/FormBuilder/LayoutedFormBuilder";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/Card";
import { FormGroup } from "../../components/FormBuilder/layoutedTypes";
import { Button } from "../../components/ui/Button";
import { toast } from "../../hooks/useToast";

const DEFAULT_GROUPS: FormGroup[] = [
  {
    group: "group_1",
    title: "Demo",
    description: "Demo with simple inputs",
    layout: {
      columns: 2,
      gap: "medium",
      border: "none",
    },
    fields: [
      {
        type: "input",
        name: "input_normal",
        label: "Simple text input",
        required: true,
        position: { row: 1, col: 1, span: 1 },
      },
      {
        type: "input",
        mode: "number",
        name: "number",
        label: "Number input",
        required: true,
        description: "This is a number input",
        position: { row: 1, col: 2, span: 1 },
      },
      {
        type: "textarea",
        name: "text",
        label: "Text input",
        required: true,
        description: "This is a text input",
        position: { row: 2, col: 1, span: 1 },
      },
      {
        type: "wysiwyg",
        name: "wysiwyg",
        label: "Wysiwyg / Rich Text input",
        description: "This is a wysiwyg where you can write rich text",
        position: { row: 3, col: 2, span: 1 },
      },
    ],
  },
];

export default function LayoutedFormBuilderDemo({
  title = "Layouted Form Builder Demo",
  description = "Demo of the new layouted form builder with groups and positioning",
  groups = DEFAULT_GROUPS,
}: {
  description?: string;
  groups?: FormGroup[];
  title?: string;
}) {
  const form = useForm();

  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(form.getValues(), null, 2)}
          </code>
        </pre>
      ),
    });
  };

  return (
    <Card className="max-w-full min-w-[30rem] border dark:border-2 shadow-sm">
      <Form {...form} onSubmit={(e) => e.preventDefault()}>
        <CardHeader className="pt-6 px-6">
          <CardTitle className="mt-0 p-0 text-xl font-semibold text-foreground mb-2">
            {title}
          </CardTitle>
          <CardDescription className="py-0 pl-0 text-sm">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <LayoutedFormBuilder groups={groups} form={form} />
        </CardContent>
        <CardFooter className="flex justify-end border-t px-6 py-3 text-sm">
          <Button className="h-8" type="button" onClick={handleSubmit}>
            Submit
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
}
