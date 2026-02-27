import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Save, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetProfile, useSaveProfile } from "../hooks/useQueries";
import { EDUCATION_LEVELS, STREAMS } from "../lib/careers";

export function ProfilePage() {
  const { identity } = useInternetIdentity();
  const { data: profile, isLoading } = useGetProfile();
  const saveProfile = useSaveProfile();

  const [name, setName] = useState("");
  const [education, setEducation] = useState("");
  const [stream, setStream] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEducation(profile.education);
      setStream(profile.stream);
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      await saveProfile.mutateAsync({ name, education, stream });
      toast.success("Profile saved successfully!");
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  const principal = identity?.getPrincipal().toString() ?? "";

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-black mb-2">
            Profile Settings
          </h1>
          <p className="text-muted-foreground font-ui text-sm">
            Manage your personal information
          </p>
        </div>

        {/* Identity Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-ui font-semibold text-sm">Internet Identity</p>
              <p className="text-xs text-muted-foreground font-mono truncate">
                {principal}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <h2 className="font-display font-bold text-base">
                Personal Information
              </h2>
            </CardHeader>
            <CardContent className="space-y-5">
              {isLoading ? (
                <div className="space-y-4">
                  {["a", "b", "c"].map((k) => (
                    <div
                      key={k}
                      className="h-12 bg-muted rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label
                      htmlFor="profile-name"
                      className="font-ui font-semibold text-sm"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="profile-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-ui font-semibold text-sm">
                      Education Level
                    </Label>
                    <Select value={education} onValueChange={setEducation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        {EDUCATION_LEVELS.map((e) => (
                          <SelectItem key={e} value={e}>
                            {e}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-ui font-semibold text-sm">
                      Stream / Field
                    </Label>
                    <Select value={stream} onValueChange={setStream}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your stream" />
                      </SelectTrigger>
                      <SelectContent>
                        {STREAMS.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleSave}
                    disabled={saveProfile.isPending || !name}
                    className="w-full font-display font-bold"
                  >
                    {saveProfile.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Profile
                      </>
                    )}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
