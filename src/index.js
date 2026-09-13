import { generateProjectPlan } from './agents/planner.js';
import { generateFileCode } from './agents/coder.js';

async function run() {
  console.log('\n1. Generating Project Plan...');
  const plan = await generateProjectPlan('یک اپلیکیشن ساده مدیریت کارها (Todo List) با ریکت بساز');
  
  const targetFile = plan.files[1] || plan.files[0];
  console.log(`\n2. Generating Code for: ${targetFile.path}...`);
  
  const code = await generateFileCode(plan, targetFile.path, targetFile.description);
  
  console.log('\n--- Generated Code Output ---');
  console.log(code);
  console.log('-----------------------------\n');
}

run();
