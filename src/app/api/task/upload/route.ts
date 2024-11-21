import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';

export const route = {
  api: {
    bodyParser: false, // Disable body parsing to handle the file upload as a stream
  },
};

// Function to convert the NextRequest to a readable stream
async function bufferToStream(req: NextRequest) {
  const buffer = await req.arrayBuffer();
  return Readable.from(Buffer.from(buffer));
}

export async function POST(req: NextRequest) {

  // Convert the incoming request to a buffer
  const stream = await bufferToStream(req);
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  // Convert chunks to a single Buffer
  const buffer = Buffer.concat(chunks);

  const formData = new FormData();
  const blob = new Blob([buffer], { type: 'application/pdf' });
  const fileName = req.headers.get('x-file-name') || 'file.pdf';
  formData.append("file", blob, fileName);

  const response = await fetch('http://malec.ddns.net:1234/upload', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    return NextResponse.json({ message: 'File uploaded successfully' });
  } else {
    return NextResponse.json({ error: 'Error uploading the file' }, { status: 500 });
  }
}
