<?php
$jsonPath = __DIR__ . '/visitor-stats.json';
$lockPath = __DIR__ . '/visitor-stats.lock';
$scriptPath = '/home/mmm/private-scripts/generate-public-analytics.py';
$logPath = '/home/mmm/private-scripts/public-analytics-web.log';
$maxAgeSeconds = 23 * 60 * 60;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache');

$needsRefresh = !file_exists($jsonPath) || (time() - filemtime($jsonPath) > $maxAgeSeconds);

// A refresh failure must never prevent serving the last successful report.
if ($needsRefresh && file_exists($scriptPath) && (function_exists('exec') || function_exists('proc_open'))) {
    $lock = @fopen($lockPath, 'c');
    if ($lock && flock($lock, LOCK_EX | LOCK_NB)) {
        try {
            if (function_exists('proc_open')) {
                $process = proc_open(
                    ['/usr/bin/python3', $scriptPath],
                    [0 => ['file', '/dev/null', 'r'], 1 => ['file', $logPath, 'a'], 2 => ['file', $logPath, 'a']],
                    $pipes
                );
                $exitCode = is_resource($process) ? proc_close($process) : 1;
            } else {
                $command = '/usr/bin/python3 ' . escapeshellarg($scriptPath) . ' >> ' . escapeshellarg($logPath) . ' 2>&1';
                exec($command, $output, $exitCode);
            }
            if ($exitCode !== 0) {
                error_log('M3 analytics refresh failed; serving the saved report.');
            }
        } catch (Throwable $error) {
            error_log('M3 analytics refresh failed: ' . $error->getMessage());
        } finally {
            flock($lock, LOCK_UN);
        }
    }
    if ($lock) fclose($lock);
}

if (is_readable($jsonPath)) {
    readfile($jsonPath);
    exit;
}

http_response_code(503);
echo json_encode(['error' => 'Visitor statistics are not available yet.']);
