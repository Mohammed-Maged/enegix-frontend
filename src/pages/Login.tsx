import { useState } from "react";
import { Label } from "../components/Label";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useLogin } from "../hooks/useLogin";

export const Login = () => {
  const { mutate: login, isPending, isError, error } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-md bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-xl font-semibold text-gray-700">
          Login to Enegix
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Logging in..." : "Sign In"}
          </Button>
          {isError && (
            <p className="mt-2 text-sm text-red-600">
              {(error as Error).message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
