import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Pencil2Icon } from "@radix-ui/react-icons";
import { useState } from "react";

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

export const EditUser = (data: any) => {
  const [open, setOpen] = useState(false);
  const {
    data: { name, key, _id: id },
  } = data;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      key: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, key } = values;
    try {
      await axios.put(
        `/api/musics/${id}`,
        {
          newName: name,
          newKey: key,
        },
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      form.reset();
      setOpen(false);
      toast.success("Música alterada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Houve um erro, avisa o Jonão");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Pencil2Icon className="mr-2 h-4 w-4" /> Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2 className="pb-10">Cadastro de músicas</h2>
          <Form {...form}>
            <form
              id="editForm"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={name}
                        onChange={onChange}
                        placeholder="Nome da música"
                      />
                    </FormControl>
                    <FormDescription>
                      Digite o nome corretamente
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="key"
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormLabel>Tom</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={key}
                        maxLength={4}
                        onChange={onChange}
                        placeholder="Tom da música"
                      />
                    </FormControl>
                    <FormDescription>
                      Certifique-se de digitar o tom corretamente
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogHeader>
        <DialogFooter>
          <Button form="editForm" type="submit">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
