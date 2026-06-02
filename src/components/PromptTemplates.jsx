const TEMPLATES = {
  cinematic: [
    "A {subject} {action} in {setting}, cinematic style, {lighting}, {camera_movement}",
    "{subject} performing {action}, dramatic {mood}, {time_of_day}, film quality, {details}",
    "Professional cinematic shot of {subject} {action}, with {effects}, {atmosphere}"
  ],
  animation: [
    "Animated {subject} {action} in {setting}, {animation_style}, {color_palette}",
    "Cartoon-style {subject} doing {action}, {mood}, playful atmosphere, {details}",
    "{subject} {action} anime style, with {effects}, {setting}, {color_scheme}"
  ],
  realistic: [
    "Realistic {subject} {action} in {setting}, natural lighting, detailed, 4K quality",
    "Photorealistic {subject} {action}, {lighting}, {mood}, high definition",
    "True-to-life {subject} performing {action}, {setting}, documentary style, {details}"
  ],
  abstract: [
    "Abstract {subject} {action}, {effects}, {color_palette}, experimental style",
    "Artistic interpretation of {subject}, {action}, glitch effects, {mood}",
    "{subject} {action} with trippy visuals, {effects}, surreal, {atmosphere}"
  ],
  product: [
    "Product showcase of {subject}, rotating view, studio lighting, {background}, {effects}",
    "{subject} presentation, clean product photography, {lighting}, {mood}",
    "Professional product video of {subject}, {camera_movement}, {setting}, minimalist style"
  ],
  documentary: [
    "Documentary-style {subject} {action} in {setting}, narrative voice, {mood}, {details}",
    "Storytelling approach to {subject}, {action}, {lighting}, cinematic, {effects}",
    "Narrative video of {subject} {action}, {setting}, authentic, {atmosphere}"
  ]
}

const PLACEHOLDERS = {
  subject: ['person', 'animal', 'object', 'landscape'],
  action: ['walking', 'dancing', 'running', 'speaking'],
  setting: ['urban environment', 'natural landscape', 'indoor space', 'abstract space'],
  lighting: ['golden hour', 'neon lights', 'natural daylight', 'dramatic shadows'],
  camera_movement: ['slow pan', 'smooth zoom', 'steady shot', 'dynamic angles'],
  time_of_day: ['sunrise', 'sunset', 'golden hour', 'night'],
  mood: ['dramatic', 'peaceful', 'energetic', 'mysterious'],
  effects: ['particle effects', 'light trails', 'color grading', 'motion blur'],
  color_palette: ['vibrant', 'pastel', 'monochrome', 'neon'],
  details: ['sharp focus', 'shallow depth of field', 'ultra high definition', 'cinematic quality']
}

export default function PromptTemplates({ selectedStyle }) {
  const templates = TEMPLATES[selectedStyle] || TEMPLATES.cinematic

  const handleTemplateClick = (template) => {
    // Show template with placeholders highlighted
    alert(`Template:\n\n${template}\n\nUse these placeholders:\n${Object.keys(PLACEHOLDERS).join(', ')}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        📋 {selectedStyle.charAt(0).toUpperCase() + selectedStyle.slice(1)} Templates
      </h3>
      <div className="space-y-2">
        {templates.map((template, idx) => (
          <button
            key={idx}
            onClick={() => handleTemplateClick(template)}
            className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition border border-gray-200 text-sm text-gray-700"
          >
            <code className="text-xs text-indigo-600">{template}</code>
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-4">
        💡 Tip: Use templates as a starting point. Replace placeholders with your own words!
      </p>
    </div>
  )
}
