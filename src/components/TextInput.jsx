export default function TextInput({ value, onChange, placeholder }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Your Vision
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows="4"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent resize-none"
      />
      <p className="text-xs text-gray-500 mt-2">
        Describe what you want to create: characters, setting, mood, camera movements, etc.
      </p>
    </div>
  )
}
