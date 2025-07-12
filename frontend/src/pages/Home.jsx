import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EventCard from "../components/EventCard";
import API_BASE_URL from "../config/api";
import {
  FaCalendarAlt,
  FaSearch,
  FaSpinner,
  FaFire,
  FaRocket,
  FaStar,
  FaFilter,
} from "react-icons/fa";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Events", icon: "🎉" },
    { value: "academic", label: "Academic", icon: "📚" },
    { value: "cultural", label: "Cultural", icon: "🎭" },
    { value: "sports", label: "Sports", icon: "⚽" },
    { value: "technical", label: "Technical", icon: "💻" },
    { value: "social", label: "Social", icon: "🤝" },
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/events`);

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="hero-gradient py-20 pattern-dots">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="p-3 bg-white/80 rounded-full shadow-lg">
                  <FaCalendarAlt className="text-primary text-3xl" />
                </div>
                <h1 className="text-6xl font-bold text-gray-900">
                  Event<span className="text-primary">Master</span>
                </h1>
                <div className="p-3 bg-white/80 rounded-full shadow-lg">
                  <FaRocket className="text-primary text-3xl" />
                </div>
              </div>
              <p className="text-xl text-gray-600 mb-8">
                Discover amazing college events, connect with your community,
                and create unforgettable memories
              </p>
            </div>
            <div className="flex items-center justify-center gap-6">
              <div className="glow-card px-6 py-3 flex items-center gap-2">
                <FaFire className="text-orange-500" />
                <span className="text-gray-700 font-medium">
                  {events.length} Active Events
                </span>
              </div>
              <div className="glow-card px-6 py-3 flex items-center gap-2">
                <FaStar className="text-primary" />
                <span className="text-gray-700 font-medium">
                  Premium Experience
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search & Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="floating-card p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-12"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="form-select pl-12 min-w-48"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.icon} {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Events Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="glass-card p-3">
              <FaCalendarAlt className="text-primary text-xl" />
            </div>
            <div>
              <h2 className="btn-minimal flex items-center gap-2">
                {filteredEvents.length > 0
                  ? "Upcoming Events"
                  : "No Events Found"}
              </h2>
              <p className="text-white text-sm font-bold">
                {filteredEvents.length} events found{" "}
                {filterCategory !== "all" &&
                  `in ${
                    categories.find((c) => c.value === filterCategory)?.label
                  }`}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="relative">
                <FaSpinner className="animate-spin text-6xl text-white mb-4" />
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl text-white font-bold">
                Loading amazing events...
              </span>
              <span className="text-white/70">
                Get ready for something awesome! 🎉
              </span>
            </div>
          ) : error ? (
            <div className="glass-effect border-2 border-red-300 p-8 rounded-3xl text-center">
              <div className="text-6xl mb-4">😓</div>
              <p className="text-white font-bold text-xl mb-2">
                Oops! Something went wrong
              </p>
              <p className="text-white/80 mb-6">{error}</p>
              <button onClick={fetchEvents} className="btn-energetic">
                Try Again 🔄
              </button>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">
                {searchTerm || filterCategory !== "all" ? "🔍" : "📅"}
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                {searchTerm || filterCategory !== "all"
                  ? "No matches found!"
                  : "No events yet!"}
              </h3>
              <p className="text-white/70 text-lg mb-6">
                {searchTerm || filterCategory !== "all"
                  ? "Try adjusting your search or filter settings"
                  : "Check back later for exciting upcoming events"}
              </p>
              {(searchTerm || filterCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterCategory("all");
                  }}
                  className="btn-energetic font-extrabold text-red-600 bg-zinc-100 rounded-md p-2"
                >
                  Clear Filters 🗂️
                </button>
              )}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredEvents.map((event, index) => (
                <EventCard
                  key={event._id || index}
                  event={event}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
