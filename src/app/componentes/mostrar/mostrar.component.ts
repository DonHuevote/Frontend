import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

let Url: string = 'http://localhost:3000/clases';



class Clase {
  nombre: string;
  duracion: number;
  esOnline: boolean;
  mostrar: boolean;
  _id: string;

  constructor(_id: string, nombre: string, duracion: number, esOnline: boolean) {
    this._id = _id;
    this.mostrar = false;
    this.nombre = nombre;
    this.duracion = duracion;
    this.esOnline = esOnline;
  }
}

@Component({
  selector: 'app-mostrar',
  imports: [CommonModule, FormsModule],
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent {

  popUpMessage = '';
  showSuccess = false;
  showError = false;
  

  clases: Clase[] = [];
  mostrar: boolean = false;

  clase = {
    nombre: '',
    duracion: 0,
    esOnline: false
  };

  constructor(private router: Router) { }

  ngOnInit() {
    this.start();
  }

  start() {
    axios.get(Url)
      .then((response: any) => {
        this.clases = response.data;
      })
      .catch((error: any) => {
        console.log(error);
        this.showPopUp(' ERROR FATAL: No se pudo conectar con express',true);
        setTimeout(() => { this.showError = false; }, 3000);
      });
  }

  submit() {
    axios.post(Url,this.clase)
      .then((response: any) => {
        this.clase = { nombre: '', duracion: 0, esOnline: false };
        this.start();
        this.showPopUp('Clase añadida con éxito');
      })
      .catch((error: any) => {
        let errorCode : number = error.response.status;
        
        console.log();
        if(errorCode == 500){
          this.showPopUp('Error al añadir la clase. Revise el formato de los valores', true);
        }else{
          this.showPopUp('Error del sistema, estamos trabajando en eso '+ error, true);
        }
        
      });
  }
  

  delete(_id:string) {
    axios.delete(Url + '/' + _id)
      .then((response: any) => {
        this.start(); // actualizamos bien la lista
        this.showPopUp(' Clase eliminada correctamente');
      })
      .catch((error: any) => {
        console.log(error);
        this.showPopUp('Error al eliminar la clase', true);
      });
  }
  

  submit_update(_id: string, claseSeleccionada: Clase) {
    this.clase = { 
      nombre: claseSeleccionada.nombre, 
      duracion: claseSeleccionada.duracion, 
      esOnline: claseSeleccionada.esOnline 
    };
  
    axios.put(Url + '/' + _id, this.clase)
      .then((response: any) => {
        this.clase = { nombre: '', duracion: 0, esOnline: false };
        this.start();
        this.showPopUp(' Clase actualizada con éxito');
      })
      .catch((error: any) => {
        let errorCode : number = error.response.status;
        
        console.log();
        if(errorCode == 500){
          this.showPopUp('Error al actualizar la clase. Revise el formato de los valores', true);
        }else{
          this.showPopUp('Error del sistema, estamos trabajando en eso '+ error, true);
        }
      });
  }
  

  showPopUp(message: string, isError: boolean = false) {
    this.popUpMessage = message;
    this.showSuccess = !isError;
    this.showError = isError;
  
    setTimeout(() => {
      this.showSuccess = false;
      this.showError = false;
      this.popUpMessage = '';
    }, 3000);
  }
  
}