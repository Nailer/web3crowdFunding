/**
 * Milestone Engine Mock
 * Simulates milestone tracking and token unlock logic
 * No actual blockchain execution - mock implementation only
 */

// Types
export interface Milestone {
  id: number;
  percentage: number;
  label: string;
  unlocked: boolean;
  unlockDate?: number;
  tokenBatch?: number;
}

export interface CampaignProgress {
  campaignId: string;
  currentAmount: number;
  targetAmount: number;
  percentage: number;
  milestones: Milestone[];
  unlockedTokens: number;
  totalUnlockedTokens: number;
}

export interface UnlockStatus {
  milestoneId: number;
  unlocked: boolean;
  tokensUnlocked: number;
  unlockDate?: number;
}

/**
 * MilestoneEngine - Mock class for simulating milestone-based token unlocks
 */
export class MilestoneEngine {
  private campaignId: string;
  private targetAmount: number;
  private currentAmount: number;
  private milestones: Milestone[];
  private unlockedTokens: number;
  private logs: string[];

  constructor(campaignId: string, targetAmount: number) {
    this.campaignId = campaignId;
    this.targetAmount = targetAmount;
    this.currentAmount = 0;
    this.unlockedTokens = 0;
    this.logs = [];

    // Initialize milestones: 25%, 50%, 100%
    this.milestones = [
      {
        id: 1,
        percentage: 25,
        label: "Quarter Goal Reached",
        unlocked: false,
        tokenBatch: targetAmount * 0.25, // 25% of tokens
      },
      {
        id: 2,
        percentage: 50,
        label: "Halfway Goal Reached",
        unlocked: false,
        tokenBatch: targetAmount * 0.25, // Additional 25% of tokens
      },
      {
        id: 3,
        percentage: 100,
        label: "Full Goal Reached",
        unlocked: false,
        tokenBatch: targetAmount * 0.5, // Remaining 50% of tokens
      },
    ];

    this.logs.push(`MilestoneEngine initialized for campaign: ${campaignId}`);
    this.logs.push(`Target amount: ${targetAmount}`);
    this.logs.push(`Milestones: 25%, 50%, 100%`);
  }

  /**
   * Update campaign progress
   * @param amount - New amount raised
   */
  updateProgress(amount: number): void {
    this.currentAmount = amount;
    this.logs.push(`Progress updated: ${amount} / ${this.targetAmount}`);
    this.checkMilestones();
  }

  /**
   * Check if any milestones have been reached
   */
  checkMilestones(): void {
    const percentage = (this.currentAmount / this.targetAmount) * 100;

    for (const milestone of this.milestones) {
      if (!milestone.unlocked && percentage >= milestone.percentage) {
        this.unlockMilestone(milestone);
      }
    }
  }

  /**
   * Unlock a milestone and its token batch
   * @param milestone - The milestone to unlock
   */
  private unlockMilestone(milestone: Milestone): void {
    milestone.unlocked = true;
    milestone.unlockDate = Date.now();
    
    if (milestone.tokenBatch) {
      this.unlockedTokens += milestone.tokenBatch;
      this.logs.push(
        `Milestone ${milestone.id} (${milestone.percentage}%) unlocked!`
      );
      this.logs.push(`Tokens unlocked: ${milestone.tokenBatch}`);
      this.logs.push(`Total unlocked tokens: ${this.unlockedTokens}`);
    }
  }

  /**
   * Unlock tokens for a specific milestone (manual unlock)
   * @param milestoneId - The milestone ID to unlock
   */
  unlockTokens(milestoneId: number): void {
    const milestone = this.milestones.find((m) => m.id === milestoneId);
    
    if (!milestone) {
      throw new Error(`Milestone ${milestoneId} not found`);
    }

    if (milestone.unlocked) {
      this.logs.push(`Milestone ${milestoneId} is already unlocked`);
      return;
    }

    const percentage = (this.currentAmount / this.targetAmount) * 100;
    
    if (percentage < milestone.percentage) {
      throw new Error(
        `Cannot unlock milestone ${milestoneId}. Progress is only ${percentage.toFixed(2)}%, need ${milestone.percentage}%`
      );
    }

    this.unlockMilestone(milestone);
  }

  /**
   * Get unlock status for all milestones
   * @returns Array of unlock statuses
   */
  getUnlockedStatus(): UnlockStatus[] {
    return this.milestones.map((milestone) => ({
      milestoneId: milestone.id,
      unlocked: milestone.unlocked,
      tokensUnlocked: milestone.unlocked ? milestone.tokenBatch || 0 : 0,
      unlockDate: milestone.unlockDate,
    }));
  }

  /**
   * Get current campaign progress
   * @returns Campaign progress information
   */
  getProgress(): CampaignProgress {
    const percentage = (this.currentAmount / this.targetAmount) * 100;

    return {
      campaignId: this.campaignId,
      currentAmount: this.currentAmount,
      targetAmount: this.targetAmount,
      percentage: Math.min(percentage, 100),
      milestones: [...this.milestones],
      unlockedTokens: this.unlockedTokens,
      totalUnlockedTokens: this.unlockedTokens,
    };
  }

  /**
   * Get logs
   * @returns Array of log messages
   */
  getLogs(): string[] {
    return [...this.logs];
  }

  /**
   * Reset the engine (for testing)
   */
  reset(): void {
    this.currentAmount = 0;
    this.unlockedTokens = 0;
    this.milestones.forEach((milestone) => {
      milestone.unlocked = false;
      milestone.unlockDate = undefined;
    });
    this.logs = [];
    this.logs.push(`MilestoneEngine reset for campaign: ${this.campaignId}`);
  }

  /**
   * Calculate bonus tokens for backers based on milestone reached
   * @param contributionAmount - The amount contributed by a backer
   * @param milestoneId - The milestone ID that was reached
   * @returns Bonus tokens amount
   */
  calculateBonusTokens(contributionAmount: number, milestoneId: number): number {
    const milestone = this.milestones.find((m) => m.id === milestoneId);
    
    if (!milestone || !milestone.unlocked) {
      return 0;
    }

    // Bonus: 5% of contribution for early milestones, 10% for final milestone
    const bonusPercentage = milestoneId === 3 ? 0.1 : 0.05;
    return contributionAmount * bonusPercentage;
  }
}

/**
 * Create a new MilestoneEngine instance
 * @param campaignId - The campaign ID
 * @param targetAmount - The target funding amount
 * @returns MilestoneEngine instance
 */
export function createMilestoneEngine(
  campaignId: string,
  targetAmount: number
): MilestoneEngine {
  return new MilestoneEngine(campaignId, targetAmount);
}

