/**
 * Permissions and Approval Workflow Service
 */

import {
  DesignSystem,
  PermissionsConfig,
  Role,
  Permission,
  VersionHistory,
  ApprovalWorkflow,
} from '../types/design-system'

export class PermissionsService {
  /**
   * Check if user has permission for an action
   */
  static hasPermission(
    userRole: Role,
    resource: 'tokens' | 'components' | 'system' | 'sync',
    action: 'read' | 'write' | 'delete' | 'approve' | 'publish'
  ): boolean {
    return userRole.permissions.some(
      p => p.resource === resource && p.action === action
    )
  }

  /**
   * Check if user can approve a version
   */
  static canApprove(
    userRole: Role,
    designSystem: DesignSystem,
    version: VersionHistory
  ): boolean {
    if (!designSystem.permissions.approvalWorkflow.enabled) {
      return true // No approval workflow, anyone can approve
    }

    const requiredRoles = designSystem.permissions.approvalWorkflow.requiredRoles
    if (!requiredRoles.includes(userRole.id)) {
      return false
    }

    // Check if user already approved
    if (version.approvedBy?.includes(userRole.id)) {
      return false
    }

    return this.hasPermission(userRole, 'system', 'approve')
  }

  /**
   * Approve a version
   */
  static approveVersion(
    version: VersionHistory,
    approverRoleId: string
  ): VersionHistory {
    if (version.status !== 'pending') {
      throw new Error(`Cannot approve version with status: ${version.status}`)
    }

    const approvedBy = [...(version.approvedBy || []), approverRoleId]

    // Check if we have enough approvals
    const approvalCount = approvedBy.length
    // This would typically check against the workflow config

    return {
      ...version,
      approvedBy,
      status: approvalCount >= 1 ? 'approved' : 'pending', // Simplified
    }
  }

  /**
   * Reject a version
   */
  static rejectVersion(
    version: VersionHistory,
    rejectorRoleId: string,
    reason: string
  ): VersionHistory {
    if (version.status !== 'pending') {
      throw new Error(`Cannot reject version with status: ${version.status}`)
    }

    return {
      ...version,
      status: 'rejected',
      rejectedBy: rejectorRoleId,
      rejectionReason: reason,
    }
  }

  /**
   * Check if version can be merged/published
   */
  static canPublish(
    version: VersionHistory,
    designSystem: DesignSystem
  ): boolean {
    if (version.status !== 'approved') {
      return false
    }

    const workflow = designSystem.permissions.approvalWorkflow
    if (!workflow.enabled) {
      return true
    }

    const approvalCount = version.approvedBy?.length || 0
    const requiredApprovals = workflow.autoApproveThreshold || 1

    return approvalCount >= requiredApprovals
  }
}

/**
 * Default roles for design systems
 */
export const DEFAULT_ROLES: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    permissions: [
      { resource: 'tokens', action: 'read' },
      { resource: 'tokens', action: 'write' },
      { resource: 'tokens', action: 'delete' },
      { resource: 'components', action: 'read' },
      { resource: 'components', action: 'write' },
      { resource: 'components', action: 'delete' },
      { resource: 'system', action: 'read' },
      { resource: 'system', action: 'write' },
      { resource: 'system', action: 'approve' },
      { resource: 'system', action: 'publish' },
      { resource: 'sync', action: 'read' },
      { resource: 'sync', action: 'write' },
    ],
  },
  {
    id: 'designer',
    name: 'Designer',
    permissions: [
      { resource: 'tokens', action: 'read' },
      { resource: 'tokens', action: 'write' },
      { resource: 'components', action: 'read' },
      { resource: 'components', action: 'write' },
      { resource: 'system', action: 'read' },
    ],
  },
  {
    id: 'developer',
    name: 'Developer',
    permissions: [
      { resource: 'tokens', action: 'read' },
      { resource: 'components', action: 'read' },
      { resource: 'components', action: 'write' },
      { resource: 'system', action: 'read' },
      { resource: 'sync', action: 'read' },
      { resource: 'sync', action: 'write' },
    ],
  },
  {
    id: 'viewer',
    name: 'Viewer',
    permissions: [
      { resource: 'tokens', action: 'read' },
      { resource: 'components', action: 'read' },
      { resource: 'system', action: 'read' },
    ],
  },
]

