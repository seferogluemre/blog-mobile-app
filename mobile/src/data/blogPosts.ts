import { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'React Hooks ile State Yönetimi',
    description: 'Modern React uygulamalarında useState ve useEffect kullanımı hakkında detaylı rehber.',
    tags: ['React', 'JavaScript', 'Frontend', 'Hooks', 'State'],
    commentCount: 12,
  },
  {
    id: 2,
    title: 'TypeScript ile Tip Güvenliği',
    description: 'JavaScript projelerinizde TypeScript kullanarak daha güvenli kod yazma teknikleri.',
    tags: ['TypeScript', 'JavaScript', 'Web Development'],
    commentCount: 8,
  },
  {
    id: 3,
    title: 'Next.js ile Full Stack Geliştirme',
    description: 'Next.js framework\'ü ile modern web uygulamaları geliştirme rehberi.',
    tags: ['Next.js', 'React', 'Full Stack', 'SSR', 'Performance', 'SEO'],
    commentCount: 15,
  },
]; 