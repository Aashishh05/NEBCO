import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/slices/authSlice.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Lock } from "lucide-react";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, status, error } = useSelector((state) => state.auth);
  const from = location.state?.from?.pathname || "/admin";

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, from, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    dispatch(login({ email: form.get("email"), password: form.get("password") }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f1ec] p-6">
      <div className="w-full max-w-sm border border-border bg-white p-8 shadow-[0_4px_24px_#43381b0d]">
        <div className="flex flex-col items-center">
          <img
            src="/images/nebco-logo.png"
            alt="NEBCO — Quality, Integrity, Timely"
            className="h-20 w-auto object-contain"
          />
          <span className="mt-3 text-[13px] font-bold uppercase tracking-[0.18em] text-red">
            Admin panel
          </span>
        </div>

        <h1 className="mt-6 text-xl font-bold text-ink">Sign in</h1>
        <p className="mt-1 text-sm text-muted-fg">
          Enter your staff credentials to continue.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" className="h-11 rounded-none" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="h-11 rounded-none"
            />
          </div>

          {error && (
            <p className="flex items-center gap-2 border border-red/30 bg-red/5 px-3 py-2 text-sm text-red">
              <Lock className="size-4" />
              {error}
            </p>
          )}

          <Button type="submit" className="h-11 w-full rounded-none " disabled={status === "loading"}>
            {status === "loading" ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-fg">
          © {new Date().getFullYear()} NEBCO · From land to landmark.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
