import React, { useState, useRef } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  imageUrl?: string;
}

const KrishiGPT: React.FC = () => {

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // TODO: Replace with your actual Gemini API key
  const GEMINI_API_KEY = 'AIzaSyDBLpPKz8kZ5_WRNAKPNZE2XBp39DtzTWU';
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  const handleSend = async () => {
    if (!input && !image) return;
    setLoading(true);
    setMessages([...messages, { sender: 'user', text: input, imageUrl: image ? URL.createObjectURL(image) : undefined }]);

    let botResponse = 'Sorry, no response.';
    try {
      let requestBody: any = {
        contents: [
          {
            parts: [
              { text: input }
            ]
          }
        ]
      };

      // If image is attached, convert to base64 and add to request
      if (image) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        const base64 = await toBase64(image);
        // Gemini expects image as { inlineData: { mimeType, data } }
        requestBody.contents[0].parts.push({
          inlineData: {
            mimeType: image.type,
            data: base64.split(',')[1] // Remove data:image/...;base64,
          }
        });
      }

      const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      const data = await res.json();
      botResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
    } catch (err) {
      botResponse = 'Error contacting Gemini API.';
    }
  // Remove '*' and '#' from bot response
  const sanitizedBotResponse = (botResponse || '').replace(/[\*#]/g, '');
  setMessages((prev) => [...prev, { sender: 'bot', text: sanitizedBotResponse }]);
    setLoading(false);
    setInput('');
    setImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}>
      {!open && (
        <button onClick={() => setOpen(true)} style={{ borderRadius: '50%', width: 72, height: 72, background: '#4F46E5', color: '#fff', fontSize: 36, boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}>
          💬
        </button>
      )}
      {open && (
        <div style={{ width: 440, height: 650, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.22)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ background: '#4F46E5', color: '#fff', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Krishi GPT</span>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20 }}>×</button>
          </div>
          <div style={{ flex: 1, padding: 16, overflowY: 'auto', background: '#F3F4F6' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ marginBottom: 12, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                {msg.imageUrl && <img src={msg.imageUrl} alt="attachment" style={{ maxWidth: 120, maxHeight: 120, borderRadius: 8, marginBottom: 4 }} />}
                <div style={{ display: 'inline-block', background: msg.sender === 'user' ? '#6366F1' : '#fff', color: msg.sender === 'user' ? '#fff' : '#111', padding: '8px 12px', borderRadius: 8, maxWidth: '80%' }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div style={{ textAlign: 'center', color: '#6366F1' }}>Thinking...</div>}
          </div>
          <div style={{ padding: 12, borderTop: '1px solid #E5E7EB', background: '#fff', display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              style={{ flex: 1, padding: '8px 10px', borderRadius: 6, border: '1px solid #E5E7EB', marginRight: 8 }}
              disabled={loading}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleImageChange}
              disabled={loading}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{ marginRight: 8, background: '#E0E7FF', border: 'none', borderRadius: 6, padding: '6px 10px', cursor: 'pointer' }}
              disabled={loading}
            >📎</button>
            <button
              onClick={handleSend}
              style={{ background: '#4F46E5', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 14px', cursor: 'pointer' }}
              disabled={loading || (!input && !image)}
            >Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KrishiGPT;
