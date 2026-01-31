export interface Recipe {
  id: number
  title: string
  category: string
  subcategory: string
  description: string
  difficulty: 'легко' | 'средне' | 'сложно'
  prepTime: string
  servings: number
  calories: number
  protein: number
  carbs: number
  fat: number
  ingredients: string[]
  steps: string[]
  tags: string[]
  image: string
  rating: number
  reviews: number
}