import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "../../components/ui/Form";
import { buildForm } from "../../components/FormBuilder/buildForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/Card";
import { BaseField } from "../../components/formBuilder/types";
import { Button } from "../../components/ui/Button";
import { toast } from "../../hooks/useToast";

const FIELDS = [
  {
    type: "input",
    name: "title",
    label: "Informe um nome para identificação do cliente analisado:",
    required: true,
  },
] as BaseField[];

export default function FormBuilderDemo({
  title,
  description,
  fields = FIELDS,
}) {
  const form = useForm();

  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
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
    <Card className="max-w-full min-w-[30rem] border dark:border-2 shadow-sm bg-">
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
          <div className="flex flex-wrap gap-4">
            {buildForm(fields, form, undefined)}
          </div>
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
