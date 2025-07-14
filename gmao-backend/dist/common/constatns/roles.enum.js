"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleEnumLabels = exports.RoleEnum = void 0;
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["SUPER_ADMIN"] = "super_admin";
    RoleEnum["ADMIN"] = "admin";
    RoleEnum["TECHNICIEN"] = "technicien";
    RoleEnum["RESPONSABLE_MAINTENANCE"] = "responsable_maintenance";
    RoleEnum["MAGASINIER"] = "magasinier";
    RoleEnum["LECTURE_SEULE"] = "lecture_seule";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));
exports.RoleEnumLabels = {
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
//# sourceMappingURL=roles.enum.js.map