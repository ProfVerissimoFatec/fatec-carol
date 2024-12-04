import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http/http.service';
import { ApiService } from '../../services/api.service';
import { Chart, ChartData, ChartOptions, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, BarController, BarElement } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  totalCurtidas: number = 0;
  totalLikes: number = 0;
  totalDeslikes: number = 0;
  chart: Chart | undefined;
  barChart: Chart | undefined;

  totalAnunciosMes: number = 0;

  idPerfil = Number(this.apiService.getUserIdPerfil());

  constructor(
    private httpService: HttpService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {

    Chart.register(
      LineController, LineElement, PointElement, LinearScale, Title, CategoryScale,
      BarController, BarElement
    );


    this.loadMonthlyData();
    this.setupChart();
    this.setupBarChart();
  
    const idPerfil = Number(this.apiService.getUserIdPerfil());
    if (idPerfil) {
      this.httpService.getReacoesTotaisDoPerfil(idPerfil).subscribe(
        (data) => {
          this.totalCurtidas = data.curtidas;
          this.totalLikes = data.likes;
          this.totalDeslikes = data.deslikes;
        },
        (error) => {
          console.error('Erro ao obter reações totais:', error);
        }
      );
    } else {
      console.error('ID do perfil não encontrado.');
    }
  }

  loadMonthlyData() {
    const idPerfil = Number(this.apiService.getUserIdPerfil());
    if (idPerfil) {
      this.httpService.getReacoesTotaisDoPerfil(idPerfil).subscribe(
        (data) => {
          this.totalCurtidas = data.curtidas;
          this.totalLikes = data.likes;
          this.totalDeslikes = data.deslikes;
        },
        (error) => {
          console.error('Erro ao obter reações totais:', error);
        }
      );
    } else {
      console.error('ID do perfil não encontrado.');
    }
  }


  setupChart() {
    // Configuração do gráfico de linha (diário)
    this.httpService.getAnunciosMesAtualPorDia().subscribe(
      (data) => {
        const dias = data.map((item: any) => item.dia);
        const totais = data.map((item: any) => item.total_anuncios);

        const chartData: ChartData<'line'> = {
          labels: dias,
          datasets: [
            {
              label: 'Anúncios Criados por Dia',
              data: totais,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        };

        const options: ChartOptions<'line'> = {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
        };

        const chartId = 'myChart';
        const ctx = document.getElementById(chartId) as HTMLCanvasElement;
        if (ctx) {
          this.chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: options,
          });
        }
      },
      (error) => {
        console.error('Erro ao obter dados de anúncios do mês:', error);
      }
    );
  }

  setupBarChart() {
    // Configuração do gráfico de barras (mensal)
    this.httpService.getAnunciosAnoAtualPorMes().subscribe(
      (data) => {
        const meses = [
          'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
          'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        const totais = data.map((item: any) => item.total_anuncios);

        const barChartData: ChartData<'bar'> = {
          labels: meses,
          datasets: [
            {
              label: 'Anúncios Criados por Mês',
              data: totais,
              backgroundColor: 'rgb(142, 226, 102, 0.5)',
              borderColor: 'rgb(142, 226, 102)',
              borderWidth: 1,
            },
          ],
        };

        const options: ChartOptions<'bar'> = {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };

        const barChartId = 'barChart';
        const barCtx = document.getElementById(barChartId) as HTMLCanvasElement;
        if (barCtx) {
          this.barChart = new Chart(barCtx, {
            type: 'bar',
            data: barChartData,
            options: options,
          });
        }
      },
      (error) => {
        console.error('Erro ao obter dados de anúncios do ano:', error);
      }
    );
  }
}
