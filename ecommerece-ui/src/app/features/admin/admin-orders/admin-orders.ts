import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService, Order } from '../../../services/adminservices';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders.html',
  styleUrls: ['./admin-orders.css']
})
export class AdminOrders implements OnInit {

  orders: any[] = [];
  filteredOrders: any[] = [];

  searchText: string = '';

  constructor(private admin: AdminService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {

    this.admin.getOrders().subscribe(res => {

      this.orders = res;
      this.filteredOrders = res;

    });

  }

  updateStatus(orderId: number, status: string) {

    this.admin.updateOrderStatus(orderId, status).subscribe(() => {

      this.loadOrders();

    });

  }

  filterOrders() {

    const search = this.searchText.toLowerCase();

    this.filteredOrders = this.orders.filter(o =>
      o.order_id.toString().includes(search) ||
      o.email.toLowerCase().includes(search) ||
      o.status.toLowerCase().includes(search)
    );

  }

}