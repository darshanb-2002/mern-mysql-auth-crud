import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");

  const [editId, setEditId] = useState(null);

  // ================= FETCH DATA =================
  useEffect(() => {
    fetchItems();
    fetchStats();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get("/api/items");
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get("/api/items/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= ADD / UPDATE =================
  const handleSubmit = async () => {
    try {
      if (editId) {
        await api.put(`/api/items/${editId}`, {
          title,
          description,
          status,
        });

        setEditId(null);
      } else {
        await api.post("/api/items", {
          title,
          description,
          status,
        });
      }

      setTitle("");
      setDescription("");
      setStatus("active");

      fetchItems();
      fetchStats();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= EDIT =================
  const startEdit = (item) => {
    setEditId(item._id);
    setTitle(item.title);
    setDescription(item.description);
    setStatus(item.status);
  };

  // ================= DELETE =================
  const deleteItem = async (id) => {
    try {
      await api.delete(`/api/items/${id}`);
      fetchItems();
      fetchStats();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (id) => {
    const ok = window.confirm("Are you sure you want to delete this item?");
    if (ok) deleteItem(id);
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>

      {/* ================= NAVBAR ================= */}
      <div className="flex justify-between p-4 bg-gray-800 text-white">
        <span className="font-bold">Dashboard</span>
        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="bg-blue-200 p-3 rounded">
          Total: {stats.total}
        </div>
        <div className="bg-green-200 p-3 rounded">
          Active: {stats.active}
        </div>
        <div className="bg-yellow-200 p-3 rounded">
          Pending: {stats.pending}
        </div>
        <div className="bg-purple-200 p-3 rounded">
          Completed: {stats.completed}
        </div>
      </div>

      {/* ================= FORM ================= */}
      <div className="p-4 border m-4 rounded">
        <h2 className="font-bold mb-2">
          {editId ? "Edit Item" : "Add Item"}
        </h2>

        <input
          placeholder="Title"
          className="border p-2 w-full mb-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border p-2 w-full mb-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="active">active</option>
          <option value="pending">pending</option>
          <option value="completed">completed</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Item" : "Add Item"}
        </button>
      </div>

      {/* ================= ITEMS LIST ================= */}
      <div className="p-4">
        <h2 className="font-bold mb-2">Items List</h2>

        {items.length === 0 ? (
          <p>No items found</p>
        ) : (
          items.map((item) => (
            <div key={item._id} className="border p-3 mb-2 rounded">

              <h3 className="font-bold">{item.title}</h3>
              <p>{item.description}</p>
              <p>Status: {item.status}</p>

              <div className="mt-2">

                <button
                  onClick={() => startEdit(item)}
                  className="bg-yellow-500 px-2 py-1 mr-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 px-2 py-1 text-white rounded"
                >
                  Delete
                </button>

              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Dashboard;