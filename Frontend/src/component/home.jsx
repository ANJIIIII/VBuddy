import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Stethoscope,
  Scissors,
  GraduationCap,
  Gamepad2,
  Home as HomeIcon,
  Ambulance,
  Facebook,
  Instagram,
  Twitter,
  CalendarCheck,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  Star,
  Quote
} from 'lucide-react';

const PetVeterinaryHomepage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const scrollToFooter = () => {
    document.getElementById('contact-footer')?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    {
      title: "Veterinary Care",
      description: "Complete health checkups, vaccination, and surgical care by expert vets.",
      icon: Stethoscope,
    },
    {
      title: "Pet Grooming",
      description: "Spa-like grooming services to keep your furry friends looking fabulous.",
      icon: Scissors,
    },
    {
      title: "Pet Training",
      description: "Professional behavioral training to ensure a happy, disciplined pet.",
      icon: GraduationCap,
    },
    {
      title: "Day Care & Play",
      description: "Safe, fun, and interactive day boarding for improved socialization.",
      icon: Gamepad2,
    },
  ];

  const galleryImages = [
    "/images/p1.jpg",
    "/images/p2.jpg",
    "/images/p3.jpg",
    "/images/p4.jpg"
  ];

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-secondary-900 selection:bg-primary-500 selection:text-white">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-secondary-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/30 transform hover:scale-105 transition-transform">🐾</div>
            <span className="text-2xl font-bold text-secondary-900 tracking-tight">PetCure</span>
          </div>

          <div className="flex gap-4 items-center">
            <button onClick={scrollToFooter} className="font-medium text-secondary-600 hover:text-primary-600 transition-colors mr-4">Contact Us</button>
            {!isAuthenticated ? (
              <>
                <button onClick={() => navigate('/login')} className="hidden sm:block font-semibold text-secondary-700 hover:text-primary-600 transition-colors">Login</button>
                <button onClick={() => navigate('/signup')} className="px-6 py-2.5 bg-secondary-900 text-white rounded-full font-semibold hover:bg-primary-500 transition-all shadow-lg hover:shadow-primary-500/30 transform hover:-translate-y-0.5">
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2.5 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/30 flex items-center gap-2"
              >
                <HomeIcon size={18} /> Dashboard
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-0 lg:pt-36 lg:pb-0 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-secondary-50 skew-x-12 translate-x-32 z-0"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">

              <h1 className="text-5xl md:text-7xl font-extrabold text-secondary-900 leading-[1.1] tracking-tight">
                Compassionate Care for Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-green-400">
                  Best Friend
                </span>
              </h1>
              <p className="text-xl text-secondary-600 leading-relaxed max-w-lg">
                We treat your pets like family. Experienced veterinarians, state-of-the-art facilities, and a love for animals that goes beyond medicine.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => isAuthenticated ? navigate('/dashboard') : navigate('/login')}
                  className="px-8 py-4 bg-secondary-900 text-white rounded-2xl font-bold shadow-xl shadow-secondary-900/20 hover:bg-primary-500 hover:shadow-primary-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <CalendarCheck className="w-5 h-5" />
                  Appointment
                </button>
                <div className="flex items-center gap-4 px-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-gray-200 bg-cover bg-center`} style={{ backgroundImage: `url(/images/p${i}.jpg)` }}></div>
                    ))}
                  </div>
                  <div className="text-sm font-medium text-secondary-600">
                    <span className="font-bold text-secondary-900">2k+</span> Happy Pets
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Composition */}

            <div className="relative lg:h-auto flex items-center justify-center animate-in fade-in zoom-in duration-700 delay-100">
              <img
                src="/images/2.png"
                alt="Happy Dog"
                className="w-full lg:w-[140%] max-w-none h-auto object-contain z-10 lg:-translate-y-10 hover:scale-105 transition-transform duration-500"
              />
              {/* Floating Badge */}
              {/* <div className="absolute bottom-10 left-0 lg:-left-4 bg-white p-4 rounded-2xl shadow-xl border border-secondary-100 flex items-center gap-4 animate-bounce hover:animate-none z-20">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                  <Ambulance size={24} />
                </div>
                <div>
                  <p className="font-bold text-secondary-900">24/7 Support</p>
                  <p className="text-xs text-secondary-500">Emergency Care</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-secondary-900 mb-4">World-Class Services</h2>
            <div className="w-24 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-xl text-secondary-600 max-w-2xl mx-auto">Comprehensive care designed to keep your pet happy at every stage of life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group p-8 rounded-[2rem] bg-secondary-50 border border-secondary-100 hover:bg-secondary-900 hover:text-white transition-all duration-300 hover:shadow-2xl hover:shadow-secondary-900/20 cursor-default">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6 text-primary-600 shadow-md group-hover:bg-white/10 group-hover:text-white transition-colors">
                  <service.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-secondary-600 group-hover:text-secondary-300 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Split Section */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-secondary-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="relative rounded-3xl overflow-hidden aspect-square border-4 border-white/10 shadow-lg">
                <img src="/images/rottweiler-woman-studio-studio.jpg" alt="Vet with dog" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
              </div>

              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">Expert Care from People Who Care</h2>
                <p className="text-lg text-secondary-200 leading-relaxed">
                  Our team of certified professionals combines medical expertise with genuine compassion. We take the time to know you and your pet, creating a personalized care plan that works.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <h4 className="text-3xl font-bold text-primary-400">15+</h4>
                    <p className="text-sm text-secondary-300 mt-1">Years Experience</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <h4 className="text-3xl font-bold text-primary-400">10k+</h4>
                    <p className="text-sm text-secondary-300 mt-1">Surgeries Done</p>
                  </div>
                </div>

                <button onClick={() => navigate('/aboutus')} className="px-8 py-3 bg-white text-secondary-900 rounded-xl font-bold hover:bg-primary-500 hover:text-white transition-all flex items-center gap-2">
                  Meet the Team <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900">Happy Patients</h2>
              <p className="mt-2 text-secondary-600">See who visited us recently!</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.map((src, idx) => (
              <div key={idx} className={`rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${idx % 2 === 0 ? 'mt-8' : ''}`}>
                <img src={src} alt="Pet Gallery" className="w-full h-64 md:h-80 object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block p-4 rounded-full bg-primary-100 text-primary-600 mb-6">
            <PhoneCall size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">Need Immediate Assistance?</h2>
          <p className="text-xl text-secondary-500 mb-10 max-w-2xl mx-auto">
            Our emergency team is available 24/7 to help your pet in critical situations. Don't hesitate to call.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-5 bg-red-500 text-white rounded-2xl font-bold text-lg hover:bg-red-600 transition-colors shadow-xl shadow-red-500/20 animate-pulse">
              Emergency: (555) 911-PETS
            </button>
            <button
              onClick={() => isAuthenticated ? navigate('/dashboard') : navigate('/login')}
              className="px-10 py-5 bg-secondary-900 text-white rounded-2xl font-bold text-lg hover:bg-secondary-800 transition-all shadow-xl"
            >
              Book Regular Visit
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact-footer" className="bg-secondary-900 text-white pt-20 pb-10 px-6 border-t border-secondary-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1 space-y-6">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <span className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-secondary-900 shadow-lg">🐾</span>
                PetCure
              </div>
              <p className="text-secondary-300 leading-relaxed text-sm">
                Providing top-tier veterinary services with a heart. Because your pet deserves the best.
              </p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-secondary-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all text-white border border-secondary-700">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: "Services", links: ["Veterinary Care", "Pet Grooming", "Day Care", "Training", "Boarding"] },
              { title: "Company", links: ["About Us", "Careers", "Contact & Location", "Privacy Policy"] },
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-lg mb-6 text-primary-400">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-secondary-300 hover:text-white hover:translate-x-1 transition-all block text-sm">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="font-bold text-lg mb-6 text-primary-400">Visit Us</h4>
              <ul className="space-y-4 text-sm text-secondary-300">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-secondary-800 flex items-center justify-center flex-shrink-0 text-primary-400">📍</div>
                  <span>123 Pet Street, Green Valley,<br />California, 90210</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-secondary-800 flex items-center justify-center flex-shrink-0 text-primary-400">✉️</div>
                  <span>hello@petcure.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-secondary-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-secondary-400">
            <p>© 2025 PetCure Plus. All rights reserved.</p>
            <div className="flex gap-8">
              <span>Terms</span>
              <span>Privacy</span>
              <span>Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PetVeterinaryHomepage;
