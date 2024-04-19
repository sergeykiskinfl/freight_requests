"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Freight requests')
        .setDescription('The freight requests API description')
        .setVersion('1.0')
        .addTag('freight_requests')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/v1/docs', app, document);
    app.enableCors({
        origin: '*',
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map