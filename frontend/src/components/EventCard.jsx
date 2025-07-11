import { motion } from "framer-motion";
import { FaCalendarAlt, FaStar, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

export default function EventCard({ event, index }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      academic: "bg-blue-100 text-blue-800",
      cultural: "bg-purple-100 text-purple-800",
      sports: "bg-green-100 text-green-800",
      technical: "bg-indigo-100 text-indigo-800",
      social: "bg-orange-100 text-orange-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: { text: "Upcoming", color: "badge-upcoming" },
      ongoing: { text: "Live", color: "badge-ongoing" },
      completed: { text: "Completed", color: "badge-completed" },
    };
    return badges[status] || badges.upcoming;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

  const imageUrl = event.image
    ? `http://localhost:5000/api/events/${event._id}/image`
    : null;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      className="glow-card group"
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className={`badge-status ${getStatusBadge(event.status).color}`}>
          {getStatusBadge(event.status).text}
        </div>
      </div>

      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gray-100 rounded-lg">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}

        {/* Fallback background */}
        <div
          className="w-full h-full bg-gray-100 flex items-center justify-center"
          style={{ display: imageUrl ? "none" : "flex" }}
        >
          <div className="text-gray-400 text-center">
            <FaCalendarAlt className="text-3xl mb-2 mx-auto" />
            <div className="text-sm font-medium">Event Image</div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Category and Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className={`badge-minimal ${getCategoryColor(event.category)}`}>
            {event.category || "Event"}
          </div>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400 text-sm" />
            <span className="text-sm font-medium text-gray-600">4.8</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <FaCalendarAlt className="mr-3 text-primary w-4 h-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FaMapMarkerAlt className="mr-3 text-primary w-4 h-4" />
            <span>College Campus</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FaUsers className="mr-3 text-primary w-4 h-4" />
            <span>Open Registration</span>
          </div>
        </div>

        {/* Register Button */}
        <button className="btn-minimal w-full">Register Now</button>
      </div>
    </motion.div>
  );
}
