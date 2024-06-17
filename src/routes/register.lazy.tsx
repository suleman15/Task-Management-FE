import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useRegisterMutation } from "@/api/mutation/register.mutation";
import { RegisterSchema, registerSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const Route = createLazyFileRoute("/register")({
  component: () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const registerMutation = useRegisterMutation();
    const form = useForm({
      resolver: zodResolver(registerSchema),
      defaultValues: {
        username: "",
        email: "",
        password: "",
      },
    });
    const onSubmit = async (data: RegisterSchema) => {
      registerMutation.mutate(data);
    };

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-96 mx-auto my-auto mt-10 py-4"
        >
          <span>
            <h1 className="text-3xl font-bold ">Join Us Today!</h1>
            <p className="text-muted-foreground text-sm">
              Start your journey by creating an account.
            </p>
          </span>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    disabled={registerMutation.isPending}
                    placeholder="John Mike"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email: </FormLabel>
                <FormControl>
                  <Input
                    disabled={registerMutation.isPending}
                    placeholder="abc@gmail.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      disabled={registerMutation.isPending}
                      placeholder="●●●●"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <span
                      className="absolute right-3"
                      onClick={() => setShowPassword((p) => !p)}
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            // disabled={loading?.formSubmit}
            className={`w-full`}
          >
            {/* {!loading?.formSubmit ? "Register" : "Registering"} */}
            Register
          </Button>
          <span className="text-xs my-2 flex gap-1">
            Already have an account?
            <Link to={"/login"} className="underline underline-offset-2 ">
              login
            </Link>
          </span>
          {/*
          
          
         
         
          
        */}
        </form>
      </Form>
    );
  },
});
