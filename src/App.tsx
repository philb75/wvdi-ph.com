import Navbar from './components/Navbar';
import CourseCard from './components/CourseCard';
import TestimonialCard from './components/TestimonialCard';
import ChatWidget from './components/ChatWidget';
import { 
  Car,
  Truck,
  GraduationCap,
  FileCheck,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="pt-20 bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Start Your Journey to Safe Driving
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Western Visayas Driving Institute: Your trusted partner in professional driving education since 1995.
              </p>
              <button className="bg-red-600 text-white px-8 py-3 rounded-md text-lg hover:bg-red-700 transition">
                Enroll Now
              </button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80" 
                alt="Driving instruction"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Courses</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <CourseCard
              Icon={Car}
              title="Theoretical Driving Course"
              description="Comprehensive classroom instruction covering traffic rules, road safety, and basic vehicle mechanics."
              duration="15 Hours"
              price="₱3,000"
            />
            <CourseCard
              Icon={GraduationCap}
              title="Practical Driving Course"
              description="Hands-on driving instruction with experienced instructors in dual-control vehicles."
              duration="8-24 Hours"
              price="From ₱5,000"
            />
            <CourseCard
              Icon={Truck}
              title="Professional Driver's Course"
              description="Advanced training for professional drivers including defensive driving techniques."
              duration="30 Hours"
              price="₱8,000"
            />
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section id="requirements" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Requirements</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Student Permit</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FileCheck className="h-5 w-5 text-red-600 mr-2" />
                  <span>Valid government-issued ID</span>
                </li>
                <li className="flex items-center">
                  <FileCheck className="h-5 w-5 text-red-600 mr-2" />
                  <span>Birth Certificate</span>
                </li>
                <li className="flex items-center">
                  <FileCheck className="h-5 w-5 text-red-600 mr-2" />
                  <span>Medical Certificate</span>
                </li>
                <li className="flex items-center">
                  <FileCheck className="h-5 w-5 text-red-600 mr-2" />
                  <span>2x2 ID Picture</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Non-Professional License</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FileCheck className="h-5 w-5 text-red-600 mr-2" />
                  <span>Student Permit (at least 1 month old)</span>
                </li>
                <li className="flex items-center">
                  <FileCheck className="h-5 w-5 text-red-600 mr-2" />
                  <span>Theoretical Driving Course Certificate</span>
                </li>
                <li className="flex items-center">
                  <FileCheck className="h-5 w-5 text-red-600 mr-2" />
                  <span>Practical Driving Course Certificate</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Juan Dela Cruz"
              role="Student Driver"
              content="The instructors at WVDI are very professional and patient. They made learning to drive an enjoyable experience."
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
            />
            <TestimonialCard
              name="Maria Santos"
              role="Professional Driver"
              content="Thanks to WVDI's professional course, I was able to secure a job as a company driver. Best investment ever!"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
            />
            <TestimonialCard
              name="Pedro Reyes"
              role="Business Owner"
              content="The theoretical classes were very informative and helped me understand traffic rules better."
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-red-600 mr-4" />
                <p>123 Lacson Street, Bacolod City, Philippines</p>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-red-600 mr-4" />
                <p>+63 34 123 4567</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-red-600 mr-4" />
                <p>info@wvdi-ph.com</p>
              </div>
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-red-600 mr-4" />
                <p>Monday - Saturday: 8:00 AM - 5:00 PM</p>
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">WVDI</h3>
              <p className="text-gray-400">Your trusted partner in professional driving education since 1995.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#courses" className="text-gray-400 hover:text-white">Courses</a></li>
                <li><a href="#requirements" className="text-gray-400 hover:text-white">Requirements</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Western Visayas Driving Institute. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}

export default App;
