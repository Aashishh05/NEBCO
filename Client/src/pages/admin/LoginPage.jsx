import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { login } from "@/store/slices/authSlice.js";
import FormField from "@/components/forms/FormField";



const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, status, error } = useSelector((state) => state.auth);
  const from = location.state?.from?.pathname || "/admin";
  const loading = status === "loading";
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, from, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    dispatch(login({ email: form.get("email"), password: form.get("password") }));
  };

  const inputClass =
    "h-12 w-full rounded-none border border-input bg-transparent px-3 text-base outline-none transition-colors focus-visible:border-red";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f1ec] p-6">
      <div className="w-full max-w-[420px] border border-border bg-white p-9 shadow-[0_10px_40px_#43381b12] max-[700px]:p-7">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex bg-white p-2">
            <img
              src="/images/nebco-logo.png"
              alt="NEBCO — Quality, Integrity, Timely"
              className="h-20 w-auto object-contain"
            />
          </span>

          <p className="mt-5 flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.12em] text-[#62645d]">
            <span aria-hidden="true" className="h-[2px] w-7 shrink-0 bg-red" />
            Admin panel
          </p>

          <h1 className="mt-4 text-[32px] font-normal leading-[1.15] tracking-[-0.04em] text-ink">
            Welcome back.
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-fg">
            Sign in with your staff credentials to continue.
          </p>
        </div>

        <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
          <FormField label="Email" htmlFor="email" required>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@nebco.com.np"
              className={inputClass}
            />
          </FormField>

          <FormField label="Password" htmlFor="password" required>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-muted-fg transition-colors hover:text-ink"
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </FormField>

          {error && (
            <p className="flex items-start gap-2 border border-red/30 bg-red/5 px-3 py-2 text-sm text-red">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              {error}
            </p>
          )}

          <button type="submit" className="button mt-1 w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default LoginPage;
