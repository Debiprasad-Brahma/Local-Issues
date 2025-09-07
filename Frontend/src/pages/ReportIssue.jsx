import React, {useState} from "react"
import {categories, priorityLevels, initialFormData} from "../components/data/formData"
import {useFormValidation} from "../hooks/useFormValidation"
import {useImageUpload} from "../hooks/useImageUpload"
import {motion} from "framer-motion"

import FormHeader from "../components/reportIssueForm/FormHeader"
import CategorySelection from "../components/reportIssueForm/CategorySelection"
import PrioritySelection from "../components/reportIssueForm/PrioritySelection"
import DescriptionInput from "../components/reportIssueForm/DescriptionInput"
import LocationInput from "../components/reportIssueForm/LocationInput"
import ImageUpload from "../components/reportIssueForm/ImageUpload"
import ImagePreviewModal from "../components/reportIssueForm/ImagePreviewModal"
import SuccessMessage from "../components/reportIssueForm/SuccessMessage"
import SubmitButton from "../components/reportIssueForm/SubmitButton"

const ReportIssue = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)

  const {errors, validateForm, clearError} = useFormValidation()
  const {images, handleImageUpload, removeImage, clearImages, setImages} = useImageUpload()

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({...prev, [field]: value}))
    clearError(field)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formDataWithImages = {...formData, images}

    if (!validateForm(formDataWithImages)) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSubmitSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setFormData(initialFormData)
        clearImages()
        setSubmitSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return <SuccessMessage />
  }

  return (
    <motion.div
      initial={{opacity: 0.2, y: 100}}
      transition={{duration: 1}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <FormHeader />

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Issue Details</h2>
            </div>

            <div className="p-6 space-y-6">
              <CategorySelection
                categories={categories}
                selectedCategory={formData.category}
                onCategoryChange={(value) => handleInputChange("category", value)}
                error={errors.category}
              />

              <PrioritySelection
                priorityLevels={priorityLevels}
                selectedPriority={formData.priority}
                onPriorityChange={(value) => handleInputChange("priority", value)}
                error={errors.priority}
              />

              <DescriptionInput
                value={formData.description}
                onChange={(value) => handleInputChange("description", value)}
                error={errors.description}
              />

              <LocationInput
                value={formData.location}
                onChange={(value) => handleInputChange("location", value)}
                error={errors.location}
              />

              <ImageUpload
                images={images}
                onImageUpload={handleImageUpload}
                onImageRemove={removeImage}
                onImagePreview={setPreviewImage}
              />
            </div>
          </div>

          <SubmitButton isSubmitting={isSubmitting} />
        </form>

        <ImagePreviewModal
          image={previewImage}
          onClose={() => setPreviewImage(null)}
        />
      </div>
    </motion.div>
  )
}

export default ReportIssue
