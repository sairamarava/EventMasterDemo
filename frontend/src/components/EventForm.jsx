import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarPlus,
  FaCheck,
  FaTimes,
  FaUpload,
  FaStar,
  FaEdit,
} from "react-icons/fa";

export default function EventForm({
  onEventAdded,
  editingEvent,
  onEventUpdated,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "academic",
    status: "upcoming",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load editing event data
  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title || "",
        description: editingEvent.description || "",
        date: editingEvent.date
          ? new Date(editingEvent.date).toISOString().split("T")[0]
          : "",
        category: editingEvent.category || "academic",
        status: editingEvent.status || "upcoming",
      });

      // Set image preview if event has an image
      if (editingEvent.image) {
        setImagePreview(
          `http://localhost:5000/api/events/${editingEvent._id}/image`
        );
      } else {
        setImagePreview(null);
      }

      setSelectedFile(null);
      setErrors({});
    } else {
      // Reset form for new event
      setFormData({
        title: "",
        description: "",
        date: "",
        category: "academic",
        status: "upcoming",
      });
      setSelectedFile(null);
      setImagePreview(null);
      setErrors({});
    }
  }, [editingEvent]);

  const categories = [
    {
      value: "academic",
      label: "Academic",
      icon: "📚",
      color: "from-blue-500 to-purple-600",
    },
    {
      value: "cultural",
      label: "Cultural",
      icon: "🎭",
      color: "from-pink-500 to-rose-600",
    },
    {
      value: "sports",
      label: "Sports",
      icon: "⚽",
      color: "from-green-500 to-emerald-600",
    },
    {
      value: "technical",
      label: "Technical",
      icon: "💻",
      color: "from-indigo-500 to-blue-600",
    },
    {
      value: "social",
      label: "Social",
      icon: "🤝",
      color: "from-orange-500 to-red-600",
    },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Event title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Event description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters long";
    }

    if (!formData.date) {
      newErrors.date = "Event date is required";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = "Event date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          image: "Please select a valid image file (JPG, JPEG, PNG)",
        });
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: "File size must be less than 5MB" });
        return;
      }

      setSelectedFile(file);
      setErrors({ ...errors, image: "" });

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("status", formData.status);

      if (selectedFile) {
        formDataToSend.append("image", selectedFile);
      }

      const url = editingEvent
        ? `http://localhost:5000/api/events/${editingEvent._id}`
        : "http://localhost:5000/api/events";

      const method = editingEvent ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        body: formDataToSend,
      });

      if (response.ok) {
        const eventData = await response.json();

        if (editingEvent) {
          // Call update callback
          if (onEventUpdated) {
            onEventUpdated(eventData);
          }
        } else {
          // Call create callback
          if (onEventAdded) {
            onEventAdded(eventData);
          }

          // Reset form only if creating new event
          setFormData({
            title: "",
            description: "",
            date: "",
            category: "academic",
            status: "upcoming",
          });
          setSelectedFile(null);
          setImagePreview(null);
          setErrors({});
        }
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearForm = () => {
    if (editingEvent && onCancelEdit) {
      onCancelEdit();
    } else {
      setFormData({
        title: "",
        description: "",
        date: "",
        category: "academic",
        status: "upcoming",
      });
      setSelectedFile(null);
      setImagePreview(null);
      setErrors({});
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glow-card max-w-4xl mx-auto p-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gray-100 rounded-full">
          {editingEvent ? (
            <FaEdit className="text-primary text-2xl" />
          ) : (
            <FaCalendarPlus className="text-primary text-2xl" />
          )}
        </div>
        <div>
          <h2 className="text-3xl font-bold font-display text-gray-800">
            {editingEvent ? "Edit Event" : "Create Amazing Event"}
          </h2>
          <p className="text-gray-600">
            {editingEvent
              ? "Update your event details"
              : "Design an unforgettable experience for your audience"}
          </p>
        </div>
        <FaStar className="text-primary text-2xl ml-auto" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className={`form-input ${
              errors.title ? "border-red-500 bg-red-50" : ""
            }`}
            placeholder="Enter an exciting event title..."
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="text-red-500 text-sm font-medium flex items-center gap-1">
              <FaTimes className="text-xs" />
              {errors.title}
            </p>
          )}
        </div>

        {/* Category Selection */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Category
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.value}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, category: category.value })
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                  formData.category === category.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-200 bg-white hover:border-primary/50"
                }`}
                disabled={isSubmitting}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-sm font-medium">{category.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            className={`form-textarea ${
              errors.description ? "border-red-500 bg-red-50" : ""
            }`}
            placeholder="Describe your amazing event in detail..."
            disabled={isSubmitting}
          />
          {errors.description && (
            <p className="text-red-500 text-sm font-medium flex items-center gap-1">
              <FaTimes className="text-xs" />
              {errors.description}
            </p>
          )}
        </div>

        {/* Date Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className={`form-input ${
              errors.date ? "border-red-500 bg-red-50" : ""
            }`}
            disabled={isSubmitting}
          />
          {errors.date && (
            <p className="text-red-500 text-sm font-medium flex items-center gap-1">
              <FaTimes className="text-xs" />
              {errors.date}
            </p>
          )}
        </div>

        {/* Status Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Status
          </label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="form-select"
            disabled={isSubmitting}
          >
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Image
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
              disabled={isSubmitting}
            />
            <label
              htmlFor="image-upload"
              className="w-full flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary/50 transition-all duration-300 cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <FaUpload className="text-4xl text-gray-400 mb-4" />
              <p className="text-gray-600 font-medium mb-2">
                {selectedFile
                  ? selectedFile.name
                  : "Click to upload event image"}
              </p>
              <p className="text-sm text-gray-500">
                Support: JPG, PNG, JPEG (Max 5MB)
              </p>
            </label>
          </div>

          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Event preview"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          {errors.image && (
            <p className="text-red-500 text-sm font-medium flex items-center gap-1">
              <FaTimes className="text-xs" />
              {errors.image}
            </p>
          )}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 font-medium">{errors.submit}</p>
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-primary hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                {editingEvent ? "Updating..." : "Creating Magic..."}
              </>
            ) : (
              <>
                <FaCheck />
                {editingEvent ? "Update Event" : "Create Event 🚀"}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleClearForm}
            className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-300"
            disabled={isSubmitting}
          >
            {editingEvent ? "Cancel Edit" : "Clear Form"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
