param(
  [Parameter(Mandatory = $false)]
  [string]$Command = ''
)

$ErrorActionPreference = 'Stop'

function Invoke-NanoChatPowerShell {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Script
  )

  $psi = New-Object System.Diagnostics.ProcessStartInfo
  $psi.FileName = 'powershell.exe'
  $psi.Arguments = '-NoProfile -ExecutionPolicy Bypass -Command "' + ($Script -replace '"', '\"') + '"'
  $psi.RedirectStandardOutput = $true
  $psi.RedirectStandardError = $true
  $psi.UseShellExecute = $false
  $psi.CreateNoWindow = $true

  $process = New-Object System.Diagnostics.Process
  $process.StartInfo = $psi
  [void]$process.Start()

  $stdout = $process.StandardOutput.ReadToEnd()
  $stderr = $process.StandardError.ReadToEnd()
  $process.WaitForExit()

  [pscustomobject]@{
    ExitCode = $process.ExitCode
    StdOut   = $stdout.TrimEnd()
    StdErr   = $stderr.TrimEnd()
  }
}

if ([string]::IsNullOrWhiteSpace($Command)) {
  Write-Host 'Usage: .\powershell-runner.ps1 -Command "Get-Date"'
  exit 1
}

$result = Invoke-NanoChatPowerShell -Script $Command
if ($result.StdOut) { Write-Output $result.StdOut }
if ($result.StdErr) { Write-Error $result.StdErr }
exit $result.ExitCode
