const { runMonitorOnce } = require('./monitor');
(async ()=>{ console.log('Demo run (single pass)'); await runMonitorOnce(process.env.START_MODE==='mainnet'?'mainnet':'sepolia'); })();
