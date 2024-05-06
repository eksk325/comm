"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Page() {
  const { user } = useUser();
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="center-form">
      <SignIn path="/sign-in" />
    </div>
  );
}
