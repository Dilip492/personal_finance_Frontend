

// import main from '../images/main.png'
// import { useNavigate } from 'react-router-dom'

// const MainScreen = () => {
//     const navigate = useNavigate();

//     return (
//         <div>
//             <nav className="flex items-center justify-between px-6 py-4  shadow-sm">
//                 <div className="flex items-center ">
//                     <img
//                         src={logo}
//                         alt="Logo"
//                         className="h-5 cursor-pointer"
//                         onClick={() => navigate("/")}
//                     />
//                 </div>

//                 <ul className="hidden md:flex space-x-8">
//                     <li><a href="#" className="hover:text-gray-400">Home</a></li>
//                     <li><a href="#" className="hover:text-gray-400">About</a></li>
//                     <li><a href="#" className="hover:text-gray-400">Contact</a></li>
//                 </ul>

//                 <button
//                     className="hidden md:block px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
//                     onClick={() => navigate("/login")}
//                 >
//                     Sign Up
//                 </button>

                
//             </nav>


//             <div className="flex flex-col md:flex-row items-center justify-between w-[80%] max-w-[1200px] mx-auto mt-4 bg-white/10 p-12 rounded-xl">
//                 <div className="w-full md:w-1/2 text-left animate-fade-in-left">
//                     <h1 className="text-[4rem] md:text-[3.6rem] font-bold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-[#ffd903] to-[#ffef96] animate-text-animation">
//                         Grow like
//                     </h1>
//                     <h1 className="text-[4rem] md:text-[3.6rem] font-bold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-[#ffd903] to-[#ffef96] animate-text-animation">
//                         A Pro
//                     </h1>
//                     <p className="mt-5 text-[1.2rem] text-[#5e5e5e] leading-relaxed animate-fade-in-up">
//                         Master the art of finance management and take control of your future.
//                         Learn how to budget, save, and invest with expert guidance. Our platform provides all the tools
//                         and resources you need to achieve financial success.
//                     </p>
//                     <button className="mt-8 px-10 py-4 text-[1.2rem] text-white bg-blue-600 rounded-lg shadow-lg transition-transform transform hover:bg-blue-400 hover:-translate-y-1 hover:shadow-xl">
//                         Get Started
//                     </button>
//                 </div>
//                 <div className="w-full md:w-1/2 animate-fade-in-right">
//                     <img src={main} alt="img" className="w-full h-auto rounded-lg md:ml-15 mt-4 md:mt-0" />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default MainScreen



import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from '../images/logo.png'

import gsap from 'gsap';
import { 
  TrendingUp, 
  PiggyBank, 
  LineChart, 
  Target,
  CheckCircle2,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  ChevronRight,
  Shield,
  BarChart3,
  Wallet
} from 'lucide-react';

