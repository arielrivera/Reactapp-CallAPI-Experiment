import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import create from "zustand";
import axios from "axios";

// Define your store
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}));

const Counter = () => {
  const { count, increment, decrement } = useStore();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (count > 0) {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${count}`)
        .then((response) => {
          setPost(response.data);
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
          setPost(null);
        });
    } else {
      setPost(null);
    }
  }, [count]);

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      {post && (
        <div>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<Counter />, document.getElementById("root"));
