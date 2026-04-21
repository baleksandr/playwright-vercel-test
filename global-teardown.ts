import fs from 'fs';
import path from 'path';

async function globalTeardown() {
    // Шлях має точно збігатися з тим, що вказаний у context.storageState
    const filePath = path.join(process.cwd(), 'data/storegState.json');

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`\n✅ Temporary storage state [${filePath}] has been deleted.`);
    }
}

export default globalTeardown;
