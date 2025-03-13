import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const body = await req.json();
    const { feature_name, data } = body;

    if (!feature_name || !data) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', `${feature_name}.json`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }

    // Read existing data
    const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    fileData.push(data);

    // Save updated data
    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));

    return new Response(JSON.stringify({ message: 'Data stored successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error storing data:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
