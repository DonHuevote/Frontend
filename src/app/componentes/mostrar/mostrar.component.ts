import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

class Clase{
  nombre:string;
  duracion:number;
  esOnline:boolean;
  mostrar:boolean;
  _id: string;

  constructor(_id:string, nombre:string,duracion:number,esOnline:boolean)
    {
      this._id = _id
      this.mostrar = false
      this.nombre = nombre
      this.duracion = duracion
      this.esOnline = esOnline
    }
}

@Component({
  selector: 'app-mostrar',
  imports: [CommonModule, FormsModule],
  templateUrl: './mostrar.component.html',
  styleUrl: './mostrar.component.css'
})


export class MostrarComponent {
  
  clases: Clase[] = [];
  mostrar: boolean = false

  clase = {
    nombre: '',
    duracion: 0,
    esOnline: false
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.start();  
  }

  start() {
    axios.get('http://localhost:3000/clases')
    .then((response: any) => {

      this.clases = response.data;
    })
    .catch((error: any) => {

      console.log(error);
    })
    .finally(() => {

    });
  }

  submit() {
    axios.post('http://localhost:3000/clases',this.clase)
    .then((response: any) => {

      this.clase = { nombre: '', duracion: 0, esOnline: false };
      this.start()
    })
    .catch((error: any) => {

      console.log(error);
    })
    .finally(() => {
      
    });
  }

  delete(_id:string){
    axios.delete('http://localhost:3000/clases/'+_id)
    .then((response: any) => {

      this.clases = this.clases.filter(clase => clase.nombre !== _id);
      console.log("clase eliminado con éxito");
    })
    .catch((error: any) => {

      console.log(error);
    })
    .finally(() => {

    });
  }

  
  

  submit_update(_id:string, claseSeleccionada: Clase) {
    this.clase = { 
      nombre: claseSeleccionada.nombre, 
      duracion: claseSeleccionada.duracion, 
      esOnline: claseSeleccionada.esOnline 
    };
    console.log(this.clase)
    axios.put('http://localhost:3000/clases/'+_id,this.clase)
    .then((response: any) => {

  
      this.clase = { nombre: '', duracion: 0, esOnline: false };
      this.start()
    })
    .catch((error: any) => {

      console.log(error);
    })
    .finally(() => {
      
    });
  }
}


