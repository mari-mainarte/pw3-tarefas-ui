import { Component, OnInit, inject } from '@angular/core';
import { Task } from '../../model/task';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  private router = inject(Router);
  private taskService = inject(TaskService);

  ngOnInit(): void {
   /* this.tasks = [{id : 1, "title":"Revisar código", "description":"Revisar o código desenvolvido na última semana","dueDate":"2024-11-10","status":"PENDING","responsible":"Desenvolvedor"},
                  {id : 2, "title":"Verificar logs de erro", "description":"Verificar e analisar logs de erro","dueDate":"2024-12-10","status":"IN_PROGRESS","responsible":"Desenvolvedor"}];
  */
    this.loadTasks();
  }

  newTask() {
    this.router.navigate(['/tasks/new']);
  }

  loadTasks(): void{
    this.taskService.findAll().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(id: number | undefined) {
    if (id && confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.loadTasks()
      });
      console.log("Exclusão realizada");
    }
  }

  editTask(id: number | undefined) {
    if (id) this.router.navigate(['/tasks', id]);
  }
}
