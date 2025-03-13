import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const departmentsFile = path.resolve(process.cwd(), 'public/departments.json');

export async function GET() {
  try {
    const data = await fs.readFile(departmentsFile, 'utf-8');
    const departments = JSON.parse(data);
    return NextResponse.json(departments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ error: 'Department name is required' }, { status: 400 });
    }

    const data = await fs.readFile(departmentsFile, 'utf-8');
    const departments = JSON.parse(data);
    const newDepartment = { id: Date.now().toString(), name };

    departments.push(newDepartment);
    await fs.writeFile(departmentsFile, JSON.stringify(departments, null, 2));

    return NextResponse.json(newDepartment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add department' }, { status: 500 });
  }
}
