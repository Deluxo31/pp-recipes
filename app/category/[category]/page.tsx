// app/category/[category]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import recipes from '@/data/recipes.json'
import RecipeCard from '@/components/RecipeCard'
import { Box, Typography, Container } from '@mui/material'

// Названия категорий для заголовков
const categoryNames: Record<string, string> = {
  breakfast: 'Завтраки',
  salads: 'Салаты',
  'first-courses': 'Первые блюда',
  desserts: 'Десерты',
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const [category, setCategory] = useState<string | null>(null)

  useEffect(() => {
    params.then(p => setCategory(p.category))
  }, [params])

  if (!category) {
    return (
      <Box sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h6">Загрузка...</Typography>
      </Box>
    )
  }

  // Фильтруем рецепты по категории
  const categoryRecipes = recipes.filter(recipe => recipe.category === category)
  const categoryName = categoryNames[category] || category

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" sx={{ color: '#22c55e', fontWeight: 'bold', mb: 2 }}>
          {categoryName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {categoryRecipes.length} рецептов
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, 
        gap: 3 
      }}>
        {categoryRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Box>

      {categoryRecipes.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Рецепты в этой категории скоро появятся
          </Typography>
        </Box>
      )}
    </Container>
  )
}