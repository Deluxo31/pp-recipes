// app/page.tsx
'use client'

import { Box, Typography, Container, Grid } from '@mui/material'
import Link from 'next/link'
import { 
  BreakfastDining as BreakfastIcon,
  LunchDining as SaladIcon,        // ← Замена для салатов
  Kitchen as SoupIcon,             // ← Замена для супов
  Cake as CakeIcon 
} from '@mui/icons-material'

// Данные категорий
const categories = [
  {
    id: 'breakfast',
    title: 'Завтраки',
    description: 'Быстрые и полезные завтраки для хорошего начала дня',
    icon: BreakfastIcon,
    color: '#4CAF50',
    image: '/images/categories/pexels-micheile-11583653.webp'
  },
  {
    id: 'salads',
    title: 'Салаты',
    description: 'Свежие и лёгкие салаты для здорового питания',
    icon: SaladIcon,
    color: '#2196F3',
    image: '/images/categories/taylor-kiser-EvoIiaIVRzU-unsplash.webp'
  },
  {
    id: 'first-courses',
    title: 'Первые блюда',
    description: 'Супы и холодные закуски для любого времени года',
    icon: SoupIcon,
    color: '#FF9800',
    image: '/images/categories/pexels-polina-tankilevitch-8601410.webp'
  },
  {
    id: 'desserts',
    title: 'Десерты',
    description: 'Полезные десерты без сахара и вредных ингредиентов',
    icon: CakeIcon,
    color: '#9C27B0',
    image: '/images/categories/imad-786-cuFQNZXdQ8g-unsplash.webp'
  }
]

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Заголовок */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            color: '#22c55e', 
            fontWeight: 'bold',
            mb: 2,
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          ПП Рецепты
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Вкусно. Полезно. Просто.
        </Typography>
      </Box>

      {/* Карточки категорий */}
      <Grid container spacing={5} justifyContent="center" >
        {categories.map((category) => (
          <Grid sizes={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={category.id}>
            <Link 
              href={`/category/${category.id}`} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: 280,
                  width: 360,
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6,
                  },
                }}
              >
                {/* Фоновое изображение */}
                <Box
                  component="img"
                  src={category.image}
                  alt={category.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.8)',
                  }}
                />
                
                {/* Текст поверх изображения */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 3,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    color: 'white',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    
                    <Typography variant="h4" fontWeight="bold">
                      {category.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    {category.description}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Футер */}
      <Box sx={{ textAlign: 'center', mt: 8, pt: 4, borderTop: '1px solid #eee' }}>
        <Typography variant="body2" color="text.secondary">
          © 2026 ПП Рецепты
        </Typography>
      </Box>
    </Container>
  )
}