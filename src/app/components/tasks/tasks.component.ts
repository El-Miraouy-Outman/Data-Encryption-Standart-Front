import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  showForm=false;
  etatForm = false;
  serchText='';
  people: Person[] =[];
  resultSearchPerson: Person[] =[];
  person: Person={
    firstName: "",
    lastName: "",
    password: "",
    label:'',
    completed:false
  }
  constructor(private taskService: TaskService){

  }
  ngOnInit(){
    this.getTasks();
  }
  getTasks(){
    this.taskService.findAll()
    .subscribe(pers=>{ this.people = this.resultSearchPerson=pers ;})
  console.log("hello")
    console.log(this.people)
  }
  deleteTask(id: number | undefined){
    this.taskService.delete(id).subscribe(()  => {
       this.people= this.people.filter(task =>task.id != id )
    })
  }
  persistTask(){
    this.taskService.persist(this.person)
    .subscribe((task) => {
      this.resultSearchPerson = [task, ...this.people];
      this.reset();
      this.showForm=false;
      this.getTasks();
    });
  }
  reset(){
    this.person={
      firstName: "",
      lastName: "",
      password: "",
      label: '',
      completed:false
    }
  }

  toggleCompleted(task: Person){
      this.taskService.complited(task.id,task.completed)
         .subscribe(() =>{
          task.completed= !task.completed
         })
  }
    editTask(task: Person){
      this.person=task;
      this.etatForm=true;
      this.showForm=true;
    }
 updateTask(){
  return this.taskService.update(this.person)
               .subscribe(()=>{
                 this.reset();
                 this.etatForm=false;
                     this.showForm=false;
               })
 }
 serchTasks(){
  this.resultSearchPerson=this.people.filter((task)=> task.label.toLowerCase().includes(this.serchText.toLowerCase()) )
 }
}
