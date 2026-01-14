/**
 * Image Upload Utility for Tiptap Editor
 * 
 * Development: Uses base64 (embedded in JSON)
 * Production: Upload to Cloudinary
 */

/**
 * Compress image if it's too large (for mobile support)
 * @param {File} file - The image file
 * @param {number} maxSizeMB - Maximum size in MB
 * @returns {Promise<File>} - Compressed file
 */
async function compressImage(file, maxSizeMB = 2) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
        
        // Calculate new dimensions (max 1920px width)
        const maxWidth = 1920
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
        
        canvas.width = width
        canvas.height = height
        
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        
        // Compress to JPEG with quality 0.8
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              })
              resolve(compressedFile)
            } else {
              reject(new Error('Compression failed'))
            }
          },
          'image/jpeg',
          0.8
        )
      }
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = e.target.result
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

/**
 * Upload image to Cloudinary via API route
 * @param {File} file - The image file to upload
 * @param {string} userId - User ID for organizing uploads
 * @param {number} timeoutMs - Upload timeout in milliseconds
 * @returns {Promise<string>} - The public URL of the uploaded image
 */
export async function uploadImageToCloudinary(file, userId = 'anonymous', timeoutMs = 60000) {
  try {
    // Validate file
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image')
    }

    console.log(`Starting Cloudinary upload: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`)

    // Compress if needed (optional - Cloudinary also optimizes)
    let uploadFile = file
    if (file.size > 3 * 1024 * 1024) {
      console.log('Pre-compressing large image...')
      uploadFile = await compressImage(file, 2)
      console.log(`Compressed to: ${(uploadFile.size / 1024 / 1024).toFixed(2)}MB`)
    }

    // Max 5MB
    if (uploadFile.size > 5 * 1024 * 1024) {
      throw new Error('Image must be less than 5MB')
    }

    // Create form data
    const formData = new FormData()
    formData.append('file', uploadFile)
    formData.append('userId', userId)
    
    console.log('Uploading to Cloudinary...')
    
    // Upload with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
    
    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Upload failed')
      }
      
      const data = await response.json()
      console.log('Cloudinary upload successful:', data.url)
      
      return data.url
    } catch (error) {
      clearTimeout(timeoutId)
      if (error.name === 'AbortError') {
        throw new Error('Upload timed out. Please check your internet connection and try again.')
      }
      throw error
    }
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    throw error
  }
}

/**
 * Convert image file to base64 (for development/preview)
 * @param {File} file - The image file
 * @returns {Promise<string>} - Base64 data URL
 */
export function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target?.result)
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}

/**
 * Handle image upload for Tiptap editor
 * @param {File} file - The image file
 * @param {Object} options - Upload options
 * @returns {Promise<string>} - Image URL (either base64 or cloud URL)
 */
/**
 * Handle image upload for Tiptap editor
 * @param {File} file - The image file
 * @param {Object} options - Upload options
 * @returns {Promise<string>} - Image URL (either base64 or Cloudinary URL)
 */
export async function handleImageUpload(file, options = {}) {
  const {
    useCloudStorage = process.env.NODE_ENV === 'production',
    userId = null,
    onProgress = null,
  } = options

  try {
    console.log('handleImageUpload called:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      useCloudStorage,
      hasUserId: !!userId,
      environment: process.env.NODE_ENV
    })

    if (useCloudStorage && userId) {
      // Production: Upload to Cloudinary
      if (onProgress) onProgress(10)
      const url = await uploadImageToCloudinary(file, userId, 60000)
      if (onProgress) onProgress(100)
      console.log('Upload completed successfully')
      return url
    } else {
      // Development: Use base64
      console.log('Using base64 encoding (development mode)')
      if (onProgress) onProgress(50)
      const base64 = await convertImageToBase64(file)
      if (onProgress) onProgress(100)
      return base64
    }
  } catch (error) {
    console.error('Image upload failed:', error)
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    })
    // Re-throw with user-friendly message
    throw new Error(error.message || 'Failed to upload image. Please try again.')
  }
}
