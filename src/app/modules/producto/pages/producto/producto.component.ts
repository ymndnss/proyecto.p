import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
product:string='';
productoCarrousel:Producto[]=[];

productoAnadido(producto:Producto){ 

this.product='${producto.nombre}:${producto.precio}';
try {
  this.productoCarrousel.push(producto);
  Swal.fire({
    title:'bien',
    text:'ha añadido este producto con exito',
    icon:'info'

  })
} catch (error) {
  Swal.fire({
    title:'bien',
    text:'el producto a tirado un error',
    icon:'info'

  })
}
}
}
