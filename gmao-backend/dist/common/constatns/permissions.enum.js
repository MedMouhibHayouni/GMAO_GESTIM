"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionEnumLabels = exports.PermissionEnum = void 0;
var PermissionEnum;
(function (PermissionEnum) {
    PermissionEnum["USER_CREATE"] = "user:create";
    PermissionEnum["USER_READ"] = "user:read";
    PermissionEnum["USER_UPDATE"] = "user:update";
    PermissionEnum["USER_DELETE"] = "user:delete";
    PermissionEnum["ROLE_CREATE"] = "role:create";
    PermissionEnum["ROLE_READ"] = "role:read";
    PermissionEnum["ROLE_UPDATE"] = "role:update";
    PermissionEnum["ROLE_DELETE"] = "role:delete";
    PermissionEnum["EQUIPEMENT_CREATE"] = "equipement:create";
    PermissionEnum["EQUIPEMENT_READ"] = "equipement:read";
    PermissionEnum["EQUIPEMENT_UPDATE"] = "equipement:update";
    PermissionEnum["EQUIPEMENT_DELETE"] = "equipement:delete";
    PermissionEnum["INTERVENTION_CREATE"] = "intervention:create";
    PermissionEnum["INTERVENTION_READ"] = "intervention:read";
    PermissionEnum["INTERVENTION_UPDATE"] = "intervention:update";
    PermissionEnum["INTERVENTION_DELETE"] = "intervention:delete";
    PermissionEnum["INTERVENTION_VALIDATE"] = "intervention:validate";
    PermissionEnum["BON_TRAVAIL_CREATE"] = "bon_travail:create";
    PermissionEnum["BON_TRAVAIL_READ"] = "bon_travail:read";
    PermissionEnum["BON_TRAVAIL_UPDATE"] = "bon_travail:update";
    PermissionEnum["BON_TRAVAIL_DELETE"] = "bon_travail:delete";
    PermissionEnum["STOCK_CREATE"] = "stock:create";
    PermissionEnum["STOCK_READ"] = "stock:read";
    PermissionEnum["STOCK_UPDATE"] = "stock:update";
    PermissionEnum["STOCK_DELETE"] = "stock:delete";
    PermissionEnum["DEMANDE_ACHAT_CREATE"] = "demande_achat:create";
    PermissionEnum["DEMANDE_ACHAT_READ"] = "demande_achat:read";
    PermissionEnum["DEMANDE_ACHAT_UPDATE"] = "demande_achat:update";
    PermissionEnum["DEMANDE_ACHAT_DELETE"] = "demande_achat:delete";
    PermissionEnum["DEMANDE_ACHAT_VALIDATE"] = "demande_achat:validate";
    PermissionEnum["FOURNISSEUR_CREATE"] = "fournisseur:create";
    PermissionEnum["FOURNISSEUR_READ"] = "fournisseur:read";
    PermissionEnum["FOURNISSEUR_UPDATE"] = "fournisseur:update";
    PermissionEnum["FOURNISSEUR_DELETE"] = "fournisseur:delete";
    PermissionEnum["CONTRAT_CREATE"] = "contrat:create";
    PermissionEnum["CONTRAT_READ"] = "contrat:read";
    PermissionEnum["CONTRAT_UPDATE"] = "contrat:update";
    PermissionEnum["CONTRAT_DELETE"] = "contrat:delete";
    PermissionEnum["PROJET_CREATE"] = "projet:create";
    PermissionEnum["PROJET_READ"] = "projet:read";
    PermissionEnum["PROJET_UPDATE"] = "projet:update";
    PermissionEnum["PROJET_DELETE"] = "projet:delete";
    PermissionEnum["MESSAGE_SEND"] = "message:send";
    PermissionEnum["MESSAGE_READ"] = "message:read";
    PermissionEnum["MESSAGE_DELETE"] = "message:delete";
    PermissionEnum["NOTIFICATION_READ"] = "notification:read";
    PermissionEnum["NOTIFICATION_MANAGE"] = "notification:manage";
    PermissionEnum["JOURNAL_READ"] = "journal:read";
})(PermissionEnum || (exports.PermissionEnum = PermissionEnum = {}));
exports.PermissionEnumLabels = {
    [PermissionEnum.USER_CREATE]: { fr: 'Créer utilisateur', ar: 'إنشاء مستخدم' },
    [PermissionEnum.USER_READ]: { fr: 'Lire utilisateur', ar: 'قراءة مستخدم' },
};
//# sourceMappingURL=permissions.enum.js.map