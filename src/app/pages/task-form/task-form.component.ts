import { TaskDTO } from './../../model/DTO/taskDTO';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../model/task';
import { TaskService } from '../../service/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {

  private fb = inject(FormBuilder);

  id: string | null = null;

  private taskService = inject(TaskService);
  private router = inject(Router);

  taskForm = this.fb.group({
    titulo: ['', Validators.required],
    descricao: [''],
    responsavel: ['', Validators.required],
    dataLimite: ['', Validators.required],
  });


  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const task: Task = this.taskForm.value as Task;

    if (this.id) {
      console.log("Executa a atualização")
    } else {
      console.log("Executa a inserção")
    }
  }

  onCriarTarefa(){
    const tarefaDTO: TaskDTO = this.taskForm.value as TaskDTO;

    this.taskService.criarTask(tarefaDTO).subscribe({
      next: (resp) => {
        alert("Tarefa criada com sucesso!")
        this.router.navigate(['/tasks']);
      }, error: (err) =>{
        alert("Erro ao criar tarefa!")
        this.router.navigate(['/tasks']);
      }
    })
  }

}
