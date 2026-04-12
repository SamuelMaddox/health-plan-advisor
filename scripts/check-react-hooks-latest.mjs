#!/usr/bin/env node

import https from "node:https";

const PACKAGE_NAME = "eslint-plugin-react-hooks";
const MIN_VERSION = "7.1.0";

function parseVersion(version) {
  const clean = String(version).trim().replace(/^v/, "");
  const [core] = clean.split("-");
  const [major = "0", minor = "0", patch = "0"] = core.split(".");

  return {
    major: Number.parseInt(major, 10) || 0,
    minor: Number.parseInt(minor, 10) || 0,
    patch: Number.parseInt(patch, 10) || 0,
  };
}

function isAtLeast(current, minimum) {
  if (current.major !== minimum.major) {
    return current.major > minimum.major;
  }
  if (current.minor !== minimum.minor) {
    return current.minor > minimum.minor;
  }
  return current.patch >= minimum.patch;
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { timeout: 8000 }, (response) => {
      if (
        !response.statusCode ||
        response.statusCode < 200 ||
        response.statusCode >= 300
      ) {
        reject(
          new Error(
            `Registry request failed with status ${response.statusCode ?? "unknown"}.`,
          ),
        );
        response.resume();
        return;
      }

      let data = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          reject(new Error("Failed to parse registry response JSON."));
        }
      });
    });

    request.on("timeout", () => {
      request.destroy(new Error("Registry request timed out."));
    });
    request.on("error", (error) => {
      reject(error);
    });
  });
}

async function getLatestVersion(pkg) {
  const metadata = await fetchJson(
    `https://registry.npmjs.org/${encodeURIComponent(pkg)}`,
  );
  const latest = metadata?.["dist-tags"]?.latest;
  if (!latest) {
    throw new Error(
      "Could not find dist-tags.latest in npm registry response.",
    );
  }
  return String(latest);
}

async function main() {
  console.log("");
  console.log("🔎 React Hooks Release Watch");
  console.log("=============================");

  try {
    const latest = await getLatestVersion(PACKAGE_NAME);
    const ready = isAtLeast(parseVersion(latest), parseVersion(MIN_VERSION));

    console.log(`📦 Package: ${PACKAGE_NAME}`);
    console.log(`🎯 Target:  >= ${MIN_VERSION}`);
    console.log(`🛰️  Latest: ${latest}`);

    if (ready) {
      console.log("");
      console.log(
        `✅🎉 Stable release reached! You can switch from canary to ^${MIN_VERSION} (or newer).`,
      );
      return;
    }

    console.log("");
    console.log("⏳🚧 Not there yet. Keep canary for now.");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log("");
    console.log("⚠️  Could not check npm latest version right now.");
    console.log(`🧩 Reason: ${message}`);
  }
}

main();
