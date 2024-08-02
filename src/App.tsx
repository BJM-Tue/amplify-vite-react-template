import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useEffect, useState } from "react";
import { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    const content = window.prompt("Todo content");
    if (!content) return;

    client.models.Todo.create({
      content,
      isDone: false,
    });
  }

  function updateTodo(id: string, isDone: boolean) {
    client.models.Todo.update({ id, isDone });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>{user?.signInDetails?.loginId ?? "My"} todos</h1>
          <button onClick={createTodo}>+</button>
          <ul>
            {todos.map((todo) => (
              <div>
                <li
                  key={todo.id}
                  onClick={() => updateTodo(todo.id, !todo.isDone)}
                  style={{
                    backgroundColor: todo.isDone ? "green" : "white",
                    color: todo.isDone ? "white" : "inherit",
                  }}
                >
                  {todo.content}
                </li>
                <span onClick={() => deleteTodo(todo.id)}>-</span>
              </div>
            ))}
          </ul>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
              Review next step of this tutorial.
            </a>
          </div>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
