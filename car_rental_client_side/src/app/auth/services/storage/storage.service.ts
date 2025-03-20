import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token); 
  }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user)); 
  }

  static getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(TOKEN);
    }
    return null;
  }

  static getUserId(): string {
    const user = this.getUser();
    if (user == null) { return ''; }
    return user.id;
  }

  static getUser() {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  static getUserRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  static isAdminLoggedIn(): boolean {
    return this.getToken() !== null && this.getUserRole() === "ADMIN";
  }
  
  static isCustomerLoggedIn(): boolean {
    return this.getToken() !== null && this.getUserRole() === "CUSTOMER";
  }

  static logout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
    window.localStorage.clear();
  }
}
