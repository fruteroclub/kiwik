import { PrismaClient } from './generated/prisma'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prisma = globalThis.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export default prisma

// Export types for convenience
export type {
  User,
  Project,
  Milestone,
  WeeklyGoal,
  WeeklyUpdate,
  Engagement,
  TokenLaunch,
  Vote,
  Comment,
  ProjectVisibility,
  ProjectStatus,
  GoalStatus,
  EngagementTargetType,
  EngagementActionType,
  TokenLaunchStatus,
  CommentTargetType,
} from './generated/prisma'