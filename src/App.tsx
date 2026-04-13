import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  return (
    <main className="flex min-h-screen items-start justify-center bg-background px-4 pt-16 pb-10 text-foreground">
      <section className="w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-sm">
        <div className="flex flex-col gap-4">
          {name ? (
            <h1 className="text-center text-3xl font-semibold tracking-tight">
              Hello, {name}!
            </h1>
          ) : (
            <h1 className="text-center text-3xl font-semibold tracking-tight">
              Hello, world!
            </h1>
          )}

          <input
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-base shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
      </section>
    </main>
  );

  // TODO: loader / action or clientLoader / clientAction for API calls. Need example
}

export default App;
