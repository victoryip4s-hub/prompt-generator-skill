import { useState } from 'react'

export default function ImageUpload({ images, setImages }) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = [...e.dataTransfer.files]
    handleFiles(files)
  }

  const handleChange = (e) => {
    const files = [...e.target.files]
    handleFiles(files)
  }

  const handleFiles = (files) => {
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setImages((prev) => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              name: file.name,
              src: e.target.result,
            },
          ])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Images
      </label>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
          dragActive
            ? 'border-indigo-600 bg-indigo-50'
            : 'border-gray-300 hover:border-indigo-600'
        }`}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          id="image-input"
        />
        <label htmlFor="image-input" className="cursor-pointer">
          <div className="text-indigo-600 text-3xl mb-2">📸</div>
          <p className="text-gray-700 font-medium">Drag images here or click to select</p>
          <p className="text-gray-500 text-sm mt-1">PNG, JPG, GIF up to 10MB</p>
        </label>
      </div>

      {images.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            {images.length} image{images.length !== 1 ? 's' : ''} selected
          </p>
          <div className="grid grid-cols-2 gap-3">
            {images.map((img) => (
              <div key={img.id} className="relative group">
                <img
                  src={img.src}
                  alt={img.name}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(img.id)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
