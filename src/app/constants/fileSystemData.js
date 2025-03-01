import CV from '../components/Resume';
import AboutMe from '../components/AboutMe';
import Projects from './Projects';


export const fileSystem = {
  '~': {
    'RESUME.DOC': { 
      type: 'file',
      component: CV,
     
    },
    'ABOUT.TXT': { 
      type: 'file',
      component: AboutMe,
      
    },
    'PROJECTS.JS': { 
      type: 'file',
      component: Projects,
      description: 'My personal projects with descriptions and links.'
    },
    'GALLERY': { 
      type: 'directory',
      content: {
        'DESIGN1.PNG': { type: 'file', content: 'Design 1 preview' },
        'DESIGN2.PNG': { type: 'file', content: 'Design 2 preview' }
      },
      route: '/gallery'
    },
    'CONTACT.sh': { 
      type: 'executable', 
      content: 'Get in touch',
      route: '/contact' 
    },
  }
};