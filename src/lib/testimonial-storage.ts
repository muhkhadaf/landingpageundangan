// Client-side functions for testimonial image management
// These functions call API routes instead of direct Supabase operations

// Upload testimonial image via API route
export const uploadTestimonialImage = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload/testimonial-image', {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Error uploading testimonial image:', result.error)
      return null
    }

    return result.imageUrl
  } catch (error) {
    console.error('Error in uploadTestimonialImage:', error)
    return null
  }
}

// Delete testimonial image via API route
export const deleteTestimonialImage = async (imageUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/upload/testimonial-image?imageUrl=${encodeURIComponent(imageUrl)}`, {
      method: 'DELETE',
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Error deleting testimonial image:', result.error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in deleteTestimonialImage:', error)
    return false
  }
}

// Validate image file for testimonials
export const validateTestimonialImageFile = (file: File): { isValid: boolean; error?: string } => {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.'
    }
  }

  // Check file size (2MB max for testimonial photos)
  const maxSize = 2 * 1024 * 1024 // 2MB
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File too large. Maximum size is 2MB.'
    }
  }

  return { isValid: true }
}

// Create image preview URL
export const createImagePreview = (file: File): string => {
  return URL.createObjectURL(file)
}

// Cleanup image preview URL
export const cleanupImagePreview = (previewUrl: string): void => {
  URL.revokeObjectURL(previewUrl)
}