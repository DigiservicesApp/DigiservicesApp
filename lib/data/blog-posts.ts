import { IconType } from 'react-icons';
import {
  RiTimeLine,
  RiUserLine,
  RiRidingLine,
  RiTeamLine,
  RiRobot2Line,
  RiBarChart2Line,
} from 'react-icons/ri';

export interface Author {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  category: 'AI' | 'Productivity' | 'Management' | 'Technology';
  author: Author;
  content: string;
  icon: IconType;
  image: string;
  readingTime: string;
  tags: string[];
}

export const authors: { [key: string]: Author } = {
  johnDoe: {
    name: 'John Doe',
    role: 'Product Manager',
    image: '/blog/authors/john-doe.jpg',
    bio: 'John has over 10 years of experience in product management and AI implementation.',
  },
  janeSmith: {
    name: 'Jane Smith',
    role: 'Tech Lead',
    image: '/blog/authors/jane-smith.jpg',
    bio: 'Jane is a tech lead specializing in AI and machine learning applications.',
  },
  markWilson: {
    name: 'Mark Wilson',
    role: 'AI Researcher',
    image: '/blog/authors/mark-wilson.jpg',
    bio: 'Mark is an AI researcher focused on practical applications of machine learning in business.',
  },
};

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How AI is Revolutionizing Project Management',
    slug: 'ai-revolutionizing-project-management',
    description:
      'Discover how artificial intelligence is transforming traditional project management practices and boosting productivity.',
    date: '2025-08-20',
    category: 'AI',
    author: authors.johnDoe,
    icon: RiRobot2Line,
    image: '/blog/posts/ai-project-management.jpg',
    readingTime: '5 min read',
    tags: ['AI', 'Project Management', 'Productivity'],
    content: `
# How AI is Revolutionizing Project Management

Artificial Intelligence is transforming the way we manage projects, making processes more efficient and outcomes more predictable. In this article, we'll explore how AI is changing the landscape of project management.

## The Current State of Project Management

Traditional project management relies heavily on human intuition and experience. While these are valuable assets, they can be enhanced with AI-powered tools and insights.

## Key Areas Where AI Makes a Difference

### 1. Task Prioritization
AI algorithms can analyze various factors to determine the optimal order of tasks:
- Project dependencies
- Team availability
- Deadline constraints
- Resource allocation

### 2. Risk Assessment
Machine learning models can:
- Identify potential risks based on historical data
- Suggest mitigation strategies
- Predict project delays
- Monitor risk factors in real-time

### 3. Resource Allocation
AI helps optimize resource allocation by:
- Analyzing team member skills and availability
- Matching tasks with the right people
- Predicting resource needs
- Identifying potential bottlenecks

## Real-World Applications

Let's look at some practical examples of AI in project management:

1. **Automated Scheduling**
   - AI analyzes team calendars
   - Suggests optimal meeting times
   - Reduces scheduling conflicts

2. **Intelligent Reporting**
   - Automated progress updates
   - Data-driven insights
   - Predictive analytics

3. **Smart Notifications**
   - Context-aware alerts
   - Priority-based notifications
   - Intelligent reminders

## The Future of AI in Project Management

As AI technology continues to evolve, we can expect:
- More sophisticated prediction models
- Better integration with existing tools
- Enhanced automation capabilities
- Improved decision-making support

## Conclusion

AI is not replacing project managers but rather empowering them with better tools and insights. The future of project management lies in the successful integration of human expertise with AI capabilities.
    `,
  },
  {
    id: '2',
    title: 'Best Practices for Remote Team Management',
    slug: 'remote-team-management-best-practices',
    description:
      'Learn effective strategies for managing remote teams and maintaining high productivity levels.',
    date: '2025-08-15',
    category: 'Management',
    author: authors.janeSmith,
    icon: RiTeamLine,
    image: '/blog/posts/remote-team-management.jpg',
    readingTime: '7 min read',
    tags: ['Remote Work', 'Team Management', 'Leadership'],
    content: `
# Best Practices for Remote Team Management

Managing remote teams presents unique challenges but also opportunities for increased productivity and employee satisfaction. Here's how to make it work effectively.

## Setting Up for Success

### 1. Communication Infrastructure
- Choose the right tools
- Establish communication protocols
- Set up regular check-ins

### 2. Clear Expectations
- Define working hours
- Set performance metrics
- Establish deadlines

## Building Team Culture

Creating a strong team culture is crucial for remote teams:

1. **Virtual Team Building**
   - Regular social calls
   - Online team activities
   - Shared celebrations

2. **Inclusive Practices**
   - Asynchronous communication
   - Different time zones consideration
   - Cultural awareness

## Tools and Technologies

Essential tools for remote teams:
- Project management software
- Communication platforms
- Time tracking tools
- Document collaboration

## Conclusion

Remote team management requires intentional effort but can lead to highly effective and satisfied teams when done right.
    `,
  },
  {
    id: '3',
    title: 'Understanding Time Management with Data Analytics',
    slug: 'time-management-data-analytics',
    description:
      'Using data analytics to improve time management and boost personal productivity.',
    date: '2025-08-10',
    category: 'Productivity',
    author: authors.markWilson,
    icon: RiBarChart2Line,
    image: '/blog/posts/time-management-analytics.jpg',
    readingTime: '6 min read',
    tags: ['Productivity', 'Analytics', 'Time Management'],
    content: `
# Understanding Time Management with Data Analytics

Data analytics can provide valuable insights into how we spend our time and how to optimize it for better productivity.

## The Role of Data in Time Management

### 1. Time Tracking
- Automated tracking tools
- Activity categorization
- Pattern recognition

### 2. Productivity Analysis
- Peak performance times
- Task completion rates
- Focus periods

## Using Analytics for Improvement

Learn how to:
1. **Identify Time Wasters**
   - Meeting analysis
   - Task switching impact
   - Interruption patterns

2. **Optimize Schedules**
   - Energy level matching
   - Task batching
   - Break optimization

## Tools and Techniques

Popular tools for time analytics:
- Time tracking apps
- Project management software
- Productivity analytics platforms

## Conclusion

Data-driven time management leads to better decisions and improved productivity.
    `,
  },
];
