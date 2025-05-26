import { useEffect, useState } from "react";

function App() {
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/hello/")
      .then((res) => res.json())
      .then((data) => setMensagem(data.mensagem));
  }, []);

  return (
    <div>
      <h1>Hello World from React!</h1>
      <h2>{mensagem}</h2>
    </div>
  );
}

export default App;