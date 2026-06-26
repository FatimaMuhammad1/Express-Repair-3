export type Role = "super_admin" | "admin" | "technician" | "staff";

export interface Permission {
  canViewRepairs: boolean;
  canEditRepairs: boolean;
  canDeleteRepairs: boolean;
  canViewAllRepairs: boolean; // For technicians - can only see assigned repairs
  canViewCustomers: boolean;
  canEditCustomers: boolean;
  canDeleteCustomers: boolean;
  canViewInventory: boolean;
  canEditInventory: boolean;
  canDeleteInventory: boolean;
  canViewStaff: boolean;
  canEditStaff: boolean;
  canDeleteStaff: boolean;
  canViewBookings: boolean;
  canEditBookings: boolean;
  canDeleteBookings: boolean;
  canViewAnalytics: boolean;
  canViewFinance: boolean;
  canEditFinance: boolean;
  canViewSettings: boolean;
  canEditSettings: boolean;
  canViewCommunication: boolean;
  canSendCommunication: boolean;
  canManageUsers: boolean;
  canManageBranches: boolean;
}

export const rolePermissions: Record<Role, Permission> = {
  super_admin: {
    canViewRepairs: true,
    canEditRepairs: true,
    canDeleteRepairs: true,
    canViewAllRepairs: true,
    canViewCustomers: true,
    canEditCustomers: true,
    canDeleteCustomers: true,
    canViewInventory: true,
    canEditInventory: true,
    canDeleteInventory: true,
    canViewStaff: true,
    canEditStaff: true,
    canDeleteStaff: true,
    canViewBookings: true,
    canEditBookings: true,
    canDeleteBookings: true,
    canViewAnalytics: true,
    canViewFinance: true,
    canEditFinance: true,
    canViewSettings: true,
    canEditSettings: true,
    canViewCommunication: true,
    canSendCommunication: true,
    canManageUsers: true,
    canManageBranches: true,
  },
  admin: {
    canViewRepairs: true,
    canEditRepairs: true,
    canDeleteRepairs: true,
    canViewAllRepairs: true,
    canViewCustomers: true,
    canEditCustomers: true,
    canDeleteCustomers: true,
    canViewInventory: true,
    canEditInventory: true,
    canDeleteInventory: true,
    canViewStaff: true,
    canEditStaff: true,
    canDeleteStaff: true,
    canViewBookings: true,
    canEditBookings: true,
    canDeleteBookings: true,
    canViewAnalytics: true,
    canViewFinance: true,
    canEditFinance: true,
    canViewSettings: true,
    canEditSettings: true,
    canViewCommunication: true,
    canSendCommunication: true,
    canManageUsers: false,
    canManageBranches: false,
  },
  technician: {
    canViewRepairs: true,
    canEditRepairs: true,
    canDeleteRepairs: false,
    canViewAllRepairs: false, // Only assigned repairs
    canViewCustomers: true,
    canEditCustomers: false,
    canDeleteCustomers: false,
    canViewInventory: true,
    canEditInventory: false,
    canDeleteInventory: false,
    canViewStaff: false,
    canEditStaff: false,
    canDeleteStaff: false,
    canViewBookings: true,
    canEditBookings: false,
    canDeleteBookings: false,
    canViewAnalytics: false,
    canViewFinance: false,
    canEditFinance: false,
    canViewSettings: false,
    canEditSettings: false,
    canViewCommunication: true,
    canSendCommunication: false,
    canManageUsers: false,
    canManageBranches: false,
  },
  staff: {
    canViewRepairs: true,
    canEditRepairs: false,
    canDeleteRepairs: false,
    canViewAllRepairs: true,
    canViewCustomers: true,
    canEditCustomers: false,
    canDeleteCustomers: false,
    canViewInventory: true,
    canEditInventory: false,
    canDeleteInventory: false,
    canViewStaff: false,
    canEditStaff: false,
    canDeleteStaff: false,
    canViewBookings: true,
    canEditBookings: false,
    canDeleteBookings: false,
    canViewAnalytics: false,
    canViewFinance: false,
    canEditFinance: false,
    canViewSettings: false,
    canEditSettings: false,
    canViewCommunication: false,
    canSendCommunication: false,
    canManageUsers: false,
    canManageBranches: false,
  },
};

export function getUserPermissions(role: Role): Permission {
  return rolePermissions[role] || rolePermissions.staff;
}

export function hasPermission(userRole: Role, permission: keyof Permission): boolean {
  const permissions = getUserPermissions(userRole);
  return permissions[permission];
}

export function canAccessSection(userRole: Role, section: string): boolean {
  const permissions = getUserPermissions(userRole);
  
  switch (section) {
    case "repairs":
      return permissions.canViewRepairs;
    case "customers":
      return permissions.canViewCustomers;
    case "inventory":
      return permissions.canViewInventory;
    case "staff":
      return permissions.canViewStaff;
    case "bookings":
      return permissions.canViewBookings;
    case "analytics":
      return permissions.canViewAnalytics;
    case "finance":
      return permissions.canViewFinance;
    case "settings":
      return permissions.canViewSettings;
    case "communication":
      return permissions.canViewCommunication;
    default:
      return false;
  }
}

export function canPerformAction(userRole: Role, action: string): boolean {
  const permissions = getUserPermissions(userRole);
  
  switch (action) {
    case "edit_repair":
      return permissions.canEditRepairs;
    case "delete_repair":
      return permissions.canDeleteRepairs;
    case "edit_customer":
      return permissions.canEditCustomers;
    case "delete_customer":
      return permissions.canDeleteCustomers;
    case "edit_inventory":
      return permissions.canEditInventory;
    case "delete_inventory":
      return permissions.canDeleteInventory;
    case "edit_staff":
      return permissions.canEditStaff;
    case "delete_staff":
      return permissions.canDeleteStaff;
    case "edit_booking":
      return permissions.canEditBookings;
    case "delete_booking":
      return permissions.canDeleteBookings;
    case "edit_finance":
      return permissions.canEditFinance;
    case "edit_settings":
      return permissions.canEditSettings;
    case "send_communication":
      return permissions.canSendCommunication;
    case "manage_users":
      return permissions.canManageUsers;
    case "manage_branches":
      return permissions.canManageBranches;
    default:
      return false;
  }
}
