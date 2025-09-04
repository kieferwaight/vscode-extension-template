import fetch from 'node-fetch';
import sharp from 'sharp';

async function downloadAndConvert(icon) {
  try {
    const response = await fetch(icon.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const svgData = await response.text();

    const outputPath = icon.out;
    await sharp(Buffer.from(svgData))
      .resize(icon.width, icon.height)
      .png()
      .toFile(outputPath);

    console.log(`✅ PNG saved: ${outputPath}`);
  } catch (err) {
    console.error(`❌ Error processing:`, err);
  }
}

downloadAndConvert({
  url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  width: 256,
  height: 256,
  out: "./images/icon.png"
})