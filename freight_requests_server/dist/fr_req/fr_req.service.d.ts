import { PrismaService } from 'src/prisma.service';
import { FrReq } from './fr_req.model';
export declare class FrReqService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllFrReq(): Promise<FrReq[]>;
    getFrReq(id: number): Promise<FrReq | null>;
    createFrReq(data: FrReq): Promise<FrReq>;
    updateFrReq(id: number, data: FrReq): Promise<FrReq>;
    deleteFrReq(id: number): Promise<FrReq>;
}
