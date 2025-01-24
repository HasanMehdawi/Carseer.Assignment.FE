import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicle-types',
  imports: [CommonModule ,HttpClientModule],
  templateUrl: './vehicle-types.component.html',
  styleUrl: './vehicle-types.component.css'
})
export class VehicleTypesComponent implements OnInit {

  id!: number;
  data: any[] = [];
  
  private apiUrl = 'https://localhost:7019/api/Vehicles/makes/{id}/types'; // Update API URL if needed
  displayedColumns: string[] = ['vehicleTypeId', 'vehicleTypeName'];
  dataSource = new MatTableDataSource(this.data);

    constructor(private route: ActivatedRoute, private http: HttpClient) {}
ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.getData().subscribe(
      (response) => {
        this.data = response;
        console.log(this.data)
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }
  pageEvent(event: any) {
    console.log('Page event:', event); 
  }
  getData(): Observable<any[]> {
    var url =`${this.apiUrl.replace("{id}",this.id.toString())}`
    return this.http.get<any[]>(url);
  }
}
