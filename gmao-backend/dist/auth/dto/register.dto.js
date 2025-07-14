"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDto = exports.LanguageMessageValidator = void 0;
exports.ValidateMessage = ValidateMessage;
const class_validator_1 = require("class-validator");
const roles_enum_1 = require("../../common/constatns/roles.enum");
const validation_messages_1 = require("../../common/validation-messages");
let LanguageMessageValidator = class LanguageMessageValidator {
    validate(value, args) {
        return true;
    }
    defaultMessage(args) {
        const { lang = 'fr' } = args.object;
        const messages = validation_messages_1.ValidationMessages[args.constraints[0]];
        return messages[lang] || messages.fr;
    }
};
exports.LanguageMessageValidator = LanguageMessageValidator;
exports.LanguageMessageValidator = LanguageMessageValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'LanguageMessage', async: false })
], LanguageMessageValidator);
function ValidateMessage(messageKey) {
    return (0, class_validator_1.Validate)(LanguageMessageValidator, [messageKey]);
}
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    ValidateMessage('REQUIRED'),
    __metadata("design:type", String)
], RegisterDto.prototype, "nom", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    ValidateMessage('INVALID_EMAIL'),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.MinLength)(8),
    ValidateMessage('PASSWORD_MIN_LENGTH'),
    (0, class_validator_1.Matches)(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/),
    ValidateMessage('PASSWORD_COMPLEXITY'),
    __metadata("design:type", String)
], RegisterDto.prototype, "motDePasse", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    ValidateMessage('ROLE_REQUIRED'),
    __metadata("design:type", String)
], RegisterDto.prototype, "role", void 0);
//# sourceMappingURL=register.dto.js.map