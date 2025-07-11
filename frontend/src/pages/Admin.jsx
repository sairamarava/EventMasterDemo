import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";
import {
  FaCalendarAlt,
  FaPlus,
  FaList,
  FaRocket,
  FaStar,
  FaCrown,
  FaFire,
  FaEdit,
  FaTrash,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

export default function Admin() {
  const { isAuthenticated } = useAuth();
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("add");
  const [loading, setLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/events");
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventAdded = (newEvent) => {
    setEvents([newEvent, ...events]);
    setActiveTab("manage");
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setActiveTab("add");
  };

  const handleDeleteEvent = (event) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;

    setDeleteLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${eventToDelete._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setEvents(events.filter((event) => event._id !== eventToDelete._id));
        setShowDeleteModal(false);
        setEventToDelete(null);
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEventUpdated = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      )
    );
    setEditingEvent(null);
    setActiveTab("manage");
  };

  return (
    <div className="min-h-screen bg-gray-50 pattern-grid">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="hero-gradient p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-3 bg-white/80 rounded-full shadow-lg">
                <FaCrown className="text-primary text-4xl" />
              </div>
              <h1 className="text-5xl font-bold font-display text-gray-800">
                Admin <span className="text-primary">Dashboard</span>
              </h1>
              <FaStar className="text-primary text-3xl" />
            </div>
            <p className="text-xl text-gray-600 mb-6">
              Create & Manage Amazing College Events
            </p>
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <FaFire className="text-orange-500" />
                <span className="text-gray-700 font-medium">
                  {events.length} Events Created
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaRocket className="text-blue-500" />
                <span className="text-gray-700 font-medium">
                  Admin Powers Activated
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="glow-card p-2 inline-flex mx-auto w-fit">
            <button
              onClick={() => setActiveTab("add")}
              className={`px-8 py-4 rounded-lg font-medium transition-all duration-300 flex items-center gap-3 ${
                activeTab === "add"
                  ? "bg-primary text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FaPlus className="text-lg" />
              Create Event
            </button>
            <button
              onClick={() => setActiveTab("manage")}
              className={`px-8 py-4 rounded-lg font-medium transition-all duration-300 flex items-center gap-3 ${
                activeTab === "manage"
                  ? "bg-primary text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FaList className="text-lg" />
              Manage Events ({events.length})
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === "add" ? (
            <EventForm onEventAdded={handleEventAdded} />
          ) : (
            <div className="space-y-8">
              <div className="glow-card p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-white/80 rounded-full shadow-lg">
                    <FaCalendarAlt className="text-primary text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold font-display text-gray-800">
                      Event Management
                    </h2>
                    <p className="text-gray-600">
                      Monitor and control your events
                    </p>
                  </div>
                </div>

                {loading ? (
                  <div className="flex flex-col justify-center items-center py-20">
                    <div className="relative mb-4">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-primary"></div>
                      <FaRocket className="absolute inset-0 m-auto text-2xl text-primary" />
                    </div>
                    <span className="text-xl text-gray-700 font-medium">
                      Loading your events...
                    </span>
                  </div>
                ) : events.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="text-8xl mb-6">🎪</div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">
                      Ready to Create Magic?
                    </h3>
                    <p className="text-gray-600 mb-8 text-lg">
                      Your event empire starts with the first amazing event!
                    </p>
                    <button
                      onClick={() => setActiveTab("add")}
                      className="btn-minimal text-lg px-8 py-4"
                    >
                      <FaRocket className="mr-2" />
                      Create First Event
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                      <div key={event._id || index} className="relative group">
                        <EventCard event={event} index={index} />
                        {/* Admin Badge */}
                        <div className="absolute -top-2 -right-2 z-20">
                          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg flex items-center gap-1">
                            <FaCrown className="text-xs" />
                            PUBLISHED
                          </div>
                        </div>
                        {/* Admin Actions */}
                        <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleEditEvent(event)}
                            className="bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                          >
                            <FaEdit />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                          >
                            <FaTrash />
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="modal-card w-96 max-w-md mx-4 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-100 rounded-full">
                <FaTrash className="text-red-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Delete Event
                </h3>
                <p className="text-gray-600 text-sm">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete "
              <span className="font-medium">{eventToDelete?.title}</span>"?
            </p>

            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                disabled={deleteLoading}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
                {deleteLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <FaCheck />
                    Delete
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setEventToDelete(null);
                }}
                disabled={deleteLoading}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaTimes />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
