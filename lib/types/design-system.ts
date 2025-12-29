/**
 * Unified Design System Schema
 * This is the core schema that powers Flash - the Design System Operating System
 */

export interface DesignToken {
  id: string
  name: string
  type: 'color' | 'spacing' | 'typography' | 'shadow' | 'border' | 'opacity' | 'other'
  value: string | number
  description?: string
  category?: string
  metadata?: Record<string, any>
}

export interface Component {
  id: string
  name: string
  description?: string
  category: string
  props?: ComponentProp[]
  variants?: ComponentVariant[]
  code?: string
  figmaNodeId?: string
  gitPath?: string
  version: string
  status: 'draft' | 'review' | 'approved' | 'published'
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}

export interface ComponentProp {
  name: string
  type: string
  required: boolean
  defaultValue?: any
  description?: string
}

export interface ComponentVariant {
  name: string
  props: Record<string, any>
  preview?: string
}

export interface DesignSystem {
  id: string
  name: string
  description?: string
  version: string
  schemaVersion: string // Version of this schema format
  tokens: DesignToken[]
  components: Component[]
  metadata: {
    projectName?: string
    targetAudience?: string
    goals?: string
    techStack?: string[]
    designSystemBases?: string[]
  }
  sync: {
    figma?: FigmaSyncConfig
    code?: CodeSyncConfig
  }
  permissions: PermissionsConfig
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}

export interface FigmaSyncConfig {
  fileKey: string
  fileName: string
  lastSyncedAt?: string
  syncDirection: 'one-way' | 'two-way'
  autoSync: boolean
  webhookUrl?: string
  token?: string // Encrypted token
}

export interface CodeSyncConfig {
  repository: string
  branch: string
  path: string
  lastSyncedAt?: string
  syncDirection: 'one-way' | 'two-way'
  autoSync: boolean
  provider: 'github' | 'gitlab' | 'bitbucket' | 'local'
  token?: string // Encrypted token
}

export interface PermissionsConfig {
  roles: Role[]
  approvalWorkflow: ApprovalWorkflow
}

export interface Role {
  id: string
  name: string
  permissions: Permission[]
}

export interface Permission {
  resource: 'tokens' | 'components' | 'system' | 'sync'
  action: 'read' | 'write' | 'delete' | 'approve' | 'publish'
}

export interface ApprovalWorkflow {
  enabled: boolean
  requiredRoles: string[] // Role IDs that can approve
  autoApproveThreshold?: number // Number of approvals needed
}

export interface VersionHistory {
  id: string
  designSystemId: string
  version: string
  type: 'major' | 'minor' | 'patch' | 'hotfix'
  changes: Change[]
  diff?: Diff
  impactAnalysis?: ImpactAnalysis
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'merged'
  createdBy: string
  createdAt: string
  approvedBy?: string[]
  rejectedBy?: string
  rejectionReason?: string
}

export interface Change {
  type: 'token' | 'component' | 'metadata' | 'sync'
  action: 'created' | 'updated' | 'deleted'
  resourceId: string
  resourceName: string
  before?: any
  after?: any
}

export interface Diff {
  tokens: DiffItem[]
  components: DiffItem[]
  metadata: DiffItem[]
}

export interface DiffItem {
  id: string
  name: string
  type: 'added' | 'modified' | 'deleted'
  changes: FieldChange[]
}

export interface FieldChange {
  field: string
  before: any
  after: any
}

export interface ImpactAnalysis {
  affectedComponents: string[]
  affectedTokens: string[]
  breakingChanges: BreakingChange[]
  warnings: string[]
  estimatedImpact: 'low' | 'medium' | 'high' | 'critical'
}

export interface BreakingChange {
  type: 'api' | 'token' | 'dependency'
  description: string
  affectedResources: string[]
  migrationPath?: string
}

// Sync Status
export interface SyncStatus {
  figma?: SyncStatusItem
  code?: SyncStatusItem
}

export interface SyncStatusItem {
  status: 'synced' | 'pending' | 'conflict' | 'error'
  lastSyncedAt?: string
  conflicts?: Conflict[]
  error?: string
}

export interface Conflict {
  id: string
  resourceId: string
  resourceType: 'token' | 'component'
  localValue: any
  remoteValue: any
  resolution?: 'local' | 'remote' | 'merge'
  resolvedBy?: string
  resolvedAt?: string
}

