import React from 'react';
import { 
  Home, 
  Target, 
  Award, 
  Users, 
  Zap, 
  Shield,
  ArrowLeft 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: "Precision Pricing",
      description: "Our AI-powered algorithms analyze complex market data to provide the most accurate property price predictions."
    },
    {
      icon: Zap,
      title: "Instant Insights",
      description: "Get real-time market trends, valuation reports, and comprehensive property analysis at your fingertips."
    },
    {
      icon: Shield,
      title: "Trusted Reliability",
      description: "We leverage advanced machine learning models and extensive property databases to ensure maximum accuracy."
    }
  ];

  const teamMembers = [
    {
      name: "Rohan Sharma",
      role: "Founder & CEO",
      description: "Real estate veteran with 15 years of market experience"
    },
    {
      name: "Priya Patel",
      role: "Chief Technology Officer",
      description: "Expert in AI and machine learning with a passion for real estate tech"
    },
    {
      name: "Amit Desai",
      role: "Head of Data Science",
      description: "PhD in predictive analytics with focus on property market trends"
    }
  ];

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-secondary text-text min-h-screen">
      {/* Back Button
      <div className="absolute top-4 left-4">
        <button 
          onClick={handleGoBack}
          className="flex items-center text-primary hover:text-highlight transition-colors p-2 rounded-full"
        >
          <ArrowLeft size={24} className="mr-2" />
          <span className="font-medium">Back</span>
        </button>
      </div> */}
      <Navbar/>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6  my-10">
            <Home className="text-primary" size={48} />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-text ">
            Welcome to Estate Vista
          </h1>
          <p className="text-xl text-highlight opacity-80 leading-relaxed">
            Revolutionizing real estate intelligence with cutting-edge AI-powered price prediction and market insights.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 bg-[#2A2A2A]">
        <h2 className="text-3xl font-bold text-center mb-12 text-text">
          Our Key Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <div 
                key={index} 
                className="bg-secondary p-6 rounded-xl text-center hover:scale-105 transition-transform"
              >
                <div className="flex justify-center mb-4">
                  <FeatureIcon className="text-primary" size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-text">
                  {feature.title}
                </h3>
                <p className="text-highlight opacity-70">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-text">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-[#2A2A2A] p-6 rounded-xl text-center hover:scale-105 transition-transform"
            >
              <div className="w-32 h-32 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center text-3xl font-bold text-secondary">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-text">
                {member.name}
              </h3>
              <p className="text-primary mb-2">{member.role}</p>
              <p className="text-highlight opacity-70">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-[#2A2A2A] py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Users className="mx-auto text-primary mb-6" size={48} />
          <h2 className="text-3xl font-bold mb-6 text-text">
            Our Mission
          </h2>
          <p className="text-xl text-highlight leading-relaxed">
            To empower real estate professionals and investors with advanced AI-driven insights, 
            transforming how property valuation and market analysis are conducted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;