import prisma from './prisma'

// User operations
export const userService = {
  async findByAppWallet(appWallet: string) {
    return prisma.user.findUnique({
      where: { appWallet },
    })
  },

  async findByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username },
    })
  },

  async createUser(data: {
    appWallet?: string
    username?: string
    displayName?: string
    email?: string
    bio?: string
    avatarUrl?: string
  }) {
    return prisma.user.create({
      data,
    })
  },

  async updateUser(id: string, data: Partial<{
    username: string
    displayName: string
    email: string
    bio: string
    website: string
    avatarUrl: string
    bannerUrl: string
    metadata: string
  }>) {
    return prisma.user.update({
      where: { id },
      data,
    })
  },
}

// Project operations
export const projectService = {
  async findByUserId(userId: string) {
    return prisma.project.findMany({
      where: { userId },
      include: {
        user: true,
        milestones: true,
        _count: {
          select: {
            weeklyUpdates: true,
            votes: true,
            engagement: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  },

  async findPublicProjects() {
    return prisma.project.findMany({
      where: { 
        visibility: 'PUBLIC',
        status: 'ACTIVE',
      },
      include: {
        user: true,
        _count: {
          select: {
            weeklyUpdates: true,
            votes: true,
            engagement: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  },

  async createProject(data: {
    userId: string
    title: string
    description?: string
    problemStatement?: string
    solutionOverview?: string
    targetMarket?: string
    category?: string
    startDate?: Date
    targetEndDate?: Date
  }) {
    return prisma.project.create({
      data,
      include: {
        user: true,
      },
    })
  },

  async updateProject(id: string, data: Partial<{
    title: string
    description: string
    problemStatement: string
    solutionOverview: string
    targetMarket: string
    category: string
    visibility: 'PUBLIC' | 'PRIVATE' | 'COMMUNITY'
    status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED'
    targetEndDate: Date
  }>) {
    return prisma.project.update({
      where: { id },
      data,
    })
  },
}

// Weekly operations
export const weeklyService = {
  async createGoals(data: {
    projectId: string
    userId: string
    weekStartDate: Date
    goals: any[] // JSON array of goals
  }) {
    return prisma.weeklyGoal.create({
      data,
    })
  },

  async createUpdate(data: {
    projectId: string
    userId: string
    weekNumber?: number
    weekStartDate?: Date
    wins?: string
    challenges?: string
    metrics?: any
    nextWeekPreview?: string
    mediaUrls?: string[]
    farcasterCastId?: string
  }) {
    return prisma.weeklyUpdate.create({
      data,
      include: {
        project: true,
        user: true,
      },
    })
  },

  async getProjectUpdates(projectId: string) {
    return prisma.weeklyUpdate.findMany({
      where: { projectId },
      include: {
        user: true,
      },
      orderBy: { weekStartDate: 'desc' },
    })
  },
}

// Engagement operations
export const engagementService = {
  async recordEngagement(data: {
    userId: string
    projectId?: string
    targetType: 'PROJECT' | 'UPDATE' | 'COMMENT' | 'USER'
    targetId: string
    actionType: 'LIKE' | 'COMMENT' | 'SHARE' | 'FOLLOW' | 'UNFOLLOW' | 'REACT'
    metadata?: any
  }) {
    return prisma.engagement.create({
      data,
    })
  },

  async getProjectEngagement(projectId: string) {
    return prisma.engagement.findMany({
      where: { projectId },
      include: {
        user: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  },
}

// Vote operations
export const voteService = {
  async castVote(data: {
    projectId: string
    userId: string
    vote: boolean
    reason?: string
  }) {
    return prisma.vote.upsert({
      where: {
        projectId_userId: {
          projectId: data.projectId,
          userId: data.userId,
        },
      },
      update: {
        vote: data.vote,
        reason: data.reason,
      },
      create: data,
    })
  },

  async getProjectVotes(projectId: string) {
    return prisma.vote.findMany({
      where: { projectId },
      include: {
        user: true,
      },
    })
  },
}

export default prisma