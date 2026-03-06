import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { AdminService } from '../../../services/adminservices';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit, AfterViewInit {
  stats: any = { totalUsers: 0, totalCategories: 0, totalProducts: 0 };
  loading = false;
  error = '';

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.fetchStats();
  }

  ngAfterViewInit(): void {
    this.renderCharts();
  }

  // ================= FETCH STATS =================
  fetchStats() {
    this.loading = true;
    this.adminService.getDashboardStats().subscribe({
      next: res => {
        if (res) this.stats = res;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Failed to load dashboard data';
        this.loading = false;
      }
    });
  }

  navigate(link: string) {
    this.router.navigateByUrl(link);
  }

  // ================= CHARTS =================
  renderCharts() {
    const revenueCtx = document.getElementById('revenueChart') as HTMLCanvasElement;
    new Chart(revenueCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue ($)',
          data: [5000, 8000, 6000, 9000, 12000, 15000],
          borderColor: '#4e73df',
          backgroundColor: 'rgba(78,115,223,0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#4e73df'
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });

    const ordersSalesCtx = document.getElementById('ordersSalesChart') as HTMLCanvasElement;
    new Chart(ordersSalesCtx, {
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          { type: 'bar', label: 'Orders', data: [50, 75, 60, 90, 120, 150], backgroundColor: '#1cc88a' },
          { type: 'line', label: 'Sales', data: [4000, 7000, 5000, 8500, 11000, 14000], borderColor: '#e74a3b', backgroundColor: 'rgba(231,74,59,0.1)', fill: false, tension: 0.4 }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });

    const categoryPerformanceCtx = document.getElementById('categoryPerformanceChart') as HTMLCanvasElement;
    new Chart(categoryPerformanceCtx, {
      type: 'polarArea',
      data: {
        labels: ['Electronics', 'Fashion', 'Sports', 'Books', 'Home'],
        datasets: [{ data: [35, 25, 20, 15, 30], backgroundColor: ['#4e73df','#1cc88a','#36b9cc','#f6c23e','#e74a3b'] }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
    });
  }
}