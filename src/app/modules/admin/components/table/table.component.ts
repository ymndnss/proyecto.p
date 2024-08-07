import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
coleccionProductos:Producto[]=[];
producto=new FormGroup({
  nombre: new FormControl('validators.required'),
  precio: new FormControl (0,Validators.required),
  descripcion: new FormControl ('',Validators.required),
  categoria: new FormControl ('',Validators.required), 
  imagen: new FormControl ('',Validators.required),
  alt: new FormControl ('', Validators.required)
})
constructor(public servicioCrud: CrudService){}
}
