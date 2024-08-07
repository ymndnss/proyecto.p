import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  coleccionProductos: Producto[] = [];
  producto = new FormGroup({
    nombre: new FormControl('validators.required'),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required),
  });
  constructor(public servicioCrud: CrudService) {}
  ngOnInit(): void {
    //subscribe=notifica constantemente los cambios acutalesw del sistema
    this.servicioCrud.obtenerProducto().subscribe((producto) => {
      this.coleccionProductos = producto;
    });
  }
  async agregarProducto() {
    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        idProducto: '',
        nombre: this.producto.value.nombre!,
        descripcion: this.producto.value.descripcion!,
        precio: this.producto.value.precio!,
        categoria: this.producto.value.categoria!,
        imagen: this.producto.value.imagen!,
        alt: this.producto.value.alt!,
      };
      await this.servicioCrud
        .crearProducto(nuevoProducto)
        .then((roducto) => {
          alert('ha agregado un producto con exito');
        })
        .catch((error) => {
          alert('hubo un problema con al agregar un producto');
        });
    }
  }
}
