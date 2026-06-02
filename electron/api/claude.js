import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.VITE_CLAUDE_API_KEY,
})

export async function generatePromptWithClaude({ images, description, style }) {
  // Prepare image content
  const imageContent = []

  if (images && images.length > 0) {
    for (const image of images) {
      // Extract base64 from data URL
      const base64Data = image.src.split(',')[1]
      const mediaType = image.src.includes('png') ? 'image/png' : 'image/jpeg'

      imageContent.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: mediaType,
          data: base64Data,
        },
      })
    }
  }

  // Build the prompt for Claude
  const userPrompt = `You are an expert video prompt writer for AI video generation (like Seedance 2.0). 

${
  imageContent.length > 0
    ? 'I have uploaded images that I want to use or be inspired by. Please analyze them and use them as reference.'
    : ''
}

User's description: "${description}"

Video Style: ${style}

Based on the ${imageContent.length > 0 ? 'images provided and the' : ''} user's description, generate 3 creative and detailed video prompts optimized for Seedance 2.0. 

Each prompt should:
1. Be specific and descriptive (mention subject, action, setting, lighting, camera movement, mood, and effects)
2. Be optimized for AI video generation
3. Follow best practices for Seedance 2.0 prompts
4. Match the "${style}" style
5. Be ready to use immediately

Format your response as a JSON object with an array of prompts:
{
  "prompts": [
    "Full detailed prompt 1",
    "Full detailed prompt 2", 
    "Full detailed prompt 3"
  ]
}

Return ONLY the JSON object, no additional text.`

  try {
    // Build message content with images
    const content = [
      ...imageContent,
      {
        type: 'text',
        text: userPrompt,
      },
    ]

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: content,
        },
      ],
    })

    // Parse the response
    const responseText = message.content[0].text

    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Failed to parse Claude response')
    }

    const parsedResponse = JSON.parse(jsonMatch[0])
    return parsedResponse.prompts || []
  } catch (error) {
    console.error('Claude API Error:', error)
    throw new Error(`Failed to generate prompts: ${error.message}`)
  }
}
