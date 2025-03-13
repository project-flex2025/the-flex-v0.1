import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "users.json");

export async function GET() {
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileData);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading users.json:", error);
    return NextResponse.json(
      { error: "Failed to load users" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileData);
    const newUser = await req.json();

    data.total_results += 1;
    data.data.push(newUser);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

    return NextResponse.json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json(
      { error: "Failed to add user" },
      { status: 500 }
    );
  }
}