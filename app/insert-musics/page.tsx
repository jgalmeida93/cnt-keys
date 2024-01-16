"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";

const formSchema = z.object({
  name: z
    .string({
      required_error: "O nome da música é obrigatório",
      invalid_type_error: "O nome não pode conter caracteres especiais",
    })
    .min(2)
    .max(50),
  key: z.string().min(1).max(4),
});

export default function InsertMusics() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      key: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(
        "/api/musics",
        {
          values,
        },
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      form.reset();
      toast.success("Música adicionada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Houve um erro, avisa o Jonão");
    }
  }

  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="container w-1/2 py-20">
        <h2 className="pb-10">Cadastro de músicas</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da música" {...field} />
                  </FormControl>
                  <FormDescription>Digite o nome corretamente</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tom</FormLabel>
                  <FormControl>
                    <Input
                      maxLength={4}
                      placeholder="Tom da música"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Certifique-se de digitar o tom corretamente
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
