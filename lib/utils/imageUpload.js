/**
 * Image Upload Utility for Tiptap Editor
 * 
 * Development: Uses base64 (embedded in JSON)
 * Production: Upload to Firebase Storage or cloud service
 */

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

/**
 * Upload image to Firebase Storage
 * @param {File} file - The image file to upload
 * @param {string} userId - User ID for organizing uploads
 * @returns {Promise<string>} - The public URL of the uploaded image
 */
export async function uploadImageToStorage(file, userId = 'anonymous') {
  try {
    // Validate file
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image')
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Image must be less than 5MB')
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split('.').pop()
    const filename = `${timestamp}-${randomString}.${extension}`
    
    // Upload to Firebase Storage
    const storage = getStorage()
    const storageRef = ref(storage, `blog-images/${userId}/${filename}`)
    
    // Upload file
    await uploadBytes(storageRef, file)
    
    // Get public URL
    const downloadURL = await getDownloadURL(storageRef)
    
    return downloadURL
  } catch (error) {
    console.error('Error uploading image:', error)
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
export async function handleImageUpload(file, options = {}) {
  const {
    useCloudStorage = process.env.NODE_ENV === 'production',
    userId = null,
    onProgress = null,
  } = options

  try {
    if (useCloudStorage && userId) {
      // Production: Upload to cloud storage
      if (onProgress) onProgress(0)
      const url = await uploadImageToStorage(file, userId)
      if (onProgress) onProgress(100)
      return url
    } else {
      // Development: Use base64
      if (onProgress) onProgress(50)
      const base64 = await convertImageToBase64(file)
      if (onProgress) onProgress(100)
      return base64
    }
  } catch (error) {
    console.error('Image upload failed:', error)
    throw error
  }
}
