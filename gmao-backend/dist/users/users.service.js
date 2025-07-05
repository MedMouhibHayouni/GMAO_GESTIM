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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const roles_service_1 = require("../roles/roles.service");
let UsersService = class UsersService {
    constructor(usersRepository, rolesService) {
        this.usersRepository = usersRepository;
        this.rolesService = rolesService;
    }
    async create(createUserDto) {
        const role = await this.rolesService.findByName(createUserDto.role);
        const user = this.usersRepository.create({
            ...createUserDto,
            role,
        });
        const savedUser = await this.usersRepository.save(user);
        return this.toResponseDto(savedUser);
    }
    async findAll() {
        const users = await this.usersRepository.find({ relations: ['role'] });
        return users.map(this.toResponseDto);
    }
    async findOne(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['role'],
        });
        if (!user)
            throw new common_1.NotFoundException(`User not found`);
        return this.toResponseDto(user);
    }
    async findByUsername(username) {
        return this.usersRepository.findOne({
            where: { username },
            relations: ['role'],
        });
    }
    async update(id, updateUserDto) {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user)
            throw new common_1.NotFoundException(`User not found`);
        let role = user.role;
        if (updateUserDto.role) {
            role = await this.rolesService.findByName(updateUserDto.role);
        }
        const updated = await this.usersRepository.save({
            ...user,
            ...updateUserDto,
            role,
        });
        return this.toResponseDto(updated);
    }
    async remove(id) {
        await this.usersRepository.delete(id);
    }
    toResponseDto(user) {
        const { password: _unused, ...userData } = user;
        return userData;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        roles_service_1.RolesService])
], UsersService);
//# sourceMappingURL=users.service.js.map