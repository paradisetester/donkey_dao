import { HTTPBaseService } from './interceptor_custom_auth'
import { RequstAccessToken, RequstRefreshToken, CreateVote, UpdateVote, UpdateVoteAddress, CreateProposal, UpdateProposal, QuestsionResultUpdate, GeneralSetting, UpdateWhitepaper, CreateWhitepaper } from './types';

export class MainApiProtectedVersion extends HTTPBaseService {
    requstQueVoteId() {
      throw new Error("Method not implemented.");
    }

    private primary_key?: number = 0;
    public constructor(
        access_token?: string,
        primary_key?: number) {
        super(process.env.REACT_APP_BASE_API_PATH as string, access_token as string);
        this.primary_key = primary_key;
    }
    
    public requstAccessToken = (body: RequstAccessToken) => this.instance.post('/secure/auth/', body);
    public requstRefreshToken = (body: RequstRefreshToken) => this.instance.post('/secure/refreshtoken/', body);
    
    public requstVotesList = () => this.instance.get('/api/v1/front/votes/list/');
    public requstCreateVote = (body: CreateVote) => this.instance.post('/api/v1/front/votes/create/', body);
    public requstDeleteVote = () => this.instance.delete(`/api/v1/votes/delete/${this.primary_key}/`);
    public requstUpdateVote = (body: UpdateVote) => this.instance.put(`/api/v1/front/votes/update/${this.primary_key}/`, body);
    public requstQueVote = () => this.instance.get(`/api/v1/front/votes/question/`);
    public requstQueVotes_id = ()  => this.instance.get(`/api/v1/front/votes/${this.primary_key}/`);

    public requstListFrontVote = () => this.instance.get('/api/v1/front/votes/list/');
    public requstUpdateVoteYes = (body: UpdateVoteAddress) => this.instance.put(`/api/v1/front/votes/yes/update/${this.primary_key}/`, body);
    public requstUpdateVoteNo = (body: UpdateVoteAddress) => this.instance.put(`/api/v1/front/votes/no/update/${this.primary_key}/`, body);
   

    public requstQuestionResults = (body: QuestsionResultUpdate) => this.instance.put(`/api/v1/front/votes/results/update/${this.primary_key}/`, body);
    // http://localhost:8000/api/v1/front/votes/proposal/board/
    
    public requstAllProposal = () => this.instance.get('/api/v1/front/votes/proposal/list/');
    public requstCreateProposal = (body: CreateProposal) => this.instance.post('/api/v1/front/votes/proposal/create/', body);
    public requstDownloadProposal = () => this.instance.get('/api/v1/front/votes/proposal/board/');
    public requstUpdateProposal = (body: UpdateProposal) => this.instance.put(`/api/v1/front/votes/proposal/update/${this.primary_key}/`, body);
    public requstDeleteProposal = () => this.instance.delete(`/api/v1/front/votes/proposal/delete/${this.primary_key}/`);
   
    public requstAllWhitepaper = () => this.instance.get('/api/v1/front/votes/whitepaper/list/');
    public requstCreateWhitepaper = (body: CreateWhitepaper) => this.instance.post('/api/v1/front/votes/whitepaper/create/', body);
    public requstDownloadWhitepaper = () => this.instance.get('/api/v1/front/votes/whitepaper/board/');
    public requstUpdateWhitepaper = (body: UpdateWhitepaper) => this.instance.put(`/api/v1/front/votes/whitepaper/update/${this.primary_key}/`, body);
    public requstDeleteWhitepaper = () => this.instance.delete(`/api/v1/front/votes/whitepaper/delete/${this.primary_key}/`);
   

    public requstSettingID = () => this.instance.get(`/api/user/general/${this.primary_key}/`);
    public requstCreateSetting = (body: GeneralSetting) => this.instance.post('/api/user/general/new/', body);
    public requstListSetting = () => this.instance.get('/api/user/general/');
    public requstUpdateSetting = (body: GeneralSetting) => this.instance.put(`/api/user/general/update/${this.primary_key}/`, body);
    public requstDeleteSetting = () => this.instance.delete(`/api/user/general/delete/${this.primary_key}/`);
   

}