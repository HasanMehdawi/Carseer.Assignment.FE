import { Component, OnInit ,ViewChild } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';  // Import Router
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker } from '@angular/material/datepicker';
import { HttpErrorResponse } from '@angular/common/http'; 

@Component({
  selector: 'app-vehicle-models',
  imports: [CommonModule ,HttpClientModule ,MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,],
  providers: [MatDatepickerModule],
  templateUrl: './vehicle-models.component.html',
  styleUrl: './vehicle-models.component.css'
})
export class VehicleModelsComponent implements OnInit {
  id!: number;
  data: any[] = [];
  selectedYear!: Date;
  Year!: number;

 @ViewChild('picker') picker!: MatDatepicker<any>;


  openDatePicker(): void {
    if (this.picker) {
      this.picker.open(); 
    } else {
      console.error('Picker reference is undefined.');
    }
  }
  onYearSelected(event: Date, datepicker: MatDatepicker<any>): void {
    this.selectedYear = event;
    this.Year = this.selectedYear.getFullYear()
    this.fetchDataAndRefresh(event.getFullYear()); // Fetch data by the selected year
    datepicker.close(); // Close the picker after selecting a year
  }

  private apiUrl = 'http://localhost:6999/api/Vehicles/makes/{id}/year/{year}/models'; // Update API URL if needed
  displayedColumns: string[] = ['make_ID', 'model_ID' ,"make_Name" ,"model_Name"];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
    console.log('Paginator:', this.paginator);
    console.log('Sort:', this.sort);
  }

pageEvent(event: any) {
  console.log('Page event:', event); 
}

ngOnInit(): void { 
  this.Year = new Date().getFullYear()
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.getData().subscribe(
      (response: ApiCarMake[]) => {
        this.data = response.map((item: ApiCarMake): TableCarMake => ({
          make_ID: item.make_ID,
          model_ID: item.model_ID,
          make_Name : item.make_Name,
          model_Name : item.model_Name
        }));
        this.dataSource.data = this.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('Fetched data:', this.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  fetchDataAndRefresh(year: number): void {
    this.getData().subscribe({
      next: (data: ApiCarMake[]) => {
        // Map and update the table data
        this.data = data.map((item: ApiCarMake): TableCarMake => ({
          make_ID: item.make_ID,
          model_ID: item.model_ID,
          make_Name : item.make_Name,
          model_Name : item.model_Name
        }));
        this.dataSource.data = this.data; // Update the table data source
        console.log('Data updated for the selected year:', this.data);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching data:', error);
      },
    });
  }
 getData(): Observable<any> {
  var url = `${this.apiUrl}`.replace("{id}" , this.id.toString()).replace("{year}", this.Year.toString());
    return this.http.get<any>(url);
  }
  
}

interface ApiCarMake {
  make_ID: number;
  model_ID: number;
  make_Name: string;
  model_Name: string;
}

interface TableCarMake {
  make_ID: number;
  model_ID: number;
  make_Name: string;
  model_Name: string;
}
