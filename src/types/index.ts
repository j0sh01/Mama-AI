export interface Patient {
  id: string;
  name: string;
  age: number;
  risk_score?: number;
  riskLevel?: 'high' | 'medium' | 'low';
  appointmentTime: string;
  appointment?: string;
  contact?: string;
  email?: string;
  status: 'waiting' | 'in-progress' | 'completed';
  condition: string;
  lastVisit: string;
  phone: string;
  emergencyContact: string;
}

export interface Room {
  id: string;
  number: string;
  type: 'delivery' | 'recovery' | 'consultation' | 'emergency';
  status: 'occupied' | 'available' | 'maintenance';
  patient?: Patient;
  capacity: number;
  equipment: string[];
}

export interface Resource {
  id: string;
  name: string;
  type: 'staff' | 'equipment' | 'supplies';
  available: number;
  total: number;
  status: 'adequate' | 'low' | 'critical';
  cost: number;
}

export interface RiskAssessment {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gestationalWeek: number;
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  complications: string[];
  riskScore: number;
  riskLevel: 'high' | 'medium' | 'low';
  recommendations: string[];
  assessmentDate: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  region: string;
  available_stock: number;
  unit?: string;
}

export interface CostItem {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  type: 'treatment' | 'medication' | 'equipment' | 'staff' | 'facility';
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
}