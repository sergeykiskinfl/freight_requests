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
exports.FrReqController = void 0;
const common_1 = require("@nestjs/common");
const fr_req_model_1 = require("./fr_req.model");
const fr_req_service_1 = require("./fr_req.service");
const swagger_1 = require("@nestjs/swagger");
let FrReqController = class FrReqController {
    constructor(frReqService) {
        this.frReqService = frReqService;
    }
    async getAllFrReq() {
        return this.frReqService.getAllFrReq();
    }
    async postFrReq(postData) {
        return this.frReqService.createFrReq(postData);
    }
    async getFrReq(id) {
        return this.frReqService.getFrReq(id);
    }
    async deleteReq(id) {
        return this.frReqService.deleteFrReq(id);
    }
    async updateFrReq(id, postData) {
        return this.frReqService.updateFrReq(id, postData);
    }
};
exports.FrReqController = FrReqController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить все транспортные заявки' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Все транспортные заявки',
        schema: {
            type: 'array',
            example: [
                [
                    {
                        id: 1,
                        timestamp: '2024-04-17T05:02:10.692Z',
                        client_brand: 'Магнит',
                        freighter_name: 'Иванов Иван Иванович',
                        phone: '+79999999998',
                        comment: 'Накладные прибудут во вторник',
                        status: 'новая',
                        ati: 'https://ati.su/firms/29056/info',
                    },
                    {
                        id: 2,
                        timestamp: '2024-04-17T07:19:32.203Z',
                        client_brand: 'Магнит',
                        freighter_name: 'Петров Денис Андреевич',
                        phone: '+79999999999',
                        comment: 'Доставить срочно',
                        status: 'в работе',
                        ati: 'https://ati.su/firms/28267/info',
                    },
                    {
                        id: 3,
                        timestamp: '2024-04-17T07:23:07.722Z',
                        client_brand: 'Магнит',
                        freighter_name: 'Сидоров Андрей Сергеевич',
                        phone: '+79999999995',
                        comment: null,
                        status: 'в работе',
                        ati: 'https://ati.su/firms/35896/info',
                    },
                    {
                        id: 5,
                        timestamp: '2024-04-18T07:06:58.111Z',
                        client_brand: 'Пятерочка',
                        freighter_name: 'Иванов Иван Иванович',
                        phone: '+79999999998',
                        comment: 'Доставить к завтрашнему дню',
                        status: 'завершено',
                        ati: 'https://ati.su/firms/29056/info',
                    },
                ],
            ],
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FrReqController.prototype, "getAllFrReq", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новую транспортную заявку' }),
    (0, swagger_1.ApiBody)({
        type: fr_req_model_1.FrReq,
        description: 'Новая заявка',
        examples: {
            a: {
                summary: 'Новая заявка',
                description: 'Тело запроса для новой заявки',
                value: {
                    client_brand: 'Пятерочка',
                    freighter_name: 'Иванов Иван Иванович',
                    phone: '+79999999998',
                    comment: 'Доставить к завтрашнему дню',
                    ati: 'https://ati.su/firms/29056/info',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Новая транспортная заявка',
        schema: {
            example: {
                id: 5,
                timestamp: '2024-04-18T07:06:58.111Z',
                client_brand: 'Пятерочка',
                freighter_name: 'Иванов Иван Иванович',
                phone: '+79999999998',
                comment: 'Доставить к завтрашнему дню',
                status: 'новая',
                ati: 'https://ati.su/firms/29056/info',
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fr_req_model_1.FrReq]),
    __metadata("design:returntype", Promise)
], FrReqController.prototype, "postFrReq", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить конкретную транспортную заявку' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Номер заявки',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Транспортная заявка',
        schema: {
            example: {
                id: 5,
                timestamp: '2024-04-18T07:06:58.111Z',
                client_brand: 'Пятерочка',
                freighter_name: 'Иванов Иван Иванович',
                phone: '+79999999998',
                comment: 'Доставить к завтрашнему дню',
                status: 'новая',
                ati: 'https://ati.su/firms/29056/info',
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FrReqController.prototype, "getFrReq", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить транспортную заявку' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Номер заявки',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Транспортная заявка',
        schema: {
            example: {
                id: 5,
                timestamp: '2024-04-18T07:06:58.111Z',
                client_brand: 'Пятерочка',
                freighter_name: 'Иванов Иван Иванович',
                phone: '+79999999998',
                comment: 'Доставить к завтрашнему дню',
                status: 'завершено',
                ati: 'https://ati.su/firms/29056/info',
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FrReqController.prototype, "deleteReq", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Изменить транспортную заявку' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Номер заявки',
    }),
    (0, swagger_1.ApiBody)({
        type: fr_req_model_1.FrReq,
        description: 'Новая заявка',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Транспортная заявка',
        schema: {
            example: {
                id: 5,
                timestamp: '2024-04-18T07:06:58.111Z',
                client_brand: 'Пятерочка',
                freighter_name: 'Иванов Иван Иванович',
                phone: '+79999999998',
                comment: 'Доставить к завтрашнему дню',
                status: 'завершено',
                ati: 'https://ati.su/firms/29056/info',
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, fr_req_model_1.FrReq]),
    __metadata("design:returntype", Promise)
], FrReqController.prototype, "updateFrReq", null);
exports.FrReqController = FrReqController = __decorate([
    (0, common_1.Controller)('api/v1/fr_req'),
    __metadata("design:paramtypes", [fr_req_service_1.FrReqService])
], FrReqController);
//# sourceMappingURL=fr_req.controller.js.map