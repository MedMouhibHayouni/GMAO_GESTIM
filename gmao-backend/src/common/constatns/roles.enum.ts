// src/common/constants/roles.enum.ts
export enum RoleEnum {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  TECHNICIEN = 'technicien',
  RESPONSABLE_MAINTENANCE = 'responsable_maintenance',
  MAGASINIER = 'magasinier',
  LECTURE_SEULE = 'lecture_seule',
}

export const RoleEnumLabels = {
  [RoleEnum.SUPER_ADMIN]: { fr: 'Super Administrateur', ar: 'المدير العام' },
  [RoleEnum.ADMIN]: { fr: 'Administrateur', ar: 'مدير' },
  [RoleEnum.TECHNICIEN]: { fr: 'Technicien', ar: 'فني' },
  [RoleEnum.RESPONSABLE_MAINTENANCE]: {
    fr: 'Responsable Maintenance',
    ar: 'مسؤول الصيانة',
  },
  [RoleEnum.MAGASINIER]: { fr: 'Magasinier', ar: 'مخزني' },
  [RoleEnum.LECTURE_SEULE]: { fr: 'Lecture Seule', ar: 'قراءة فقط' },
};
