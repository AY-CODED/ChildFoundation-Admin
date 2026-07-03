import { useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import api from '../services/api';

export default function Broadcast() {
  const [emailData, setEmailData] = useState({ subject: '', body: '' });
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const sendBroadcast = async () => {
    if (!emailData.subject || !emailData.body) {
      setMessage({ type: 'error', text: 'Subject and body are required.' });
      return;
    }

    setSending(true);
    setMessage({ type: '', text: '' });

    try {
      await api.post('/broadcast', emailData);
      setMessage({ type: 'success', text: 'Newsletter sent successfully!' });
      setEmailData({ subject: '', body: '' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to send newsletter.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Email Broadcast</h2>
        <p className="text-gray-600 mb-8">
          Send newsletters to all subscribers with ease.
        </p>

        {/* Subject */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">Subject</label>
          <input
            type="text"
            placeholder="Enter subject..."
            value={emailData.subject}
            onChange={e => setEmailData({ ...emailData, subject: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-purple-400 focus:border-purple-500 outline-none transition"
          />
        </div>

        {/* Body */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">Newsletter Body</label>
          <textarea
            rows="8"
            placeholder="Write your newsletter content..."
            value={emailData.body}
            onChange={e => setEmailData({ ...emailData, body: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 resize-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 outline-none transition"
          />
        </div>

        {/* Feedback */}
        {message.text && (
          <div
            className={`mb-6 p-3 rounded-lg text-sm font-medium ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Button */}
        <button
          onClick={sendBroadcast}
          disabled={sending}
          className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-4 rounded-lg font-bold text-lg shadow-md flex justify-center items-center gap-3"
        >
          {sending ? (
            <>
              <Loader2 className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={20} />
              Send to All
            </>
          )}
        </button>
      </div>
    </div>
  );
}
