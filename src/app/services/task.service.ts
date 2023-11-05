import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    url="http://localhost:8081/api/person";
  constructor(private http:HttpClient) {}
    findAll(){
       return  this.http.get<Person[ ]>(this.url);
    }
    delete(id: number | undefined){
      return  this.http.delete(`${this.url}/${id}`);
   }
   persist(task:Person){
    return this.http.post<Person>(this.url,task);
   }
  complited(id: number | undefined,completed: boolean){
     return this.http.patch(`${this.url}/${id}`,{completed: !completed})
  }
  update(task : Person){
     return this.http.put(`${this.url}/${task.id}`,task);
  }
}
