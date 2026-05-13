const stats = [
  { label: "Projects Done", value: "120+" },
  { label: "Happy Clients", value: "80+" },
  { label: "Years Experience", value: "5+" },
];

export default function About() {
  return (
    <main className="relative min-h-screen bg-[#C0E1D2] overflow-hidden pt-28 pb-20 px-6">
      {/* Animated Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-300/20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#04554c]/20 blur-3xl rounded-full animate-bounce"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">
          {/* Left */}
          <div className="animate-[fadeIn_1s_ease-in-out]">
            <span className="inline-block px-4 py-1 rounded-full bg-[#0F2A27]/10 border border-[#0F2A27]/20 text-[#04554c] text-sm font-semibold uppercase tracking-[3px] mb-6 hover:scale-105 transition-transform duration-300">
              Who We Are
            </span>

            <h1 className="text-5xl md:text-7xl font-black text-[#0F2A27] leading-tight mb-8">
              About
              <span className="block text-[#04554c] animate-pulse">
                Our Company
              </span>
            </h1>

            <p className="text-[#0F2A27]/80 text-lg leading-9 max-w-2xl">
              We are a passionate team of designers and developers dedicated to
              crafting beautiful, high-performance digital experiences. Our work
              blends creativity with precision to help businesses stand out and
              grow in the digital world.
            </p>

            {/* Small Features */}
            <div className="flex flex-wrap gap-4 mt-10">
              <div className="px-5 py-3 rounded-2xl bg-white/60 backdrop-blur-lg border border-white/40 shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <span className="font-semibold text-[#04554c]">
                  ⚡ Fast Performance
                </span>
              </div>

              <div className="px-5 py-3 rounded-2xl bg-white/60 backdrop-blur-lg border border-white/40 shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <span className="font-semibold text-[#04554c]">
                  🎨 Modern Design
                </span>
              </div>

              <div className="px-5 py-3 rounded-2xl bg-white/60 backdrop-blur-lg border border-white/40 shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <span className="font-semibold text-[#04554c]">
                  📱 Responsive Layout
                </span>
              </div>
            </div>
          </div>

          {/* Right Design Card */}
          <div className="relative animate-[float_5s_ease-in-out_infinite]">
            {/* Glow */}
            <div className="absolute inset-0 bg-[#04554c]/10 blur-3xl rounded-[40px]"></div>

            <div className="relative bg-[#0F2A27] rounded-[40px] p-8 shadow-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-500">
              {/* Decorative Circle */}
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-amber-400/20 animate-spin"></div>

              {/* Top */}
              <div className="flex items-center gap-2 mb-8">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>

              {/* Card Content */}
              <div className="space-y-6 relative z-10">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-amber-400 transition-all duration-300">
                  <p className="text-gray-400 text-sm mb-3">
                    Creative Solutions
                  </p>

                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div className="bg-amber-400 h-3 rounded-full w-[92%] animate-pulse"></div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-amber-400 transition-all duration-300">
                  <p className="text-gray-400 text-sm mb-3">
                    Client Satisfaction
                  </p>

                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div className="bg-amber-400 h-3 rounded-full w-[96%] animate-pulse"></div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-amber-400 transition-all duration-300">
                  <p className="text-gray-400 text-sm mb-3">Project Delivery</p>

                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div className="bg-amber-400 h-3 rounded-full w-[88%] animate-pulse"></div>
                  </div>
                </div>

                {/* Bottom Banner */}
                <div className="bg-gradient-to-r from-amber-400 to-yellow-300 rounded-3xl p-6 mt-8 hover:scale-105 transition-transform duration-300">
                  <h3 className="text-2xl font-black text-[#0F2A27] mb-2">
                    Building Premium Experiences
                  </h3>

                  <p className="text-[#0F2A27]/80 leading-7">
                    We combine creativity, strategy, and technology to deliver
                    stunning digital products that people love.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">
          {stats.map((s, index) => (
            <div
              key={s.label}
              className="group bg-[#0F2A27] rounded-[30px] p-10 text-center shadow-xl hover:-translate-y-4 hover:rotate-1 transition-all duration-500 cursor-pointer"
              style={{
                animation: `fadeUp 0.8s ease forwards ${index * 0.2}s`,
              }}
            >
              <h2 className="text-5xl font-black text-amber-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {s.value}
              </h2>

              <p className="text-gray-400 text-lg">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="relative bg-[#0F2A27] rounded-[35px] p-10 overflow-hidden shadow-2xl hover:-translate-y-3 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl animate-pulse"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-amber-400 text-[#0F2A27] flex items-center justify-center text-3xl mb-6 hover:rotate-12 transition-transform duration-300">
                🚀
              </div>

              <h2 className="text-3xl font-black text-white mb-5">
                Our Mission
              </h2>

              <p className="text-gray-400 leading-8 text-lg">
                To empower businesses and individuals by building fast,
                accessible, and visually exceptional web experiences — from
                concept to deployment.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="relative bg-[#0F2A27] rounded-[35px] p-10 overflow-hidden shadow-2xl hover:-translate-y-3 transition-all duration-500">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#04554c]/20 rounded-full blur-2xl animate-pulse"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-amber-400 text-[#0F2A27] flex items-center justify-center text-3xl mb-6 hover:rotate-12 transition-transform duration-300">
                👁️
              </div>

              <h2 className="text-3xl font-black text-white mb-5">
                Our Vision
              </h2>

              <p className="text-gray-400 leading-8 text-lg">
                To become a leading digital creative agency known for
                innovation, quality, and delivering experiences that inspire
                people worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
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

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateX(-40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </main>
  );
}
