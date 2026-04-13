import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/items");
    setItems(res.data);
  };

  const addItem = async () => {
    await axios.post("http://localhost:5000/api/items", {
      title,
      description: "demo"
    });
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <input onChange={(e)=>setTitle(e.target.value)} placeholder="Title"/>
      <button onClick={addItem}>Add</button>

      {items.map((item)=>(
        <div key={item.id}>
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;