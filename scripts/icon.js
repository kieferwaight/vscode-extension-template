/**
 * Icon Download and Processing Script
 * 
 * This script downloads an SVG icon from a URL and converts it to a PNG file
 * suitable for use as a VSCode extension icon (256x256 pixels).
 * 
 * Usage:
 * - Run: npm run download:icon
 * - Customize the icon configuration below
 * 
 * Requirements:
 * - node-fetch: for downloading the SVG
 * - sharp: for SVG to PNG conversion and resizing
 */

import fetch from 'node-fetch';
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Configuration for the icon to download and process
 */
const iconConfig = {
    // Default VSCode icon - replace with your preferred icon URL
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
    width: 256,
    height: 256,
    outputPath: "./images/icon.png"
};

/**
 * Downloads an SVG from a URL and converts it to a PNG file
 * @param {Object} config - Icon configuration object
 */
async function downloadAndConvert(config) {
    try {
        console.log(`🔽 Downloading icon from: ${config.url}`);
        
        const response = await fetch(config.url);
        if (!response.ok) {
            throw new Error(`Failed to fetch icon: ${response.status} ${response.statusText}`);
        }
        
        const svgData = await response.text();
        console.log(`📄 Downloaded SVG data (${svgData.length} bytes)`);

        // Ensure the output directory exists
        const outputDir = path.dirname(config.outputPath);
        await fs.mkdir(outputDir, { recursive: true });

        // Convert SVG to PNG with specified dimensions
        console.log(`🔄 Converting to PNG (${config.width}x${config.height})`);
        await sharp(Buffer.from(svgData))
            .resize(config.width, config.height)
            .png()
            .toFile(config.outputPath);

        console.log(`✅ PNG saved successfully: ${config.outputPath}`);
        console.log(`📏 Dimensions: ${config.width}x${config.height} pixels`);
        
    } catch (error) {
        console.error(`❌ Error processing icon:`, error.message);
        console.error(`\nTroubleshooting tips:`);
        console.error(`- Check that the URL is accessible: ${config.url}`);
        console.error(`- Ensure the URL points to a valid SVG file`);
        console.error(`- Verify you have write permissions to: ${config.outputPath}`);
        console.error(`- Make sure dependencies are installed: npm install`);
        process.exit(1);
    }
}

// Run the icon download and conversion
console.log(`🚀 Starting icon processing...`);
downloadAndConvert(iconConfig);