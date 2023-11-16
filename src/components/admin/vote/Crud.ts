import API_URL from '../../../utils/connections/axios';
import { Question } from './questionType';

class QuestionData {
  getAll() {
    return API_URL.get<Array<Question>>(`/list/`);
  }
  get(id: string) {
    return API_URL.get<Question>(`/${id}`);
  }
  create(data: Question) {
    return API_URL.post<Question>(`/create/`, data);
  }
  update(data: Question, id: any) {
    return API_URL.put<any>(`/update/${id}`, data);
  }
  delete(id: any) {
    return API_URL.delete<any>(`/delete/${id}`);
  }
  deleteAll() {
    return API_URL.delete<any>(`/delete`);
  }
  getQue() {
    return API_URL.get<Question>(`/question`);
  }
  createPer(data: Question) {
    return API_URL.post<Question>(`/create/`, data);
  }
}
export default new QuestionData();
