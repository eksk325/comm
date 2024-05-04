import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="center-form">
      <SignUp path="/sign-up" />
    </div>
  );
}
