import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const ffmpegPath = "C:\\Users\\neeraj\\AppData\\Local\\ms-playwright\\ffmpeg-1013\\ffmpeg-win64.exe";
console.log("ffmpeg exists:", fs.existsSync(ffmpegPath));

const vidPath = path.resolve("new refrence/Recording 2026-10-10 233911.mp4");
console.log("vidPath:", vidPath, fs.existsSync(vidPath));

const outDir = path.resolve("scratch_frames/ref_hero");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Extract 2 fps
const cmd = `"${ffmpegPath}" -y -i "${vidPath}" -vf fps=2 "${path.join(outDir, "frame_%03d.png")}"`;
console.log("Running ffmpeg...");
execSync(cmd, { stdio: "inherit" });
console.log("Done. Frames count:", fs.readdirSync(outDir).length);
