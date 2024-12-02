// app/api/brands.ts
'use server'

import { prisma } from '@/lib/prisma'

export async function fetchBrands() {
  try {
    const brands = await prisma.brands.findMany({
      orderBy: {
        brand_name: 'asc'
      }
    })
    
    return { brands }
  } catch (error) {
    console.error('Error fetching brands:', error)
    throw new Error('Failed to fetch brands')
  }
}