import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  // Definimos colección para los productos de la web del tipo Producto
  private productosCollection: AngularFirestoreCollection<Producto>;

  constructor(private database: AngularFirestore) {
    // Referenciamos colección productos y será subida como "producto" a Firebase
    this.productosCollection = database.collection('producto');
  }

  // CREAR productos
  crearProducto(producto: Producto) {
    return new Promise(async (resolve, reject) => {
      try {
        // Creamos número identificativo para el producto en la base de datos
        const idProducto = this.database.createId();

        // Asignamos ID creado al atributo idProducto de la interfaz "Producto"
        producto.idProducto = idProducto;

        const resultado = await this.productosCollection
          .doc(idProducto)
          .set(producto);

        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    });
  }

  // OBTENER productos
  obtenerProducto() {
    return this.productosCollection
      //snapshotchanges= toma una captura del estado de los datos
      //pipe= funciona como una tuberia que retorna el nuevo arreglo
      //map= recorre esa nueva informacion 
      //a= resguarada la nueva informacion y la envia
      .snapshotChanges().pipe(map(Action => Action.map(a => a.payload.doc.data())));
    // EDITAR productos
    // ELIMINAR productos
  }

  //editar producto
  modificarProducto(idProducto:string,nuevaData:Producto){
  //accedemos a la colleccion, buscamos por ID y actualizamos informacion
  return this.database.collection('producto').doc(idProducto).update(nuevaData);
}

  eliminarProducto(producto: string) {
    return new Promise((resolve, reject) => {
      try {
        const respuesta = this.productosCollection.doc(producto).delete();
        resolve(respuesta)
      }
      catch (error) {
        reject(error);
      }
    }
    )
  }
}
