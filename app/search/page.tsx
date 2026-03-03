'use client';

import { useSearch } from '@/contexts/SearchContext';
import { Container, Typography, Grid, Box } from '@mui/material';
import RecipeCard from '@/components/RecipeCard';

export default function SearchPage() {
  const { query, filteredRecipes } = useSearch();

  // ← Защита: проверяем что массив есть и не пуст
  if (!filteredRecipes || filteredRecipes.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, minHeight: '80vh' }}>
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h6" color="text.secondary">
            😕 Ничего не найдено по запросу "{query}"
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6, minHeight: '80vh' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#22c55e' }}>
          Поиск: "{query}"
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Найдено рецептов: {filteredRecipes.length}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {filteredRecipes.map((recipe) => (
          recipe.id && (
            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Grid>
          )
        ))}
      </Grid>
    </Container>
  );
}