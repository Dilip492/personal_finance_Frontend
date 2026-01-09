import { CircleX } from "lucide-react";
import { useState } from "react";

const Popup = ({ title, fields, onSubmit, onclose, buttonText = "Submit" }) => {
  const [formData, setFormData] = useState(
    fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.id]: field.defaultValue || "",
      }),
      {}
    )
  );

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // 🔹 Filter categories based on selected type (if provided in fields)
  const selectedType = formData.type;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[60vh] p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onclose}
        >
          <CircleX />
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {fields.map((field, index) => {
            let options = field.options;

            // If field is "category", filter based on selected type
            if (field.id === "category" && Array.isArray(field.options)) {
              options = field.options.filter(
                (cat) => !selectedType || cat.type === selectedType
              );
            }

            return (
              <div key={index}>
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>

                {field.type === "select" ? (
                  <select
                    id={field.id}
                    value={formData[field.id]}
                    onChange={handleChange}
                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select {field.label}</option>
                    {Array.isArray(options) &&
                      options.map((option, i) => (
                        <option
                          key={i}
                          value={typeof option === "string" ? option : option.name}
                        >
                          {typeof option === "string" ? option : option.name}
                        </option>
                      ))}
                  </select>
                ) : (
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.id]}
                    onChange={handleChange}
                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              </div>
            );
          })}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
