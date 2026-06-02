export default function PromptDisplay({ prompt, onCopy, onSave }) {
  return (
    <div className="border-l-4 border-indigo-600 pl-4 py-3 bg-gray-50 rounded-r-lg">
      <p className="text-gray-800 leading-relaxed mb-3">{prompt}</p>
      <div className="flex gap-2">
        <button
          onClick={onCopy}
          className="flex-1 px-3 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          📋 Copy
        </button>
        <button
          onClick={onSave}
          className="flex-1 px-3 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          💾 Save
        </button>
      </div>
    </div>
  )
}
