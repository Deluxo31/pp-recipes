'use client'

import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material'
import Link from 'next/link'
import StarIcon from '@mui/icons-material/Star'
import { Recipe } from '@/types/types';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  if (!recipe || !recipe.id) {
    return null;
  }
  // Цвета для сложности
  const difficultyColors: Record<string, string> = {
    легко: 'success',
    средне: 'warning',
    сложно: 'error',
  }

  return (
    <Link href={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card 
        sx={{ 
          maxWidth: 345,
          transition: 'transform 0.2s',
          '&:hover': { transform: 'scale(1.02)', boxShadow: 6 },
          borderRadius: 2,
          cursor: 'pointer',
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={recipe.image}
          alt={recipe.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
            {recipe.title}
          </Typography>

          {/* Теги (проверяем, что они существуют) */}
          {recipe.tags && recipe.tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
              {recipe.tags.slice(0, 2).map((tag, index) => (
                <Chip 
                  key={index} 
                  label={tag} 
                  size="small" 
                  sx={{ fontSize: '0.7rem' }} 
                />
              ))}
            </Box>
          )}

          {/* Сложность и время */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
            <Chip 
              label={recipe.difficulty} 
              size="small" 
              color={difficultyColors[recipe.difficulty] as any}
              sx={{ fontSize: '0.75rem' }}
            />
            <Typography variant="body2" color="text.secondary">
              🕐 {recipe.prepTime}
            </Typography>
          </Box>

          {/* Калории и БЖУ */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2" fontWeight="bold">
              🔥 {recipe.calories} ккал
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="caption" color="success.main">Б: {recipe.protein}г</Typography>
              <Typography variant="caption" color="warning.main">У: {recipe.carbs}г</Typography>
              <Typography variant="caption" color="error.main">Ж: {recipe.fat}г</Typography>
            </Box>
          </Box>

          {/* Рейтинг */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StarIcon sx={{ fontSize: '1rem', color: '#FFD700' }} />
            <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 'bold' }}>
              {recipe.rating}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  )
}