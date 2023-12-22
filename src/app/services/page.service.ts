// page.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private sessionStorageKey = 'currentPage'; // Key for session storage

  setCurrentPage(page: number) {
    sessionStorage.setItem(this.sessionStorageKey, page.toString()); // Store in session storage
  }

  getCurrentPage(): number {
    const storedPage = sessionStorage.getItem(this.sessionStorageKey); // Retrieve from session storage
    return storedPage ? parseInt(storedPage, 10) : 1; // Parse and return, default to 1 if not found
  }
}