function App() {
  const navigate = useNavigate();
  
  // Refs for animations
  const heroRef = useRef(null);
  const featureCardsRef = useRef([]);
  const benefitCardsRef = useRef([]);
  const container = useRef();

  // Function to properly set refs for multiple elements
  const setFeatureCardRef = (el, index) => {
    featureCardsRef.current[index] = el;
  };

  const setBenefitCardRef = (el, index) => {
    benefitCardsRef.current[index] = el;
  };

  useGSAP(() => {
    // Hero section animation
    gsap.from(".hero-badge", { 
      y: -50, 
      opacity: 0, 
      duration: 1 
    });
    
    gsap.from(".hero-title", { 
      y: 100, 
      opacity: 0, 
      duration: 1,
      delay: 0.5
    });
    
    gsap.from(".hero-quote", { 
      y: 50, 
      opacity: 0, 
      duration: 0.8,
      delay: 0.7
    });
    
    gsap.from(".hero-buttons", { 
      y: 30, 
      opacity: 0, 
      duration: 0.8,
      delay: 0.9
    });

    // Feature cards stagger animation
    gsap.from(featureCardsRef.current, {
      scrollTrigger: {
        trigger: ".feature-cards",
        start: "top center+=100",
        toggleActions: "play none none reverse"
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });

    // Benefits section animation
    gsap.from(benefitCardsRef.current, {
      scrollTrigger: {
        trigger: "#features",
        start: "top center+=100",
        toggleActions: "play none none reverse"
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });

    // Pricing section animation
    gsap.from(".pricing-card", {
      scrollTrigger: {
        trigger: "#pricing",
        start: "top center+=100",
        toggleActions: "play none none reverse"
      },
      y: 100,   
      opacity: 0,
      duration: 1
    });
  }, { scope: container });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" ref={container}>
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
            <img
                        src={logo}
                        alt="Logo"
                        className="h-5 cursor-pointer"
                        onClick={() => navigate("/")}
                    />  
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a href="#home" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
                <button 
                  onClick={() => navigate('/login')}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 hover:shadow-lg"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(147,197,253,0.3),transparent)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-block hero-badge">
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-green-200 text-green-800 mb-8 inline-flex items-center">
              <span className="animate-pulse mr-2">●</span> New: Smart Budget Analytics
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight hero-title">
            Master Your Money,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 text-transparent bg-clip-text">
              Shape Your Future
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto italic hero-quote">
            "The art of money management is not in the spending, but in the wisdom of keeping."
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16 hero-buttons">
            <button 
              onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 hover:shadow-lg flex items-center group"
            >
              Start Free Trial
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white text-gray-700 rounded-lg border-2 border-gray-200 hover:border-blue-600 transition-all flex items-center">
              Watch Demo
              <BarChart3 className="ml-2 h-5 w-5" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 feature-cards">
            {[
              {
                icon: <PiggyBank className="h-8 w-8 text-blue-600"  />,
                title: "Smart Savings",
                description: "Automated savings rules that adapt to your spending patterns"
              },
              {
                icon: <LineChart className="h-8 w-8 text-blue-600" />,
                title: "Clear Insights",
                description: "Visual analytics that make your finances easy to understand"
              },
              {
                icon: <Target className="h-8 w-8 text-blue-600" />,
                title: "Goal Tracking",
                description: "Set and achieve your financial goals with smart milestones"
              }
            ].map((feature, index) => (
              <div
                key={index}
                ref={el => setFeatureCardRef(el, index)}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
              >
                <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features"  ref={featureCardsRef} className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.1))] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FinancePro?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Experience the future of personal finance management with our powerful features</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8 text-blue-600" />,
                title: "Bank-Grade Security",
                description: "Your financial data is protected with military-grade encryption and security protocols."
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
                title: "Smart Analytics",
                description: "Get AI-powered insights and recommendations based on your spending patterns."
              },
              {
                icon: <Wallet className="h-8 w-8 text-blue-600" />,
                title: "Budget Mastery",
                description: "Create and manage custom budgets that adapt to your lifestyle and goals."
              }
            ].map((benefit, index) => (
              <div
                key={index}
                ref={el => setBenefitCardRef(el, index)}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}

      <section id="pricing" ref={benefitCardsRef} className="py-20 bg-[radial-gradient(circle_at_30%_50%,rgba(147,197,253,0.3),transparent)] ">
        <div className="max-w-7xl mx-auto px-4  ">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Financial Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Begin your path to financial freedom with our powerful free plan</p>
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 pricing-card">
            <div className="p-8">
              <div className="bg-blue-50 rounded-lg p-4 mb-8">
                <h3 className="text-2xl font-bold text-center mb-2">Free Forever Plan</h3>
                <p className="text-center text-gray-600">Everything you need to start managing your finances</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span>Unlimited expense tracking with smart categorization</span>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span>Detailed analytics and monthly reports</span>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span>Custom goal setting with progress tracking</span>
                </div>
              </div>
              <button 
                onClick={() => navigate('/signup')}
                className="w-full mt-8 px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center group"
              >
                Get Started Free 
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">No credit card required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-200/20 rounded-lg transform rotate-45"></div>
                  <TrendingUp className="h-8 w-8 text-green-500 relative z-10" />
                </div>
                <span className="ml-3 text-xl font-bold">FinancePro</span>
              </div>
              <p className="text-gray-400 leading-relaxed">Empowering your financial future through intelligent money management and data-driven insights.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6">Resources</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} FinancePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;