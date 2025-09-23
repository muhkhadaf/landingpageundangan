// Blog Storage Utilities
// Menggunakan bucket template-images untuk menyimpan foto blog

export interface BlogImageValidation {
  isValid: boolean;
  error?: string;
}

export interface BlogPost {
  id?: number;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  is_published: boolean;
  author?: string;
  created_at?: string;
  updated_at?: string;
}

// Validate blog image file
export function validateBlogImageFile(file: File): BlogImageValidation {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file type. Only JPG, PNG, and WebP are allowed.'
    };
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File too large. Maximum size is 5MB.'
    };
  }

  return { isValid: true };
}

// Upload blog image
export async function uploadBlogImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload/blog-image', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to upload image');
  }

  return result.url;
}

// Delete blog image
export async function deleteBlogImage(imagePath: string): Promise<void> {
  const response = await fetch(`/api/upload/blog-image?path=${encodeURIComponent(imagePath)}`, {
    method: 'DELETE',
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to delete image');
  }
}

// Create image preview
export async function createImagePreview(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  });
}

// Cleanup image preview (for blob URLs)
export function cleanupImagePreview(previewUrl: string): void {
  if (previewUrl && previewUrl.startsWith('blob:')) {
    URL.revokeObjectURL(previewUrl);
  }
}

// Extract image path from URL
export function extractImagePath(imageUrl: string): string | null {
  try {
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/');
    const bucketIndex = pathParts.findIndex(part => part === 'template-images');
    
    if (bucketIndex !== -1 && bucketIndex < pathParts.length - 1) {
      return pathParts.slice(bucketIndex + 1).join('/');
    }
    
    return null;
  } catch {
    return null;
  }
}

// Blog API functions
export async function fetchBlogs(): Promise<BlogPost[]> {
  const response = await fetch('/api/blog');
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to fetch blogs');
  }

  return result.blogs;
}

export async function fetchBlog(id: number): Promise<BlogPost> {
  const response = await fetch(`/api/blog/${id}`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to fetch blog');
  }

  return result.blog;
}

export async function createBlog(blogData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost> {
  const response = await fetch('/api/blog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to create blog');
  }

  return result.blog;
}

export async function updateBlog(id: number, blogData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost> {
  const response = await fetch(`/api/blog/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to update blog');
  }

  return result.blog;
}

export async function deleteBlog(id: number): Promise<void> {
  const response = await fetch(`/api/blog/${id}`, {
    method: 'DELETE',
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to delete blog');
  }
}