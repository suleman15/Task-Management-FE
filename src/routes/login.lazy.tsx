import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LoginSchema, loginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/api/mutation/login.mutation";

export const Route = createLazyFileRoute("/login")({
  component: () => {
    const loginMutation = useLoginMutation();
    const form = useForm({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        username: "",
        email: "",
        password: "",
      },
    });

    const onSubmit = async (data: LoginSchema) => {
      loginMutation.mutate(data);
    };

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-96 mx-auto my-auto mt-10 py-4"
        >
          <span>
            <h1 className="text-3xl font-bold ">Welcome Back!</h1>
            <p className="text-muted-foreground text-sm">
              Sign in to continue your journey with us.
            </p>
          </span>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email: </FormLabel>
                <FormControl>
                  <Input placeholder="abc@gmail.com" {...field} />
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
                  <Input placeholder="●●●●" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <span className="flex justify-end">
            <Link
              href={"/forget-password"}
              className="text-xs underline-offset-2  underline"
            >
              Forget password
            </Link>
          </span>
          <Button
            type="submit"
            // disabled={loading?.formSubmit}
            className={`w-full`}
          >
            {/* {!loading?.formSubmit ? "Login" : "Logining"} */}
            Login
          </Button>
          <span className="flex text-xs gap-1 ">
            Don't have an account?{" "}
            <Link to={`/register`} className="underline underline-offset-2">
              Register
            </Link>
          </span>
          {/* 
         
        
          
           */}
        </form>
      </Form>
    );
  },
});
