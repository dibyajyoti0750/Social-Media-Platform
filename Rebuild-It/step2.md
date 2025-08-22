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

Home.jsx

```jsx
import { useState } from "react";
import { useEffect } from "react";
import "./Home.css";

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
          <p>{post.content}</p>
          <img src={post.image} alt="post_image" />
        </div>
      ))}
    </div>
  );
}
```

Home.css

```css
img {
  width: 5rem;
  height: 5rem;
}
```
