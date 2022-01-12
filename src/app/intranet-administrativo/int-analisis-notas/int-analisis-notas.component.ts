import { formatDate } from '@angular/common';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Estadistica } from 'src/app/Modelo/Estadistica/estadistica';
import { Mestadistica } from 'src/app/Modelo/MEstadistica/mestadistica';
import { ClaseService } from 'src/app/Servicio/Clase/clase.service';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';

@Component({
  selector: 'app-int-analisis-notas',
  templateUrl: './int-analisis-notas.component.html',
  styleUrls: ['./int-analisis-notas.component.css']
})
export class IntAnalisisNotasComponent implements OnInit {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  title = 'chatrDemo';

  constructor(private router: Router, private clservicio: ClaseService, public ususervicio: UsuarioRoleService) {

  }

  mestadisticas: Mestadistica[] = [];

  fechahoy = new Date(Date.now());

  fecha: FormControl = new FormControl(formatDate(this.fechahoy, "yyyy-MM-dd", "en"), [Validators.required]);

  ngOnInit(): void {
    //this.listarEstadisticas();   

  }

  mensaje: String;

  listarEstadisticas() { 
    this.mensaje = "";
    let fecha = this.fecha.value;
    this.mestadisticas.length = 0;
    this.clservicio.mostrarEstadicticas(fecha).subscribe(datos => {
      this.mestadisticas = datos;
      this.crearGrafico();
    }, err => {
      this.mensaje = "Sin datos que mostrar";
      this.mestadisticas.length = 0;
      this.crearGrafico();
    });
  }

  grado1: String;
  grado2: String;
  grado3: String;
  grado4: String;
  grado5: String;

  crearGrafico() {
    
    for (let mestadistica of this.mestadisticas) {

      if(mestadistica.nombre_grado == "1°"){

        this.grado1 = mestadistica.nombre_grado;
        if(mestadistica.estadisticas != null){
          for (let estadistica of mestadistica.estadisticas) {

            if (estadistica.nombre_bimestre == "I") {
              this.graficoGradoIbimestreI(estadistica);
            }
            else if(estadistica.nombre_bimestre == "II"){
              this.graficoGradoIbimestreII(estadistica);
            }
            else if(estadistica.nombre_bimestre == "III"){
              this.graficoGradoIbimestreIII(estadistica);
            }
            else {
              this.graficoGradoIbimestreIV(estadistica);
            }
  
          }
        }
        
      }
      else if (mestadistica.nombre_grado == "2°") {

        this.grado2 = mestadistica.nombre_grado;
        if(mestadistica.estadisticas != null){
          for (let estadistica of mestadistica.estadisticas) {

            if (estadistica.nombre_bimestre == "I") {
              this.graficoGradoIIbimestreI(estadistica);
            }
            else if(estadistica.nombre_bimestre == "II") {
              this.graficoGradoIIbimestreII(estadistica);
            }
            else if(estadistica.nombre_bimestre == "III") {
              this.graficoGradoIIbimestreIII(estadistica);
            }
            else {
              this.graficoGradoIIbimestreIV(estadistica);
            }
  
          }
        }
        
      }
      else if (mestadistica.nombre_grado == "3°") {

        this.grado3 = mestadistica.nombre_grado;
        if(mestadistica.estadisticas != null){
          for (let estadistica of mestadistica.estadisticas) {

            if (estadistica.nombre_bimestre == "I") {
              this.graficoGradoIIIbimestreI(estadistica);
            }
            else if(estadistica.nombre_bimestre == "II") {
              this.graficoGradoIIIbimestreII(estadistica);
            }
            else if(estadistica.nombre_bimestre == "III") {
              this.graficoGradoIIIbimestreIII(estadistica);
            }
            else {
              this.graficoGradoIIIbimestreIV(estadistica);
            }
  
          }
        }
        
      }
      else if (mestadistica.nombre_grado == "4°") {

        this.grado4 = mestadistica.nombre_grado;
        if(mestadistica.estadisticas != null){
          for (let estadistica of mestadistica.estadisticas) {

            if (estadistica.nombre_bimestre == "I") {
              this.graficoGradoIVbimestreI(estadistica);
            }
            else if(estadistica.nombre_bimestre == "II") {
              this.graficoGradoIVbimestreII(estadistica);
            }
            else if(estadistica.nombre_bimestre == "III") {
              this.graficoGradoIVbimestreIII(estadistica);
            }
            else {
              this.graficoGradoIVbimestreIV(estadistica);
            }
  
          }
        }
        
      }
      else if(mestadistica.nombre_grado == "5°"){
        
        this.grado5 = mestadistica.nombre_grado;
        if(mestadistica.estadisticas != null){
          for (let estadistica of mestadistica.estadisticas) {

            if (estadistica.nombre_bimestre == "I") {
              this.graficoGradoVbimestreI(estadistica);
            }
            else if(estadistica.nombre_bimestre == "II") {
              this.graficoGradoVbimestreII(estadistica);
            }
            else if(estadistica.nombre_bimestre == "III") {
              this.graficoGradoVbimestreIII(estadistica);
            }
            else {
              this.graficoGradoVbimestreIV(estadistica);
            }
  
          }
        }
        
      }
      else{
        this.mensaje = "Datos incompletos por ahora";
      }     

    }
  }

