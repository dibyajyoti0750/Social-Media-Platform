```sh
npm create vite@latest Frontend
npm install tailwindcss @tailwindcss/vite
mkdir -p src/Pages && touch src/Pages/Home.jsx
```

Home.jsx

```jsx
export default function Home() {
  return <div>Home Page</div>;
}
```

App.jsx

```jsx
import Home from "./Pages/Home";

export default function App() {
  return (
    <>
      <Home />
    </>
  );
}
```

app.js

```js
// Home Route
app.get("/", async (req, res) => {
  try {
    const allPosts = await Post.find({});
    res.status(200).json({ success: true, data: allPosts });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});
```

Home.jsx

```jsx
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const fetchAllPosts = async () => {
    try {
      const response = await fetch("http://localhost:8080/");
      const data = await response.json();
      setPosts(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div>
      {posts.map((post, idx) => (
        <div key={idx}>
          <p>
            {idx}. {post.content}
          </p>
          {post.image && (
            <img className="h-50" src={post.image} alt="post_image" />
          )}
        </div>
      ))}
    </div>
  );
}
```

index.css

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
@import "tailwindcss";

* {
  font-family: "Inter", sans-serif;
}
```

Context.jsx

```jsx
import { createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const contextValue = { count, setCount };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};
```

main.jsx

```jsx
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MyProvider } from "./Context.jsx";

createRoot(document.getElementById("root")).render(
  <MyProvider>
    <App />
  </MyProvider>
);
```

**Basic setup done, now on your own** 👍
