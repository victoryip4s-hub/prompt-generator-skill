const STYLES = [
  { id: 'cinematic', label: '🎬 Cinematic', description: 'Dramatic, professional film quality' },
  { id: 'animation', label: '🎨 Animation', description: 'Cartoon or anime style' },
  { id: 'realistic', label: '📸 Realistic', description: 'Photorealistic, natural' },
  { id: 'abstract', label: '✨ Abstract', description: 'Artistic, experimental' },
  { id: 'product', label: '🛍️ Product', description: 'Showcase and presentation' },
  { id: 'documentary', label: '📺 Documentary', description: 'Narrative, storytelling' },
]

export default function StyleSelector({ selectedStyle, onChange }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Video Style
      </label>
      <div className="grid grid-cols-2 gap-3">
        {STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onChange(style.id)}
            className={`p-3 rounded-lg border-2 transition text-left ${
              selectedStyle === style.id
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-300 hover:border-indigo-300'
            }`}
          >
            <div className="font-medium text-sm">{style.label}</div>
            <div className="text-xs text-gray-600 mt-1">{style.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
