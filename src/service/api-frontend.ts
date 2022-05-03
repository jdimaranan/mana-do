import { IAPI } from './types';
import { Todo, TodoStatus } from '../types/types';
import shortid from 'shortid';

class ApiFrontend extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    return Promise.resolve({
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser',
    } as Todo);
  }

  async getTodos(): Promise<Todo[]> {
    return [
            {
              content: 'Content',
              created_date: new Date().toISOString(),
              status: TodoStatus.ACTIVE,
              id: shortid(),
              user_id: 'firstUser',
            } as Todo,
    ];
  }
}

export default new ApiFrontend();
