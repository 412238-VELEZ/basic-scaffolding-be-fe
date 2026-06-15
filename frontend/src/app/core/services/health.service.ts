import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

export interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
}

@Injectable({ providedIn: 'root' })
export class HealthService {
  private readonly api = inject(ApiService);

  check(): Observable<HealthResponse> {
    return this.api.get<HealthResponse>('/health');
  }
}
