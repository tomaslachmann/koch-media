import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  enableEdit = false;
  enableEditIndex = null;
  userData: any;
  selectedData: any;
  selected: boolean = false;
  inputs: any;
  newUser: boolean = false;
  selectedRowIndex = -1;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("http://localhost:1337/api/v1/posts/").subscribe(data => {
      console.log(data)
      data.map( dat => {
        dat.editable = false
      })
      this.userData = data;
      console.log(data)
    })
    
  }

  public showDetails(id: string) {
     this.selectedData = this.userData.find(data => {
     return data.id === id;
    })
    this.selected = !this.selected;
  }

  public saveSegment(data: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Access-Control-Allow-Origin', '*')
    headers = headers.set('header-name-2', 'header-value-2');
    delete data.editable;

    this.http.put(`http://localhost:1337/api/v1/posts/${data.id}`, JSON.stringify(data), { headers: headers },).subscribe(res => {
      alert(res)
    })
  }

  toggleEditMethod(e: Event, i: any, data: any) {
    this.enableEdit = !this.enableEdit;
    this.enableEditIndex = i;
    data.editable = !data.editable;
  }

  deleteMethod(data: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Access-Control-Allow-Origin', '*')
    headers = headers.set('header-name-2', 'header-value-2');
    this.http.delete(`http://localhost:1337/api/v1/posts/${data.id}`, { headers: headers },).subscribe(res => {
     
    })
  }
  
  highlight(data: any){
    this.selectedRowIndex = data.id;
}

}
