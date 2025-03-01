import CV from '../components/Resume';
import AboutMe from '../components/AboutMe';
import Projects from './Projects';
import Contact from '../components/Contact';


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
   
    'CONTACT.sh': { 
      type: 'executable', 
      component: Contact,
      route: '/contact' 
    },
  }
};