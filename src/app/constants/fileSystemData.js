import CV from '../components/Resume';
import AboutMe from '../components/AboutMe';

const getComponentString = (component) => {
  return component.toString();
};

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
    'PROJECTS': { 
      type: 'directory',
      content: {
        'PROJECT1.MD': { type: 'file', content: 'Project 1 details' },
        'PROJECT2.MD': { type: 'file', content: 'Project 2 details' }
      },
      route: '/projects'
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