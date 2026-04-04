import { clsx } from "clsx"; // Add this line
import "./App.css";

function App() {
  return (
    <h1 className={clsx("text-3xl font-bold text-blue-950 underline")}>
      Hello, world!
    </h1>
  );
}

export default App;
