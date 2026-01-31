// app/recipe/[id]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import recipes from '@/data/recipes.json'
import { Typography, Box, Card, CardMedia, CardContent } from '@mui/material'

interface Recipe {
  id: number
  title: string
  calories: number
  protein: number
  carbs: number
  fat: number
  time: string
  image?: string
  description?: string
  ingredients?: string[]
  steps?: string[]
}

function getRecipeById(id: string): Recipe | null {
  const recipeId = parseInt(id, 10)
  return recipes.find(r => r.id === recipeId) || null
}

export default function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    params.then(p => setId(p.id))
  }, [params])

  if (!id) {
    return (
      <Box sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h6">Загрузка...</Typography>
      </Box>
    )
  }

  const recipe = getRecipeById(id)

  if (!recipe) {
    return (
      <Box sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="error">
          Рецепт не найден
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 800, margin: '2rem auto', padding: 2 }}>
      <Typography variant="h3" gutterBottom sx={{ color: '#22c55e', fontWeight: 'bold' }}>
        {recipe.title}
      </Typography>

      <Card sx={{ marginBottom: 3 }}>
        <CardMedia
          component="img"
          height="400"
          image={recipe.image || 'https://via.placeholder.com/800x400?text=Рецепт'}
          alt={recipe.title}
        />
        <CardContent>
          <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
            <Typography variant="body1">🕐 {recipe.time}</Typography>
            <Typography variant="body1">🔥 {recipe.calories} ккал</Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Typography variant="body2" color="success.main">Б: {recipe.protein}г</Typography>
            <Typography variant="body2" color="warning.main">У: {recipe.carbs}г</Typography>
            <Typography variant="body2" color="error.main">Ж: {recipe.fat}г</Typography>
          </Box>

          {recipe.description && (
            <Typography variant="body1" paragraph>
              {recipe.description}
            </Typography>
          )}

          {recipe.ingredients && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>Ингредиенты:</Typography>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </Box>
          )}

          {recipe.steps && (
            <Box>
              <Typography variant="h6" gutterBottom>Приготовление:</Typography>
              <ol>
                {recipe.steps.map((step, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>{step}</li>
                ))}
              </ol>
            </Box>
          )}
        </CardContent>
      </Card>

      <Box sx={{ mt: 2 }}>
        <a href="/" style={{ color: '#22c55e', textDecoration: 'none' }}>
          ← Назад к рецептам
        </a>
      </Box>
    </Box>
  )
}