  graficoGradoIbimestreI(estadistica: Estadistica) {
    const gradoIbimestreI = new Chart("gradoIbimestreI", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }  

  graficoGradoIbimestreII(estadistica: Estadistica) {
    const gradoIbimestreII = new Chart("gradoIbimestreII", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  } 
  
  graficoGradoIbimestreIII(estadistica: Estadistica) {
    const gradoIbimestreIII = new Chart("gradoIbimestreIII", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }  

  graficoGradoIbimestreIV(estadistica: Estadistica) {
    const gradoIbimestreIV = new Chart("gradoIbimestreIV", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }  

  graficoGradoIIbimestreI(estadistica: Estadistica) {
    const gradoIIbimestreI = new Chart("gradoIIbimestreI", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }  

  graficoGradoIIbimestreII(estadistica: Estadistica) {
    const gradoIIbimestreII = new Chart("gradoIIbimestreII", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }  

  graficoGradoIIbimestreIII(estadistica: Estadistica) {
    const gradoIIbimestreIII = new Chart("gradoIIbimestreIII", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }  

  graficoGradoIIbimestreIV(estadistica: Estadistica) {
    const gradoIIbimestreIV = new Chart("gradoIIbimestreIV", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }  

  graficoGradoIIIbimestreI(estadistica: Estadistica) {
    const gradoIIIbimestreI = new Chart("gradoIIIbimestreI", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }  

  graficoGradoIIIbimestreII(estadistica: Estadistica) {
    const gradoIIIbimestreII = new Chart("gradoIIIbimestreII", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }  

  graficoGradoIIIbimestreIII(estadistica: Estadistica) {
    const gradoIIIbimestreIII = new Chart("gradoIIIbimestreIII", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }  

  graficoGradoIIIbimestreIV(estadistica: Estadistica) {
    const gradoIIIbimestreIV = new Chart("gradoIIIbimestreIV", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }  


  graficoGradoIVbimestreI(estadistica: Estadistica) {
    const gradoIVbimestreI = new Chart("gradoIVbimestreI", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }  

  graficoGradoIVbimestreII(estadistica: Estadistica) {
    const gradoIVbimestreII = new Chart("gradoIVbimestreII", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }  


  graficoGradoIVbimestreIII(estadistica: Estadistica) {
    const gradoIVbimestreIII = new Chart("gradoIVbimestreIII", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }  

  graficoGradoIVbimestreIV(estadistica: Estadistica) {
    const gradoIVbimestreIV = new Chart("gradoIVbimestreIV", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }  

  graficoGradoVbimestreI(estadistica: Estadistica) {
    const gradoVbimestreI = new Chart("gradoVbimestreI", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }  

  graficoGradoVbimestreII(estadistica: Estadistica) {
    const gradoVbimestreII = new Chart("gradoVbimestreII", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }  

  graficoGradoVbimestreIII(estadistica: Estadistica) {
    const gradoVbimestreIII = new Chart("gradoVbimestreIII", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }  

  graficoGradoVbimestreIV(estadistica: Estadistica) {
    const gradoVbimestreIV = new Chart("gradoVbimestreIV", {
      type: 'bar',
      data: {
        labels: [estadistica.ad, estadistica.a, estadistica.b, estadistica.c],
        datasets: [{
          label: 'BIMESTRE  '+estadistica.nombre_bimestre.toString(),
          data: [estadistica.cantidad_ad, estadistica.cantidad_a, estadistica.cantidad_b, estadistica.cantidad_c],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }  

  irAperfil() {
    if (this.ususervicio.isAuthenticated()) {
      this.router.navigate(['intra/personal']);
    }
    else {
      this.router.navigate(['login']);
    }

  }

  cerrarSesion() {
    this.ususervicio.cerrarSession();
    this.router.navigate(['login']);
  }

}
