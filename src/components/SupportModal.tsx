import React, { useState } from 'react';

export default function SupportModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [status, setStatus] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("access_key", "a9419738-7268-49ee-baa6-974df70f368a");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Sent successfully!');
        form.reset();
        setTimeout(() => {
          setStatus('');
          onClose();
        }, 2000);
      } else {
        setStatus('Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('Failed to send. Check your connection.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-[#11252C] font-bold text-xl transition-colors"
        >
          ✕
        </button>

        <h2 className="text-2xl font-black text-[#11252C] mb-2 uppercase tracking-wide">Contact Support</h2>
        <p className="text-gray-500 text-sm mb-6">Found a bug? Have a suggestion? Let us know!</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#47A659] focus:ring-1 focus:ring-[#47A659] bg-gray-50 text-[#11252C]"
          />
          <textarea
            name="message"
            required
            rows={4}
            placeholder="How can we help?"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#47A659] focus:ring-1 focus:ring-[#47A659] bg-gray-50 resize-none text-[#11252C]"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-[#11252C] hover:bg-[#47A659] text-white font-bold py-4 rounded-xl transition-colors mt-2"
          >
            {status || 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
