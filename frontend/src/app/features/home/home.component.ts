import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthService, HealthResponse } from '../../core/services/health.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="container">
      <h1>Scaffolding — Connection Status</h1>

      @if (loading()) {
        <p class="status loading">Connecting to backend…</p>
      } @else if (error()) {
        <p class="status error">❌ Backend unreachable: {{ error() }}</p>
      } @else {
        <div class="card">
          <p class="status ok">✅ Backend is <strong>{{ health()?.status }}</strong></p>
          <p>Service: <code>{{ health()?.service }}</code></p>
          <p>Timestamp: <code>{{ health()?.timestamp }}</code></p>
        </div>
      }
    </main>
  `,
  styles: [`
    .container {
      max-width: 640px;
      margin: 4rem auto;
      font-family: sans-serif;
      padding: 0 1rem;
    }
    .card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1.5rem;
      background: #f8fafc;
    }
    .status { font-size: 1.1rem; }
    .ok    { color: #16a34a; }
    .error { color: #dc2626; }
    .loading { color: #6b7280; }
    code {
      background: #e2e8f0;
      border-radius: 4px;
      padding: 0 4px;
    }
  `],
})
export class HomeComponent implements OnInit {
  private readonly healthService = inject(HealthService);

  health   = signal<HealthResponse | null>(null);
  loading  = signal(true);
  error    = signal<string | null>(null);

  ngOnInit(): void {
    this.healthService.check().subscribe({
      next: (data) => {
        this.health.set(data);
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }
}
