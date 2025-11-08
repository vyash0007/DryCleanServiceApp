export interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  comment: string;
  featured: boolean;
}

export interface TestimonialsData {
  testimonials: Testimonial[];
}
