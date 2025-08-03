import { createFileRoute } from "@tanstack/react-router";
import { MainForm } from "../components/MainForm";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <main className="container mx-auto py-10 px-4 space-y-10">
      <div className="prose">
        <h1>Compounding Interest Calculator</h1>
        <p>
          This calculator will calculate the future value of your savings and
          investments based on your contributions, expected growth rate, and
          your goals.
        </p>
      </div>
      <MainForm />
    </main>
  );
}
