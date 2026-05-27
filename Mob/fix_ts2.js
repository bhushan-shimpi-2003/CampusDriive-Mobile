const fs = require('fs');

const files = [
  'src/modules/auth/screens/ForgotPasswordScreen.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/import \{ typography \} from '.*?constants';\r?\n/, '');
  
  content = content.replace(/colors\.text\.primary/g, 'colors.text');
  content = content.replace(/colors\.text\.hint/g, 'colors.textMuted');
  content = content.replace(/colors\.text\.secondary/g, 'colors.textMuted');
  content = content.replace(/colors\.border\.default/g, 'colors.border');
  content = content.replace(/colors\.background\.secondary/g, 'colors.surface');
  content = content.replace(/colors\.status\.success/g, 'colors.success');
  
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

const tpoDrive = 'src/modules/tpo/screens/TPODriveDetailsScreen.tsx';
let tpoContent = fs.readFileSync(tpoDrive, 'utf8');
tpoContent = tpoContent.replace(/drive\.applicants/g, 'drive.applicantsCount');
tpoContent = tpoContent.replace(/drive\.package/g, 'drive.packageOffer');
tpoContent = tpoContent.replace(/drive\.type/g, 'drive.jobType');
tpoContent = tpoContent.replace(/drive\.eligibility\.branches\.join\(\', \'\'\)/g, "drive.departments.join(', ')");
tpoContent = tpoContent.replace(/drive\.eligibility\.branches/g, 'drive.departments');
tpoContent = tpoContent.replace(/drive\.eligibility\.cgpa/g, 'drive.minCGPA');
tpoContent = tpoContent.replace(/drive\.eligibility\.backlogs/g, "(drive.backlogsAllowed ? 'Yes' : 'No')");
tpoContent = tpoContent.replace(/drive\.date/g, 'drive.deadline');
fs.writeFileSync(tpoDrive, tpoContent);
console.log('Fixed TPO Drive');
