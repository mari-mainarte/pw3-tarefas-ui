import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';//inject para injetar um objeto
import { Observable } from 'rxjs';
import { Task } from '../model/task';
import { TaskDTO } from '../model/DTO/taskDTO';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8080/tarefas';
  private http = inject(HttpClient);

  findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  criarTask(taskDTO: TaskDTO): Observable<TaskDTO>{
    return this.http.post<TaskDTO>(this.apiUrl, taskDTO);
  }

  constructor() { }
}
