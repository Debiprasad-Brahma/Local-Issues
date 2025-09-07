import {useState} from "react"

export const useFormValidation = () => {
  const [errors, setErrors] = useState({})

  const validateForm = (formData) => {
    const newErrors = {}

    if (!formData.category) newErrors.category = "Please select a category"
    if (!formData.priority) newErrors.priority = "Please select a priority level"
    if (!formData.description.trim()) newErrors.description = "Please provide a description"
    if (formData.description.trim().length < 10)
      newErrors.description = "Description must be at least 10 characters"
    if (!formData.location.trim()) newErrors.location = "Please provide a location"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => ({...prev, [field]: ""}))
    }
  }

  const clearAllErrors = () => {
    setErrors({})
  }

  return {
    errors,
    validateForm,
    clearError,
    clearAllErrors,
  }
}
