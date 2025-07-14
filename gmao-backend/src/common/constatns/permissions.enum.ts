// src/common/constants/permissions.enum.ts
export enum PermissionEnum {
  // Gestion Utilisateurs
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',

  // Gestion Rôles
  ROLE_CREATE = 'role:create',
  ROLE_READ = 'role:read',
  ROLE_UPDATE = 'role:update',
  ROLE_DELETE = 'role:delete',

  // Équipements
  EQUIPEMENT_CREATE = 'equipement:create',
  EQUIPEMENT_READ = 'equipement:read',
  EQUIPEMENT_UPDATE = 'equipement:update',
  EQUIPEMENT_DELETE = 'equipement:delete',

  // Interventions
  INTERVENTION_CREATE = 'intervention:create',
  INTERVENTION_READ = 'intervention:read',
  INTERVENTION_UPDATE = 'intervention:update',
  INTERVENTION_DELETE = 'intervention:delete',
  INTERVENTION_VALIDATE = 'intervention:validate',

  // Bons de travail
  BON_TRAVAIL_CREATE = 'bon_travail:create',
  BON_TRAVAIL_READ = 'bon_travail:read',
  BON_TRAVAIL_UPDATE = 'bon_travail:update',
  BON_TRAVAIL_DELETE = 'bon_travail:delete',

  // Stocks
  STOCK_CREATE = 'stock:create',
  STOCK_READ = 'stock:read',
  STOCK_UPDATE = 'stock:update',
  STOCK_DELETE = 'stock:delete',

  // Demandes d'achat
  DEMANDE_ACHAT_CREATE = 'demande_achat:create',
  DEMANDE_ACHAT_READ = 'demande_achat:read',
  DEMANDE_ACHAT_UPDATE = 'demande_achat:update',
  DEMANDE_ACHAT_DELETE = 'demande_achat:delete',
  DEMANDE_ACHAT_VALIDATE = 'demande_achat:validate',

  // Fournisseurs
  FOURNISSEUR_CREATE = 'fournisseur:create',
  FOURNISSEUR_READ = 'fournisseur:read',
  FOURNISSEUR_UPDATE = 'fournisseur:update',
  FOURNISSEUR_DELETE = 'fournisseur:delete',

  // Contrats
  CONTRAT_CREATE = 'contrat:create',
  CONTRAT_READ = 'contrat:read',
  CONTRAT_UPDATE = 'contrat:update',
  CONTRAT_DELETE = 'contrat:delete',

  // Projets
  PROJET_CREATE = 'projet:create',
  PROJET_READ = 'projet:read',
  PROJET_UPDATE = 'projet:update',
  PROJET_DELETE = 'projet:delete',

  // Messages
  MESSAGE_SEND = 'message:send',
  MESSAGE_READ = 'message:read',
  MESSAGE_DELETE = 'message:delete',

  // Notifications
  NOTIFICATION_READ = 'notification:read',
  NOTIFICATION_MANAGE = 'notification:manage',

  // Journal
  JOURNAL_READ = 'journal:read',
}

export const PermissionEnumLabels = {
  [PermissionEnum.USER_CREATE]: { fr: 'Créer utilisateur', ar: 'إنشاء مستخدم' },
  [PermissionEnum.USER_READ]: { fr: 'Lire utilisateur', ar: 'قراءة مستخدم' },
  // ... ajoutez toutes les autres permissions
};
