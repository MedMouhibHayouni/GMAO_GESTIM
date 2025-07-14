"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidationMessage = getValidationMessage;
function getValidationMessage(messages, defaultMessage, args) {
    const lang = args.object.lang || 'fr';
    return messages[lang] || defaultMessage;
}
//# sourceMappingURL=validation.helper.js.map