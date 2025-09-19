// Client-side functions for template image management
// These functions call API routes instead of direct Supabase operations

// Upload image via API route
export const uploadTemplateImage = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload/template-image', {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Error uploading image:', result.error)
      return null
    }

    return result.imageUrl
  } catch (error) {
    console.error('Error in uploadTemplateImage:', error)
    return null
  }
}

// Delete image via API route
export const deleteTemplateImage = async (imageUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/upload/template-image?imageUrl=${encodeURIComponent(imageUrl)}`, {
      method: 'DELETE',
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Error deleting image:', result.error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in deleteTemplateImage:', error)
    return false
  }
}

// Validate image file
export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'File type not supported. Please use JPEG, PNG, or WebP format.'
    };
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size too large. Maximum size is 5MB.'
    };
  }

  return { isValid: true };
};

// Create image preview URL
export const createImagePreview = (file: File): string => {
  return URL.createObjectURL(file);
};

// Cleanup image preview URL
export const cleanupImagePreview = (previewUrl: string): void => {
  URL.revokeObjectURL(previewUrl);
};