import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import api from "../services/api";

export default function Broadcast() {
  const [emailData, setEmailData] = useState({
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const [feedback, setFeedback] = useState({
    type: "",
    text: "",
  });

  const sendBroadcast = async () => {
    if (!emailData.subject.trim() || !emailData.message.trim()) {
      setFeedback({
        type: "error",
        text: "Subject and message are required.",
      });
      return;
    }

    setSending(true);
    setFeedback({
      type: "",
      text: "",
    });

    try {
      await api.post("/email/broadcast", {
        subject: emailData.subject,
        message: emailData.message,
      });

      setFeedback({
        type: "success",
        text: "Broadcast email sent successfully!",
      });

      setEmailData({
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to send broadcast email.";

      setFeedback({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-gray-900">
          Email Broadcast
        </h1>

        <p className="text-gray-600 mt-2 mb-8">
          Send an email to every registered user except the admin account.
        </p>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">
            Subject
          </label>

          <input
            type="text"
            value={emailData.subject}
            onChange={(e) =>
              setEmailData({
                ...emailData,
                subject: e.target.value,
              })
            }
            placeholder="Enter email subject..."
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">
            Message
          </label>

          <textarea
            rows={8}
            value={emailData.message}
            onChange={(e) =>
              setEmailData({
                ...emailData,
                message: e.target.value,
              })
            }
            placeholder="Write your message..."
            className="w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {feedback.text && (
          <div
            className={`mb-6 rounded-lg p-4 ${
              feedback.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {feedback.text}
          </div>
        )}

        <button
          onClick={sendBroadcast}
          disabled={sending}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-4 rounded-lg font-bold flex items-center justify-center gap-3 transition"
        >
          {sending ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Sending...
            </>
          ) : (
            <>
              <Send size={20} />
              Send Broadcast
            </>
          )}
        </button>

      </div>
    </div>
  );
}