const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function updateSlugs() {
  // Get all tasks
  const tasks = await prisma.task.findMany()
  
  for (const task of tasks) {
    // Convert name to slug format:
    // 1. Convert to lowercase
    // 2. Replace spaces with hyphens
    // 3. Remove special characters
    // 4. Remove multiple consecutive hyphens
    const slug = task.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    
    // Update the task with the new slug
    await prisma.task.update({
      where: { id: task.id },
      data: { slug }
    })
    
    console.log(`Updated task "${task.name}" with slug "${slug}"`)
  }
  
  console.log('Slug migration completed!')
}

updateSlugs()
  .catch(e => {
    console.error('Error during slug migration:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })