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
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-vehicle-makes',
  imports: [CommonModule, HttpClientModule, RouterOutlet ,MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule, 
    MatFormFieldModule,
    MatInputModule
  ], 
  templateUrl: './vehicle-makes.component.html',
  styleUrl: './vehicle-makes.component.css'
})
export class VehicleMakesComponent implements OnInit {
  data: TableCarMake[] = [];
  private apiUrl = 'https://localhost:7019/api/Vehicles/makes';  // Replace with your API URL
  displayedColumns: string[] = ['Make_id', 'Make_name', 'Option'];
  dataSource = new MatTableDataSource(this.data);
  
  // data: any[] = []
  // Using the definite assignment assertion operator (!)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private http: HttpClient) {}

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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getData().subscribe(
      (response: ApiCarMake[]) => {
        this.data = response.map((item: ApiCarMake): TableCarMake => ({
          Make_id: item.make_ID,
          Make_name: item.make_Name
        }));
        this.dataSource.data = this.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('Mapped data:', this.dataSource.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
      
    );
    
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Filter is case insensitive

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Reset to the first page if the filter changes
    }
  }
  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  navigateToVehicleTypesPage(id: number) {
    this.router.navigate(['./vehicle-types' ,id]); 
  }

  navigateToVehicleDetailesWithYearPage(id: number) {
    this.router.navigate(['./vehicle-models' ,id]); 
  }
}
interface ApiCarMake {
  make_ID: number;
  make_Name: string;
}

interface TableCarMake {
  Make_id: number;
  Make_name: string;
}