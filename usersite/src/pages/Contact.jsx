import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8088/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#C0E1D2] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-400/10 blur-3xl rounded-full animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#04554c]/10 blur-3xl rounded-full animate-pulse"></div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <div className="animate-[fadeLeft_1s_ease]">
          <span className="inline-block px-4 py-2 rounded-full border border-[#0F2A27]/20 bg-white/30 backdrop-blur-lg text-[#0F2A27] text-sm tracking-[3px] uppercase font-semibold">
            Get In Touch
          </span>

          <h1 className="mt-6 text-5xl md:text-7xl font-black leading-tight text-[#0F2A27]">
            Let's Build
            <span className="block text-[#04554c]">Something Great</span>
          </h1>

          <p className="text-[#0F2A27]/80 mt-8 text-lg leading-8 max-w-xl">
            Have a project idea, business inquiry, or just want to say hello?
            We'd love to hear from you and create something beautiful together.
          </p>

          {/* Contact Cards */}
          <div className="mt-12 space-y-5">
            {[
              {
                icon: "📧",
                title: "Email Us",
                value: "mou@mysite.com",
              },
              {
                icon: "📞",
                title: "Call Us",
                value: "+91 9876543210",
              },
              {
                icon: "📍",
                title: "Location",
                value: "Habra, India",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="group flex items-center gap-5 bg-white/20 border border-white/20 backdrop-blur-xl rounded-3xl p-5 hover:scale-[1.03] hover:border-amber-400 transition-all duration-500 shadow-lg"
                style={{
                  animation: `fadeUp 1s ease ${index * 0.2}s both`,
                }}
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-400 text-black flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  {item.icon}
                </div>

                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>

                  <h3 className="font-bold text-lg text-[#0F2A27]">
                    {item.value}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="relative animate-[fadeRight_1s_ease]">
          {/* Glow */}
          <div className="absolute inset-0 bg-amber-400/10 blur-3xl rounded-[40px]"></div>

          {/* Form Card */}
          <div className="relative bg-white/20 backdrop-blur-2xl border border-white/20 rounded-[40px] p-8 md:p-10 shadow-2xl overflow-hidden">
            {/* Floating Border Effect */}
            <div className="absolute inset-0 rounded-[40px] border border-white/10"></div>

            {sent ? (
              <div className="text-center py-16 animate-[zoomIn_0.7s_ease]">
                <div className="w-24 h-24 bg-[#0F2A27] text-amber-400 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-xl animate-bounce">
                  ✓
                </div>

                <h2 className="text-4xl font-black text-[#0F2A27] mb-4">
                  Message Sent!
                </h2>

                <p className="text-[#0F2A27]/70 text-lg">
                  Thank you for contacting us.
                  <br />
                  We'll get back to you soon.
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-4xl font-black text-[#0F2A27] mb-3">
                    Send a Message
                  </h2>

                  <p className="text-[#0F2A27]/70">
                    Fill out the form and we’ll contact you shortly.
                  </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/10 border border-red-400 text-red-500 px-5 py-4 rounded-2xl animate-pulse">
                      ⚠️ {error}
                    </div>
                  )}

                  {/* Name */}
                  <div className="group">
                    <label className="block mb-2 text-sm font-medium text-[#0F2A27]">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={onChange}
                      placeholder="Enter your name"
                      className="w-full bg-[#0F2A27] border border-transparent rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:scale-[1.02] transition-all duration-300"
                    />
                  </div>

                  {/* Email */}
                  <div className="group">
                    <label className="block mb-2 text-sm font-medium text-[#0F2A27]">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={onChange}
                      placeholder="Enter your email"
                      className="w-full bg-[#0F2A27] border border-transparent rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:scale-[1.02] transition-all duration-300"
                    />
                  </div>

                  {/* Message */}
                  <div className="group">
                    <label className="block mb-2 text-sm font-medium text-[#0F2A27]">
                      Your Message
                    </label>

                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={onChange}
                      placeholder="Write your message..."
                      className="w-full bg-[#0F2A27] border border-transparent rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:scale-[1.02] transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full bg-amber-400 hover:bg-amber-300 text-black font-black py-4 rounded-2xl transition-all duration-300 text-lg overflow-hidden hover:scale-[1.02] shadow-xl shadow-amber-400/20"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? "Sending..." : "Send Message"}

                      {!loading && (
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      )}
                    </span>

                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* CUSTOM ANIMATIONS */}
      <style>
        {`
          @keyframes fadeLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes zoomIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </main>
  );
}
