import { FrReq } from './fr_req.model';
import { FrReqService } from './fr_req.service';
export declare class FrReqController {
    private readonly frReqService;
    constructor(frReqService: FrReqService);
    getAllFrReq(): Promise<FrReq[]>;
    postFrReq(postData: FrReq): Promise<FrReq>;
    getFrReq(id: number): Promise<FrReq | null>;
    deleteReq(id: number): Promise<FrReq>;
    updateFrReq(id: number, postData: FrReq): Promise<FrReq>;
}
