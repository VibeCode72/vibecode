import { generateProjectPlan } from './agents/planner.js';

async function run() {
  console.log('\n--- Analyzing User Prompt ---');
  const plan = await generateProjectPlan('یک اپلیکیشن ساده مدیریت کارها (Todo List) با ریکت بساز');
  console.log(JSON.stringify(plan, null, 2));
  console.log('-------------------------------\n');
}

run();
