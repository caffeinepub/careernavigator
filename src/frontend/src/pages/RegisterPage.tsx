import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle, Compass, Loader2, UserPlus } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const BENEFITS = [
  "Save your assessment results permanently",
  "Track career milestones and progress",
  "Get personalized recommendations",
  "Download your career roadmap as PDF",
];

export function RegisterPage() {
  const { login, isLoggingIn, identity } = useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (identity) {
      void navigate({ to: "/dashboard" });
    }
  }, [identity, navigate]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 mesh-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-glow">
          <CardHeader className="text-center pb-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-4">
              <Compass className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-black">
              Start Your Journey
            </h1>
            <p className="text-sm text-muted-foreground font-ui mt-1">
              Create a free account to unlock all features
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Benefits */}
            <div className="bg-primary/5 rounded-xl p-4 space-y-2.5">
              {BENEFITS.map((b) => (
                <div key={b} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="w-full h-12 font-display font-bold text-base"
              size="lg"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Account with Internet Identity
                </>
              )}
            </Button>

            <div className="text-center text-xs text-muted-foreground space-y-1">
              <p>
                Powered by Internet Computer's decentralized identity system.
              </p>
              <p>Free forever. No credit card required.</p>
            </div>

            <div className="text-center">
              <span className="text-sm text-muted-foreground font-ui">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-semibold"
                >
                  Sign in
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
