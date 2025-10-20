import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'attendee' | 'organizer' | 'admin';
  avatar?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  price: number;
  capacity: number;
  ticketsSold: number;
  image: string;
  organizerId: string;
  organizerName: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  qrCode: string;
  purchaseDate: string;
  status: 'active' | 'used' | 'cancelled';
}

export interface Feedback {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface Store {
  currentUser: User | null;
  events: Event[];
  tickets: Ticket[];
  feedback: Feedback[];
  wishlist: string[];
  
  login: (user: User) => void;
  logout: () => void;
  createEvent: (event: Event) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  buyTicket: (eventId: string, userId: string) => void;
  addFeedback: (feedback: Feedback) => void;
  toggleWishlist: (eventId: string) => void;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Join industry leaders discussing the future of technology',
    date: '2025-03-15',
    time: '09:00 AM',
    venue: 'Convention Center, NYC',
    category: 'Technology',
    price: 99,
    capacity: 500,
    ticketsSold: 342,
    image: '/tech-conference.png',
    organizerId: 'org1',
    organizerName: 'Tech Events Inc',
  },
  {
    id: '2',
    title: 'Music Festival 2025',
    description: 'Three days of live music from top artists',
    date: '2025-04-20',
    time: '06:00 PM',
    venue: 'Central Park, NYC',
    category: 'Music',
    price: 150,
    capacity: 5000,
    ticketsSold: 3200,
    image: '/vibrant-music-festival.png',
    organizerId: 'org2',
    organizerName: 'Live Music Productions',
  },
  {
    id: '3',
    title: 'Business Networking Breakfast',
    description: 'Connect with entrepreneurs and business leaders',
    date: '2025-02-28',
    time: '07:30 AM',
    venue: 'Hilton Hotel, Boston',
    category: 'Business',
    price: 45,
    capacity: 200,
    ticketsSold: 156,
    image: '/business-networking.png',
    organizerId: 'org3',
    organizerName: 'Business Network Group',
  },
  {
    id: '4',
    title: 'Art Exhibition Opening',
    description: 'Contemporary art from emerging artists',
    date: '2025-03-01',
    time: '06:00 PM',
    venue: 'Modern Art Gallery, LA',
    category: 'Art',
    price: 25,
    capacity: 300,
    ticketsSold: 189,
    image: '/art-exhibition.png',
    organizerId: 'org4',
    organizerName: 'Contemporary Art Society',
  },
  {
    id: '5',
    title: 'Fitness Marathon',
    description: 'Half marathon with fitness workshops',
    date: '2025-05-10',
    time: '06:00 AM',
    venue: 'Riverside Park, Chicago',
    category: 'Sports',
    price: 35,
    capacity: 1000,
    ticketsSold: 687,
    image: '/marathon-fitness.jpg',
    organizerId: 'org5',
    organizerName: 'Fitness Events Co',
  },
];

const mockFeedback: Feedback[] = [
  {
    id: '1',
    eventId: '1',
    userId: 'user1',
    userName: 'John Doe',
    rating: 5,
    comment: 'Amazing event! Great speakers and networking opportunities.',
    date: '2025-01-15',
  },
  {
    id: '2',
    eventId: '1',
    userId: 'user2',
    userName: 'Jane Smith',
    rating: 4,
    comment: 'Very informative. Could have had better food options.',
    date: '2025-01-14',
  },
];

export const useStore = create<Store>((set) => ({
  currentUser: null,
  events: mockEvents,
  tickets: [],
  feedback: mockFeedback,
  wishlist: [],

  login: (user) => set({ currentUser: user }),
  logout: () => set({ currentUser: null, tickets: [], wishlist: [] }),

  createEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),

  updateEvent: (id, updates) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    })),

  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),

  buyTicket: (eventId, userId) =>
    set((state) => {
      const ticket: Ticket = {
        id: `ticket-${Date.now()}`,
        eventId,
        userId,
        qrCode: `QR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        purchaseDate: new Date().toISOString().split('T')[0],
        status: 'active',
      };
      return {
        tickets: [...state.tickets, ticket],
        events: state.events.map((e) =>
          e.id === eventId ? { ...e, ticketsSold: e.ticketsSold + 1 } : e
        ),
      };
    }),

  addFeedback: (feedback) =>
    set((state) => ({
      feedback: [...state.feedback, feedback],
    })),

  toggleWishlist: (eventId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(eventId)
        ? state.wishlist.filter((id) => id !== eventId)
        : [...state.wishlist, eventId],
    })),
}));
