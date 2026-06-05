<?php
$jsonPath = __DIR__ . '/visitor-stats.json';
$lockPath = __DIR__ . '/visitor-stats.lock';
$scriptPath = '/home/mmm/private-scripts/generate-public-analytics.py';
$logPath = '/home/mmm/private-scripts/public-analytics-web.log';
$maxAgeSeconds = 23 * 60 * 60;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=900');

$needsRefresh = !file_exists($jsonPath) || (time() - filemtime($jsonPath) > $maxAgeSeconds);

if ($needsRefresh && file_exists($scriptPath)) {
    $lock = fopen($lockPath, 'c');
    if ($lock && flock($lock, LOCK_EX | LOCK_NB)) {
        $command = '/usr/bin/python3 ' . escapeshellarg($scriptPath) . ' >> ' . escapeshellarg($logPath) . ' 2>&1';
        exec($command);
        flock($lock, LOCK_UN);
    }
    if ($lock) {
        fclose($lock);
    }
}

if (file_exists($jsonPath)) {
    readfile($jsonPath);
    exit;
}

http_response_code(503);
echo json_encode([
    'error' => 'Visitor statistics are not available yet.',
]);
