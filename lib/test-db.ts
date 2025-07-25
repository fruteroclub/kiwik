// Simple database connection test
// Run this with: bunx tsx lib/test-db.ts

import { config } from 'dotenv'
import { PrismaClient } from './generated/prisma'

// Load environment variables
config()

// Create a client with the direct URL for testing
const testPrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
})

async function testDatabaseConnection() {
  try {
    console.log('🧪 Testing database connection...')
    console.log('📍 Using database URL:', process.env.DATABASE_URL ? 'Set ✓' : 'Not set ✗')
    console.log('📍 Using direct URL:', process.env.DIRECT_URL ? 'Set ✓' : 'Not set ✗')
    
    // Test basic connection
    await testPrisma.$connect()
    console.log('✅ Database connected successfully')
    
    // Test a simple query
    try {
      const userCount = await testPrisma.user.count()
      console.log(`✅ Database query successful - found ${userCount} users`)
      
      // Test other tables
      const projectCount = await testPrisma.project.count()
      console.log(`✅ Projects table accessible - found ${projectCount} projects`)
      
      // Test creating a sample user
      console.log('🧪 Testing user creation...')
      const testUser = await testPrisma.user.create({
        data: {
          appWallet: 'test-wallet-' + Date.now(),
          username: 'test-user-' + Date.now(),
          displayName: 'Test User',
          bio: 'This is a test user created by the database test script',
        }
      })
      console.log(`✅ Test user created with ID: ${testUser.id}`)
      
      // Clean up test user
      await testPrisma.user.delete({
        where: { id: testUser.id }
      })
      console.log('✅ Test user cleaned up')
      
      console.log('✅ All database operations working correctly!')
      
    } catch (error) {
      console.log('⚠️  Database operation failed:', error.message)
    }
    
    await testPrisma.$disconnect()
    console.log('✅ Database disconnected successfully')
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    process.exit(1)
  }
}

testDatabaseConnection()