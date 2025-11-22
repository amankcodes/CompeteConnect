export interface Competition {
  id: string;
  name: string;
  organizer: string;
  description: string;
  location: string;
  field: string;
  deadline: string;
  eligibility: string;
  websiteUrl: string;
  tags: string[];
  imageKeyword: string; // Used to fetch a relevant placeholder
}

export interface SearchFilters {
  country: string;
  state: string;
  field: string;
  level: string;
}

export enum FieldOfInterest {
  STEM = "STEM (Science, Tech, Engineering, Math)",
  CODING = "Computer Science & Coding",
  ROBOTICS = "Robotics",
  ARTS = "Arts & Design",
  BUSINESS = "Business & Entrepreneurship",
  DEBATE = "Debate & Literature",
  SPORTS = "Sports & Athletics",
  GENERAL = "General Academics"
}

export enum EducationLevel {
  HIGH_SCHOOL = "High School",
  UNDERGRADUATE = "Undergraduate/University",
  GRADUATE = "Graduate/PhD",
  OPEN = "Open to All"
}

export type UserRole = 'student' | 'organizer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution?: string; // School for students, Organization for organizers
}