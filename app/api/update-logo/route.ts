import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No se encontró ningún archivo.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Guardar directamente en la carpeta /public de manera local
    const filename = 'custom-store-logo.png';
    const filePath = path.join(process.cwd(), 'public', filename);
    await writeFile(filePath, buffer);

    return NextResponse.json({ success: true, url: `/${filename}` });
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    return NextResponse.json({ success: false, message: 'Error interno al guardar el archivo.' }, { status: 500 });
  }
}