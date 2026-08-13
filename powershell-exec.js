const { spawn } = require('child_process');

function runPowerShell(command) {
  return new Promise((resolve, reject) => {
    const ps = spawn('powershell.exe', [
      '-NoProfile',
      '-ExecutionPolicy', 'Bypass',
      '-Command',
      command
    ], {
      windowsHide: true
    });

    let stdout = '';
    let stderr = '';

    ps.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
    ps.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    ps.on('error', reject);
    ps.on('close', (exitCode) => {
      resolve({
        exitCode,
        stdout: stdout.trimEnd(),
        stderr: stderr.trimEnd()
      });
    });
  });
}

module.exports = { runPowerShell };
