const fs = require('fs');

const files = [
  'src/modules/student/screens/EditProfileScreen.tsx',
  'src/modules/student/screens/StudentApplicationDetailsScreen.tsx',
  'src/modules/tpo/screens/TPOCommunityDetailsScreen.tsx',
  'src/modules/tpo/screens/TPODriveDetailsScreen.tsx',
  'src/modules/tpo/screens/TPOStudentProfileScreen.tsx',
  'src/modules/coordinator/screens/CoordinatorDriveDetailsScreen.tsx',
  'src/modules/coordinator/screens/CoordinatorStudentDetailsScreen.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/import \{ typography \} from '.*?constants';\r?\n/, '');
  content = content.replace(/import \{ mockDrives \} from '.*?mockData';/g, 'import { mockPlacementDrives as mockDrives } from \'../../../data/mockData\';');
  
  content = content.replace(/colors\.text\.primary/g, 'colors.text');
  content = content.replace(/colors\.text\.hint/g, 'colors.textMuted');
  content = content.replace(/colors\.text\.secondary/g, 'colors.textMuted');
  content = content.replace(/colors\.border\.default/g, 'colors.border');
  content = content.replace(/colors\.background\.secondary/g, 'colors.surface');
  
  content = content.replace(/typography\.sizes\.body/g, '14');
  content = content.replace(/typography\.sizes\.small/g, '12');
  content = content.replace(/typography\.sizes\.h2/g, '24');
  content = content.replace(/typography\.sizes\.h3/g, '20');
  content = content.replace(/typography\.sizes\.h4/g, '18');
  content = content.replace(/typography\.weights\.bold as any/g, "'bold'");
  content = content.replace(/typography\.weights\.medium as any/g, "'500'");
  
  fs.writeFileSync(f, content);
  console.log('Fixed ' + f);
});
