import { useState, useEffect } from "react";

const API = "http://localhost:8088/api/messages";
const ADMIN_EMAIL = "moupriya.work01@gmail.com"; // 👈 change to your email
const getToken = () =>
  sessionStorage.getItem("adminToken") || localStorage.getItem("token") || "";
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ msg: "", type: "" });
  const [replyModal, setReplyModal] = useState(null); // { id, name, email }
  const [replyText, setReplyText] = useState("");

  const showMsg = (msg, type = "success") => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback({ msg: "", type: "" }), 3000);
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(API, { headers: authHeaders() });
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch {
      showMsg("Failed to load messages", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ─── Mark Read ────────────────────────────────────────────────────────────
  const markRead = async (id) => {
    try {
      const res = await fetch(`${API}/${id}/read`, {
        method: "PUT",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Failed");
      fetchMessages();
      showMsg("✅ Marked as read");
    } catch {
      showMsg("Failed to mark read", "error");
    }
  };

  // ─── Delete ───────────────────────────────────────────────────────────────
  const deleteMsg = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Failed");
      setMessages((prev) => prev.filter((m) => m.id !== id));
      showMsg("✅ Message deleted");
    } catch {
      showMsg("Failed to delete", "error");
    }
  };

  // ─── Reply via Email ──────────────────────────────────────────────────────
  const sendReply = () => {
    if (!replyText.trim()) return;
    const subject = encodeURIComponent(`Reply from MySite`);
    const body = encodeURIComponent(replyText + `\n\n— ${ADMIN_EMAIL}`);
    window.open(
      `mailto:${replyModal.email}?subject=${subject}&body=${body}`,
      "_blank",
    );
    setReplyModal(null);
    setReplyText("");
    showMsg("✅ Email client opened!");
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-white mb-8">Messages</h1>

      {/* Feedback */}
      {feedback.msg && (
        <div
          className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${
            feedback.type === "error"
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "bg-green-500/20 text-green-400 border border-green-500/30"
          }`}
        >
          {feedback.msg}
        </div>
      )}

      {/* Reply Modal */}
      {replyModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-white font-bold text-xl mb-1">
              Reply to {replyModal.name}
            </h2>
            <p className="text-gray-400 text-sm mb-6">{replyModal.email}</p>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply..."
              rows={5}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 resize-none mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={sendReply}
                className="flex-1 py-2.5 bg-amber-400 text-gray-900 font-bold rounded-lg hover:bg-amber-300 transition-colors"
              >
                Open in Email App
              </button>
              <button
                onClick={() => {
                  setReplyModal(null);
                  setReplyText("");
                }}
                className="flex-1 py-2.5 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-3 text-center">
              This will open your default email app with the reply pre-filled.
            </p>
          </div>
        </div>
      )}

      {/* Messages List */}
      {loading ? (
        <p className="text-gray-400">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No messages yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`bg-gray-800 border rounded-2xl p-6 transition-colors ${
                !m.read ? "border-amber-400/50" : "border-gray-700"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-white font-bold">{m.name}</p>
                    {!m.read && (
                      <span className="text-xs bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded-full font-medium">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs mb-3">
                    {m.email} · {new Date(m.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-300">{m.message}</p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setReplyModal({ id: m.id, name: m.name, email: m.email });
                      setReplyText("");
                    }}
                    className="px-3 py-1.5 bg-amber-400/20 text-amber-400 rounded-lg text-xs font-medium hover:bg-amber-400/30 transition-colors"
                  >
                    ✉️ Reply
                  </button>
                  {!m.read && (
                    <button
                      onClick={() => markRead(m.id)}
                      className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-xs font-medium hover:bg-green-500/30 transition-colors"
                    >
                      ✓ Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteMsg(m.id)}
                    className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-xs font-medium hover:bg-red-500/30 transition-colors"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
