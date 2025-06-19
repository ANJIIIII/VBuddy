const PetVeterinaryHomepage = () => {
  const services = [
    {
      title: "Veterinary Care",
      description: "Complete health checkups and medical care for your beloved pets",
      icon: "🏥",
    },
    {
      title: "Pet Grooming",
      description: "Professional grooming services to keep your pets looking their best",
      icon: "✂️",
    },
    {
      title: "Day School",
      description: "Educational and training programs for your pets' development",
      icon: "🎓",
    },
    {
      title: "Play School",
      description: "Fun and interactive activities for pets to socialize and play",
      icon: "🎾",
    },
    {
      title: "Day Care",
      description: "Safe and caring environment for your pets while you're away",
      icon: "🏠",
    },
    {
      title: "Emergency Care",
      description: "24/7 emergency services for urgent pet health situations",
      icon: "🚑",
    },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "white" }}>
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative background elements */}
        <div
          className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-10"
          style={{ backgroundColor: "#948979" }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5"
          style={{ backgroundColor: "#393E46" }}
        ></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Text */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight"
                  style={{ color: "#222831" }}
                >
                 Gentle Hands, Happy {" "}
                  <span className="relative inline-block">
                    <span style={{ color: "#393E46" }}>Paws</span>
                    <div
                      className="absolute -bottom-2 left-0 w-full h-3 opacity-30"
                      style={{ backgroundColor: "#948979" }}
                    ></div>
                  </span>
                </h1>
                <p className="text-xl md:text-2xl leading-relaxed font-medium" style={{ color: "#393E46" }}>
                  Trust us with your pet's wellbeing.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <button
                  className="group px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                  style={{ backgroundColor: "#222831", color: "white" }}
                >
                  <span className="relative z-10">Schedule Appointment</span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundColor: "#948979" }}
                  ></div>
                </button>
                <button
                  className="px-10 py-4 rounded-2xl font-bold text-lg border-3 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
                  style={{
                    borderColor: "#393E46",
                    color: "#393E46",
                    backgroundColor: "transparent",
                  }}
                >
                  Learn More
                </button>
              </div>

             
            </div>

            {/* Right side - Image */}
            <div className="relative">
              
              <img
                className="relative z-10 w-full max-w-[500px] h-auto "
                src="./images/3.png"
                alt="Pet care"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#393E46" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: "white" }}>
              About Us
            </h2>
            <div className="w-24 h-1 mx-auto" style={{ backgroundColor: "#948979" }}></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-2xl">
                <img
                  className="w-full object-cover"
                  src="./images/4.png"
                  alt="About us"
                />
              </div>

            <div className="space-y-6">
             <div className="h-[500px] flex flex-col justify-center">
                  <p className="text-4xl md:text-5xl leading-[1.4] font-semibold text-white">
                    At PetCure, we offer expert veterinary care, grooming, daycare, and training—all under one roof.
                  </p>
                  <p className="text-2xl leading-[1.8] text-[#948979] mt-6">
                    From health to happiness, we are committed to giving your pets the best care they deserve.
                  </p>
                </div>

            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: "#222831" }}>
              Our Services
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: "#948979" }}></div>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto font-medium" style={{ color: "#393E46" }}>
              Comprehensive care for your pets with professional services designed to keep them healthy and happy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl transition-all duration-500 hover:transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-2xl overflow-hidden"
                style={{ backgroundColor: "white" }}
              >
                {/* Hover background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: "#393E46" }}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3
                    className="text-2xl font-bold mb-4 group-hover:text-white transition-colors duration-300"
                    style={{ color: "#222831" }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                    style={{ color: "#393E46" }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Decorative element */}
                <div
                  className="absolute top-4 right-4 w-12 h-12 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ backgroundColor: "#948979" }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#948979" }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight" style={{ color: "#222831" }}>
            Ready to Give Your Pet the Best Care?
          </h2>
          <p className="text-xl md:text-2xl mb-12 font-medium" style={{ color: "#393E46" }}>
            Join hundreds of satisfied pet parents who trust us with their furry family members
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              className="px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: "#222831", color: "white" }}
            >
              Book Appointment
            </button>
            <button
              className="px-12 py-5 rounded-2xl font-bold text-xl border-3 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
              style={{
                borderColor: "#393E46",
                color: "#393E46",
                backgroundColor: "transparent",
              }}
            >
              Call Us Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#222831" }} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">🐾</span>
                <h3 className="text-2xl font-black" style={{ color: "white" }}>
                  PetCare Plus
                </h3>
              </div>
              <p className="text-lg leading-relaxed" style={{ color: "#948979" }}>
                Your trusted partner in pet care, providing comprehensive services for your beloved companions.
              </p>
              <div className="flex space-x-4">
                <span
                  className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-all duration-300 transform hover:scale-110"
                  style={{ backgroundColor: "white" }}
                >
                  <span className="text-xl">📘</span>
                </span>
                <span
                  className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-all duration-300 transform hover:scale-110"
                  style={{ backgroundColor: "white" }}
                >
                  <span className="text-xl">📷</span>
                </span>
                <span
                  className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-all duration-300 transform hover:scale-110"
                  style={{ backgroundColor: "white" }}
                >
                  <span className="text-xl">🐦</span>
                </span>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold" style={{ color: "white" }}>
                Services
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-lg hover:opacity-80 transition-opacity duration-300"
                    style={{ color: "#948979" }}
                  >
                    Veterinary Care
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-lg hover:opacity-80 transition-opacity duration-300"
                    style={{ color: "#948979" }}
                  >
                    Pet Grooming
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-lg hover:opacity-80 transition-opacity duration-300"
                    style={{ color: "#948979" }}
                  >
                    Day Care
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-lg hover:opacity-80 transition-opacity duration-300"
                    style={{ color: "#948979" }}
                  >
                    Training
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold" style={{ color: "white" }}>
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-lg hover:opacity-80 transition-opacity duration-300"
                    style={{ color: "#948979" }}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-lg hover:opacity-80 transition-opacity duration-300"
                    style={{ color: "#948979" }}
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-lg hover:opacity-80 transition-opacity duration-300"
                    style={{ color: "#948979" }}
                  >
                    Appointments
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-lg hover:opacity-80 transition-opacity duration-300"
                    style={{ color: "#948979" }}
                  >
                    Emergency
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold" style={{ color: "white" }}>
                Contact Us
              </h4>
              <div className="space-y-3">
                <p className="text-lg" style={{ color: "#948979" }}>
                  📍 123 Pet Street, City, State 12345
                </p>
                <p className="text-lg" style={{ color: "#948979" }}>
                  📞 (555) 123-4567
                </p>
                <p className="text-lg" style={{ color: "#948979" }}>
                  ✉️ info@petcareplus.com
                </p>
                <p className="text-lg" style={{ color: "#948979" }}>
                  🕒 Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM
                </p>
              </div>
            </div>
          </div>

          <div className="border-t mt-12 pt-8" style={{ borderColor: "#393E46" }}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-lg" style={{ color: "#948979" }}>
                © 2025 PetCare Plus. All rights reserved.
              </p>
              <div className="flex space-x-8 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-lg hover:opacity-80 transition-opacity duration-300"
                  style={{ color: "#948979" }}
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-lg hover:opacity-80 transition-opacity duration-300"
                  style={{ color: "#948979" }}
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PetVeterinaryHomepage
