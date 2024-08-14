import { CarService } from './../shared service/car.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {
  result: any = "";
  id: number = 0;
  make: string = "";
  model: string = "";
  year: number = 0;
  private url = "http://localhost:3000/cars/";
  constructor(private http: HttpClient,public carService:CarService) { }

  resetData(){
    this.make = "";
    this.model = "";
    this.year = 0;
    this.id=0;
  }

  getData() {
    this.http.get<String>(this.url).subscribe(response => {
      console.log(response);
      this.result = response;
      this.carService.success();
    });
  }

  insertData() {
    const carData = {
      make: this.make,
      model: this.model,
      year: this.year
    };
    this.http.post<String>(this.url, carData).subscribe(response => {
      console.log("Data inserted Succesfully", response);
      this.resetData();

      this.carService.success();
    }, error => {
      console.error('Error inserting data', error);
      this.carService.error();
    });
  }

  deleteData() {
    this.http.delete(this.url+this.id,{ responseType: 'text' }).subscribe(() => {
      console.log("Data deleted Succesfully");
      this.carService.success();
      this.resetData();
    })
  }

  updateData() {
    const updatedCarData = {
      make: this.make,
      model: this.model,
      year: this.year
    };

    this.http.put(this.url+this.id,updatedCarData, { responseType: 'text' }).subscribe(response => {
      console.log("Data updated successfully");
      this.carService.success();
      this.resetData();
    }, error => {
      this.carService.error();
      console.log(error);
    });
  }
}