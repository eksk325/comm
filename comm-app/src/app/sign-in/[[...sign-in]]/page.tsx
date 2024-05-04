import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="center-form">
      <SignIn path="/sign-in" />
    </div>
  );
}
